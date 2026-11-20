import type { RawJob } from '../types';

/**
 * Serper.dev — Google search API. Legal way to surface content behind
 * Cloudflare (Wuzzuf, Bayt) or private feeds (LinkedIn posts) via Google's
 * public search index.
 *
 * Free tier: 2500 queries/mo. We use ~3 queries per daily cron run = ~90/mo.
 * Set SERPER_API_KEY in Vercel env vars.
 */

interface SerperResult {
  title: string;
  link: string;
  snippet?: string;
  date?: string;
}

interface SerperResponse {
  organic?: SerperResult[];
}

async function serperQuery(query: string, num = 10): Promise<SerperResult[]> {
  const key = process.env.SERPER_API_KEY;
  if (!key) return [];

  const res = await fetch('https://google.serper.dev/search', {
    method: 'POST',
    headers: {
      'X-API-KEY': key,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ q: query, num }),
    next: { revalidate: 0 },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Serper: HTTP ${res.status} — ${body.slice(0, 200)}`);
  }
  const data = (await res.json()) as SerperResponse;
  return data.organic ?? [];
}

function hashId(s: string): string {
  // Stable short id from URL for deduplication.
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return `s_${Math.abs(h).toString(36)}`;
}

// Extract first email address from text, if present.
function extractEmail(text: string): string | undefined {
  const m = text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/);
  return m ? m[0].toLowerCase() : undefined;
}

/**
 * LinkedIn hiring-post discovery. Finds posts like "we're hiring Senior Frontend
 * in Egypt, DM me" that recruiters publish on their feed.
 */
export async function fetchLinkedInHiringPosts(): Promise<RawJob[]> {
  // Serper rejects nested OR groups. Run simple AND-only queries and merge.
  // Google indexes very few LinkedIn posts, so queries have to be broad.
  const queries = [
    'site:linkedin.com/posts hiring frontend egypt',
    'site:linkedin.com/posts hiring full stack egypt',
    'site:linkedin.com/posts hiring senior egypt',
    'site:linkedin.com/posts we are hiring frontend',
    'site:linkedin.com/posts hiring react developer',
    'site:linkedin.com/posts forward deployed engineer',
  ];
  const results: SerperResult[] = [];
  for (const q of queries) {
    try {
      const r = await serperQuery(q, 10);
      results.push(...r);
    } catch {
      // single query failure is non-fatal
    }
  }
  const seen = new Set<string>();
  return results
    .filter((r) => r.link.includes('/posts/') && !seen.has(r.link) && seen.add(r.link))
    .map((r) => {
      const combined = `${r.title} ${r.snippet ?? ''}`;
      return {
        externalId: hashId(r.link),
        source: 'LINKEDIN_POSTS' as const,
        companySlug: 'linkedin-post',
        companyName: 'LinkedIn Post',
        title: r.title.replace(/ \| LinkedIn$/i, '').slice(0, 200),
        location: inferLocation(combined),
        remote: /remote/i.test(combined),
        description: (r.snippet ?? '').slice(0, 4000),
        url: r.link,
        postedAt: r.date ? parseRelative(r.date) : undefined,
        contactEmail: extractEmail(combined),
      };
    });
}

/**
 * Wuzzuf jobs via Google index (direct scraping is CF-blocked).
 */
export async function fetchWuzzufViaSerper(): Promise<RawJob[]> {
  // Wuzzuf indexes jobs under /jobs/p/<id>-<slug>. Broaden the query set.
  const queries = [
    'site:wuzzuf.net senior frontend',
    'site:wuzzuf.net senior full stack',
    'site:wuzzuf.net senior react',
    'site:wuzzuf.net lead frontend',
    'site:wuzzuf.net senior next.js',
    'site:wuzzuf.net senior node.js',
  ];
  const results: SerperResult[] = [];
  for (const q of queries) {
    try {
      const r = await serperQuery(q, 10);
      results.push(...r);
    } catch {}
  }
  const seen = new Set<string>();
  // Real Wuzzuf job URLs: /jobs/p/<id-slug>
  const isRealJob = (url: string) => /\/jobs\/p\//i.test(url);
  return results
    .filter((r) => isRealJob(r.link) && !seen.has(r.link) && seen.add(r.link))
    .map((r) => {
      const combined = `${r.title} ${r.snippet ?? ''}`;
      return {
        externalId: hashId(r.link),
        source: 'WUZZUF' as const,
        companySlug: 'wuzzuf',
        companyName: extractWuzzufCompany(r.title) ?? 'Wuzzuf',
        title: r.title.replace(/ \| Wuzzuf.*$/i, '').slice(0, 200),
        location: 'Egypt',
        remote: /remote/i.test(combined),
        description: (r.snippet ?? '').slice(0, 4000),
        url: r.link,
        contactEmail: extractEmail(combined),
      };
    });
}

/**
 * Bayt jobs via Google index.
 */
export async function fetchBaytViaSerper(): Promise<RawJob[]> {
  const queries = [
    'site:bayt.com/en/egypt senior frontend',
    'site:bayt.com/en/egypt senior "full stack"',
    'site:bayt.com/en/egypt senior react',
    'site:bayt.com/en/egypt lead frontend',
    'site:bayt.com/en/egypt next.js',
    'site:bayt.com/en/egypt node.js senior',
  ];
  const results: SerperResult[] = [];
  for (const q of queries) {
    try {
      const r = await serperQuery(q, 10);
      results.push(...r);
    } catch {}
  }
  const seen = new Set<string>();
  // Bayt real jobs end with a numeric id (e.g. ...75427004/).
  // List pages end with `-jobs/` and should be skipped.
  const isRealJob = (url: string) => /-\d{5,}\/?$/.test(url) && !/\-jobs\/?$/i.test(url);
  return results
    .filter((r) => isRealJob(r.link) && !seen.has(r.link) && seen.add(r.link))
    .map((r) => {
      const combined = `${r.title} ${r.snippet ?? ''}`;
      return {
        externalId: hashId(r.link),
        source: 'BAYT' as const,
        companySlug: 'bayt',
        companyName: extractBaytCompany(r.title) ?? 'Bayt',
        title: r.title.replace(/ \| Bayt.*$/i, '').slice(0, 200),
        location: 'Egypt',
        remote: /remote/i.test(combined),
        description: (r.snippet ?? '').slice(0, 4000),
        url: r.link,
        contactEmail: extractEmail(combined),
      };
    });
}

function inferLocation(text: string): string | undefined {
  if (/\b(cairo|egypt)\b/i.test(text)) return 'Egypt';
  if (/\b(mena|middle east)\b/i.test(text)) return 'Middle East';
  if (/\bremote\b/i.test(text)) return 'Remote';
  return undefined;
}

function parseRelative(s: string): Date | undefined {
  const m = s.match(/(\d+)\s+(day|days|week|weeks|month|months|hour|hours)\s+ago/i);
  if (!m) return undefined;
  const n = parseInt(m[1], 10);
  const u = m[2].toLowerCase();
  const ms =
    u.startsWith('hour') ? n * 3600_000 :
    u.startsWith('day')  ? n * 86400_000 :
    u.startsWith('week') ? n * 7 * 86400_000 :
    n * 30 * 86400_000;
  return new Date(Date.now() - ms);
}

function extractWuzzufCompany(title: string): string | null {
  // "Job Title at Company Name | Wuzzuf.net" → "Company Name"
  const m = title.match(/\s+at\s+([^|]+?)\s*\|/i);
  return m ? m[1].trim() : null;
}

function extractBaytCompany(title: string): string | null {
  // Bayt varies; best-effort.
  const m = title.match(/\s+at\s+([^|,]+)/i);
  return m ? m[1].trim() : null;
}
