import type { RawJob, ScoredJob } from './types';
import { BLOCKERS, PROFILE_KEYWORDS_HI, PROFILE_KEYWORDS_LO } from './companies';

const EGYPT_FRIENDLY_SIGNALS = [
  'worldwide',
  'anywhere',
  'global',
  'fully remote',
  'remote-first',
  'remote first',
  'emea',
  'mena',
  'middle east',
  'egypt',
  'cairo',
];

const VISA_FRIENDLY_SIGNALS = [
  'visa sponsorship',
  'we sponsor',
  'relocation support',
  'relocation package',
  'visa support',
];

/**
 * Deterministic score — no LLM in v1.
 * 0..100. >=70 → "Today" tab. 40–69 → surfaced but lower rank. <40 dropped.
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
      break; // credit title match once
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

  // ── Low-value keyword hits ─────────────────────────────────────────
  let loBody = 0;
  for (const kw of PROFILE_KEYWORDS_LO) {
    if (text.includes(kw)) loBody++;
  }
  if (loBody > 0) {
    const add = Math.min(loBody * 2, 15);
    score += add;
    reasons.push(`+${add} ${loBody} stack-match keyword${loBody > 1 ? 's' : ''}`);
  }

  // ── Remote / location friendliness to Egypt ────────────────────────
  let remoteFromEgypt: boolean | null = null;
  if (j.remote) {
    const egyptOk = EGYPT_FRIENDLY_SIGNALS.some((s) => text.includes(s) || loc.includes(s));
    if (egyptOk) {
      score += 15;
      reasons.push('+15 remote + Egypt-friendly language');
      remoteFromEgypt = true;
    } else {
      // Remote but unclear whether open to Egypt specifically
      score += 5;
      reasons.push('+5 remote (region unspecified)');
    }
  }

  // ── Visa sponsorship (mostly relevant for on-site roles) ───────────
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
      break; // only credit one blocker so score doesn't go absurdly negative
    }
  }

  // ── Normalize ──────────────────────────────────────────────────────
  score = Math.max(0, Math.min(100, score));

  return {
    ...j,
    score,
    reasons,
    visaFriendly,
    remoteFromEgypt,
  };
}
