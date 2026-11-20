import type { RawJob, ScoredJob } from './types';
import {
  BACKEND_ONLY_TITLE_KEYWORDS,
  BLOCKERS,
  EGYPT_SIGNALS,
  FRONTEND_KEYWORDS,
  MISMATCH_LANGUAGES,
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

  // ── Stack signal (prerequisite for the title bonus) ────────────────
  // Node / TypeScript / React in the body means the role is actually in
  // Hany's stack, not just an FDE/fullstack title bolted onto a Python shop.
  const HAS_STACK_SIGNAL = /\b(node\.?js|typescript|react|next\.?js|express|prisma|graphql)\b/i;
  const stackSignal = HAS_STACK_SIGNAL.test(j.description) || HAS_STACK_SIGNAL.test(j.title);

  // ── Title weighting (strongest signal — gated by stack signal) ─────
  for (const kw of PROFILE_KEYWORDS_HI) {
    if (titleLo.includes(kw)) {
      if (stackSignal) {
        score += 30;
        reasons.push(`+30 title match: ${kw}`);
      } else {
        score += 10;
        reasons.push(`+10 title match: ${kw} (but no JS/TS stack signal)`);
      }
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

  // ── Egypt location (STRICT — flag flips only on LOCATION match) ────
  // "remoteFromEgypt" controls the Egypt-first filter, so a body mention
  // like "EMEA benefits" or "global remote" is NOT enough. It only gives
  // a score bump.
  let remoteFromEgypt: boolean | null = null;
  const egyptInLocation = EGYPT_SIGNALS.some((s) => loc.includes(s));
  const egyptInBody = EGYPT_SIGNALS.some((s) => text.includes(s));
  if (egyptInLocation) {
    score += 40;
    reasons.push('+40 Egypt/MENA in location');
    remoteFromEgypt = true;
  } else if (egyptInBody) {
    score += 10;
    reasons.push('+10 Egypt/MENA mentioned in body');
    // do NOT flip remoteFromEgypt — body mentions are too noisy
  }

  // ── Remote + global language (moderate) ────────────────────────────
  // "fully remote / worldwide" does NOT imply Egypt-friendly either — many
  // remote-first companies still restrict by region. Only score bump.
  if (j.remote) {
    const globalOk = REMOTE_GLOBAL_SIGNALS.some((s) => text.includes(s) || loc.includes(s));
    if (globalOk) {
      score += 15;
      reasons.push('+15 fully-remote language');
    } else if (!egyptInLocation) {
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

  // ── Mismatch languages (user is JS/TS, not Python/Rust/Go/Scala) ───
  // Title mention is a strong signal; body mentions suggest the stack
  // leans on that language too.
  for (const lang of MISMATCH_LANGUAGES) {
    const re = new RegExp(`\\b${lang}\\b`, 'i');
    if (re.test(j.title)) {
      score -= 25;
      reasons.push(`−25 mismatch-lang in title: ${lang.trim()}`);
      break;
    }
  }
  let mismatchHits = 0;
  for (const lang of MISMATCH_LANGUAGES) {
    const re = new RegExp(`\\b${lang}\\b`, 'gi');
    const matches = j.description.match(re);
    if (matches) mismatchHits += matches.length;
  }
  if (mismatchHits >= 4) {
    score -= 50;
    reasons.push(`−50 heavy stack mismatch: ${mismatchHits} mentions of Python/Rust/Go/etc.`);
  } else if (mismatchHits >= 2) {
    score -= 35;
    reasons.push(`−35 stack lean: ${mismatchHits} mentions of Python/Rust/Go/etc.`);
  } else if (mismatchHits === 1) {
    score -= 20;
    reasons.push(`−20 mismatch-lang mentioned once`);
  }

  // ── Hard cap when mismatch languages are present ───────────────────
  // If body requires Python/Rust/Go/Scala/etc. and the title doesn't declare
  // a frontend lane, cap the score. Stops "Forward Deployed Engineer" scoring
  // 90+ when the actual stack is Python.
  const titleIsFrontendExplicit =
    /\b(front[- ]?end|ui engineer|ux engineer|react|next\.?js)\b/i.test(j.title);
  if (mismatchHits >= 1 && !titleIsFrontendExplicit) {
    const cap = mismatchHits >= 2 ? 35 : 50;
    if (score > cap) {
      reasons.push(`→ capped at ${cap}: mismatch lang + no frontend title`);
      score = cap;
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
