import type { RawJob, ScoredJob } from './types';
import {
  BACKEND_ONLY_TITLE_KEYWORDS,
  BLOCKERS,
  EGYPT_SIGNALS,
  FRONTEND_KEYWORDS,
  PROFILE_KEYWORDS_HI,
  PROFILE_KEYWORDS_LO,
  REMOTE_GLOBAL_SIGNALS,
  VISA_FRIENDLY_SIGNALS,
} from './companies';

/**
 * Deterministic score — no LLM in v1.
 * 0..100. UI filters by the "Egypt-friendly OR global toggle" setting.
 * Frontend-biased: +15 for frontend keywords, -15 for backend-only titles.
 */
export function scoreJob(j: RawJob): ScoredJob {
  const text = `${j.title} ${j.description}`.toLowerCase();
  const loc = (j.location ?? '').toLowerCase();
  const titleLo = j.title.toLowerCase();
  const reasons: string[] = [];
  let score = 0;

  // ── Title weighting (strongest signal) ─────────────────────────────
  for (const kw of PROFILE_KEYWORDS_HI) {
    if (titleLo.includes(kw)) {
      score += 30;
      reasons.push(`+30 title match: ${kw}`);
      break;
    }
  }

  // ── Frontend bias (user's focus) ───────────────────────────────────
  for (const kw of FRONTEND_KEYWORDS) {
    if (titleLo.includes(kw)) {
      score += 15;
      reasons.push(`+15 frontend-focus: ${kw}`);
      break;
    }
  }

  // ── Backend-only / infra / research penalty ────────────────────────
  // Only penalize if frontend/full-stack is NOT in the title.
  const titleIsFrontendish = FRONTEND_KEYWORDS.some((k) => titleLo.includes(k)) ||
    /full[- ]?stack|fullstack|forward.?deployed/i.test(j.title);
  if (!titleIsFrontendish) {
    for (const kw of BACKEND_ONLY_TITLE_KEYWORDS) {
      if (titleLo.includes(kw)) {
        score -= 15;
        reasons.push(`−15 backend/infra-only title: ${kw}`);
        break;
      }
    }
  }

  // ── High-value keyword hits in body ────────────────────────────────
  let hiBody = 0;
  for (const kw of PROFILE_KEYWORDS_HI) {
    if (text.includes(kw)) hiBody++;
  }
  if (hiBody > 0) {
    const add = Math.min(hiBody * 6, 30);
    score += add;
    reasons.push(`+${add} ${hiBody} high-value keyword hit${hiBody > 1 ? 's' : ''} in body`);
  }

  // ── Low-value stack-match ──────────────────────────────────────────
  let loBody = 0;
  for (const kw of PROFILE_KEYWORDS_LO) {
    if (text.includes(kw)) loBody++;
  }
  if (loBody > 0) {
    const add = Math.min(loBody * 2, 15);
    score += add;
    reasons.push(`+${add} ${loBody} stack-match keyword${loBody > 1 ? 's' : ''}`);
  }

  // ── Egypt location (STRONG — user wants Egypt-first) ───────────────
  let remoteFromEgypt: boolean | null = null;
  const egyptHit = EGYPT_SIGNALS.some((s) => loc.includes(s) || text.includes(s));
  if (egyptHit) {
    score += 40;
    reasons.push('+40 Egypt/MENA mentioned');
    remoteFromEgypt = true;
  }

  // ── Remote + global language (moderate) ────────────────────────────
  if (j.remote) {
    const globalOk = REMOTE_GLOBAL_SIGNALS.some((s) => text.includes(s) || loc.includes(s));
    if (globalOk) {
      score += 15;
      reasons.push('+15 fully-remote language');
      if (remoteFromEgypt === null) remoteFromEgypt = true;
    } else if (!egyptHit) {
      score += 5;
      reasons.push('+5 remote (region unspecified)');
    }
  }

  // ── Visa sponsorship ───────────────────────────────────────────────
  let visaFriendly: boolean | null = null;
  for (const s of VISA_FRIENDLY_SIGNALS) {
    if (text.includes(s)) {
      visaFriendly = true;
      score += 10;
      reasons.push(`+10 visa signal: "${s}"`);
      break;
    }
  }

  // ── Blockers (strong negative) ─────────────────────────────────────
  for (const b of BLOCKERS) {
    if (text.includes(b)) {
      score -= 40;
      reasons.push(`−40 blocker: "${b}"`);
      if (b.includes('us') || b.includes('eu') || b.includes('uk')) {
        remoteFromEgypt = false;
      }
      break;
    }
  }

  score = Math.max(0, Math.min(100, score));

  return {
    ...j,
    score,
    reasons,
    visaFriendly,
    remoteFromEgypt,
  };
}
