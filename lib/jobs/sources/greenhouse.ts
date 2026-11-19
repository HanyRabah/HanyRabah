import type { RawJob } from '../types';

/**
 * Greenhouse public board API:
 *   GET https://boards-api.greenhouse.io/v1/boards/<slug>/jobs?content=true
 *
 * Returns { jobs: [{ id, title, absolute_url, location: {name}, content, updated_at, departments, ... }] }
 */
export async function fetchGreenhouse(slug: string, companyName: string): Promise<RawJob[]> {
  const url = `https://boards-api.greenhouse.io/v1/boards/${slug}/jobs?content=true`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'HanyJobRadar/1.0' },
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`GH ${slug}: HTTP ${res.status}`);
  const data = (await res.json()) as {
    jobs: Array<{
      id: number;
      title: string;
      absolute_url: string;
      location?: { name?: string };
      content?: string;
      updated_at?: string;
    }>;
  };

  return (data.jobs ?? []).map((j) => {
    const loc = j.location?.name ?? '';
    const description = stripHtml(j.content ?? '').slice(0, 4000);
    return {
      externalId: String(j.id),
      source: 'GREENHOUSE' as const,
      companySlug: slug,
      companyName,
      title: j.title,
      location: loc || undefined,
      remote: /remote|anywhere/i.test(loc) || /remote/i.test(j.title),
      description,
      url: j.absolute_url,
      postedAt: j.updated_at ? new Date(j.updated_at) : undefined,
    };
  });
}

function stripHtml(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}
