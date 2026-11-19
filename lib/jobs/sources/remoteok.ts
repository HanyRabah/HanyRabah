import type { RawJob } from '../types';

/**
 * RemoteOK JSON feed:
 *   GET https://remoteok.com/api
 *
 * First array element is metadata (legal notice). The rest are jobs.
 * Filter to dev / senior / lead / FDE-shaped titles before dedup.
 */
export async function fetchRemoteOK(): Promise<RawJob[]> {
  const url = `https://remoteok.com/api`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'HanyJobRadar/1.0' },
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`RemoteOK: HTTP ${res.status}`);
  const data = (await res.json()) as Array<Record<string, unknown>>;

  // First item is the legal disclaimer; rest are jobs.
  const jobs = data.slice(1) as Array<{
    id?: string;
    slug?: string;
    url?: string;
    company?: string;
    company_logo?: string;
    position?: string;
    location?: string;
    tags?: string[];
    description?: string;
    date?: string;
    salary_min?: number;
    salary_max?: number;
  }>;

  const TITLE_FILTER =
    /(senior|staff|lead|principal|tech lead|technical lead|full[- ]?stack|fullstack|forward.{0,3}deployed|fde|software engineer|frontend|front-end|backend|back-end|react|next\.?js|node)/i;

  return jobs
    .filter((j) => j.position && TITLE_FILTER.test(j.position))
    .map((j) => {
      const id = j.id ?? j.slug ?? Math.random().toString(36).slice(2);
      const absoluteUrl = j.url?.startsWith('http') ? j.url : `https://remoteok.com/remote-jobs/${id}`;
      const salary =
        j.salary_min && j.salary_max ? `$${j.salary_min}–$${j.salary_max}` : undefined;
      return {
        externalId: String(id),
        source: 'REMOTEOK' as const,
        companySlug: (j.company ?? 'unknown').toLowerCase().replace(/\s+/g, '-'),
        companyName: j.company ?? 'Unknown',
        title: j.position!,
        location: j.location || undefined,
        remote: true,
        description: stripHtml(j.description ?? '').slice(0, 4000),
        url: absoluteUrl,
        salary,
        tags: Array.isArray(j.tags) ? j.tags : undefined,
        postedAt: j.date ? new Date(j.date) : undefined,
      };
    });
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}
