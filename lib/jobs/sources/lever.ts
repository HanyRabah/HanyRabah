import type { RawJob } from '../types';

/**
 * Lever public postings API:
 *   GET https://api.lever.co/v0/postings/<slug>?mode=json
 */
export async function fetchLever(slug: string, companyName: string): Promise<RawJob[]> {
  const url = `https://api.lever.co/v0/postings/${slug}?mode=json`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'HanyJobRadar/1.0' },
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`Lever ${slug}: HTTP ${res.status}`);
  const data = (await res.json()) as Array<{
    id: string;
    text: string;
    hostedUrl: string;
    categories?: { location?: string; commitment?: string; department?: string; team?: string };
    description?: string;
    descriptionPlain?: string;
    workplaceType?: string;
    createdAt?: number;
  }>;

  return (data ?? []).map((j) => {
    const loc = j.categories?.location ?? '';
    const workplace = j.workplaceType ?? '';
    return {
      externalId: j.id,
      source: 'LEVER' as const,
      companySlug: slug,
      companyName,
      title: j.text,
      location: loc || undefined,
      remote:
        workplace.toLowerCase() === 'remote' ||
        /remote|anywhere/i.test(loc) ||
        /remote/i.test(j.text),
      description: (j.descriptionPlain ?? stripHtml(j.description ?? '')).slice(0, 4000),
      url: j.hostedUrl,
      postedAt: j.createdAt ? new Date(j.createdAt) : undefined,
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
