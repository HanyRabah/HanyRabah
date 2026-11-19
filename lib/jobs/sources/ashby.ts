import type { RawJob } from '../types';

/**
 * Ashby public board JSON API:
 *   GET https://api.ashbyhq.com/posting-api/job-board/<slug>?includeCompensation=true
 */
export async function fetchAshby(slug: string, companyName: string): Promise<RawJob[]> {
  const url = `https://api.ashbyhq.com/posting-api/job-board/${slug}?includeCompensation=true`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'HanyJobRadar/1.0' },
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`Ashby ${slug}: HTTP ${res.status}`);
  const data = (await res.json()) as {
    jobs: Array<{
      id: string;
      title: string;
      location: string;
      isRemote: boolean;
      jobUrl: string;
      descriptionPlain?: string;
      descriptionHtml?: string;
      publishedDate?: string;
      compensationTierSummary?: string;
    }>;
  };

  return (data.jobs ?? []).map((j) => ({
    externalId: j.id,
    source: 'ASHBY' as const,
    companySlug: slug,
    companyName,
    title: j.title,
    location: j.location || undefined,
    remote: Boolean(j.isRemote) || /remote/i.test(j.location ?? ''),
    description: (j.descriptionPlain ?? stripHtml(j.descriptionHtml ?? '')).slice(0, 4000),
    url: j.jobUrl,
    salary: j.compensationTierSummary || undefined,
    postedAt: j.publishedDate ? new Date(j.publishedDate) : undefined,
  }));
}

function stripHtml(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}
