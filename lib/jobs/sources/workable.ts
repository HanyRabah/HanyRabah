import type { RawJob } from '../types';

/**
 * Workable public widget API:
 *   GET https://apply.workable.com/api/v1/widget/accounts/<slug>
 *
 * Returns { name, description, jobs: [{title, shortcode, url, country, city, locations[], telecommuting, department, function, ...}] }.
 *
 * NOTE: the widget doesn't include full job descriptions. We synthesize a
 * short description from department / function / industry / country for
 * scoring purposes. Good enough for title-based matching.
 */

interface WorkableJob {
  title: string;
  shortcode: string;
  code?: string;
  employment_type?: string;
  telecommuting?: boolean;
  department?: string;
  url?: string;
  shortlink?: string;
  application_url?: string;
  published_on?: string;
  created_at?: string;
  country?: string;
  city?: string;
  state?: string;
  function?: string;
  industry?: string;
  locations?: Array<{
    country?: string;
    countryCode?: string;
    city?: string;
    region?: string;
  }>;
}

interface WorkableAccount {
  name: string;
  description?: string;
  jobs: WorkableJob[];
}

export async function fetchWorkable(
  slug: string,
  companyName: string,
): Promise<RawJob[]> {
  const url = `https://apply.workable.com/api/v1/widget/accounts/${slug}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'HanyJobRadar/1.0' },
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`Workable ${slug}: HTTP ${res.status}`);
  const data = (await res.json()) as WorkableAccount;

  return (data.jobs ?? []).map((j) => {
    const location =
      [j.city, j.state, j.country].filter(Boolean).join(', ') ||
      j.locations?.[0]?.country ||
      'Unknown';
    const description = [
      j.department ? `Department: ${j.department}` : '',
      j.function ? `Function: ${j.function}` : '',
      j.industry ? `Industry: ${j.industry}` : '',
      j.employment_type ? `Employment: ${j.employment_type}` : '',
      `Location: ${location}`,
      data.description ? `About ${data.name}: ${data.description.slice(0, 500)}` : '',
    ]
      .filter(Boolean)
      .join(' · ');

    return {
      externalId: j.shortcode,
      source: 'WORKABLE' as const,
      companySlug: slug,
      companyName,
      title: j.title,
      location: location || undefined,
      remote: Boolean(j.telecommuting),
      description: description.slice(0, 4000),
      url: j.url ?? j.shortlink ?? `https://apply.workable.com/${slug}/j/${j.shortcode}/`,
      postedAt: j.published_on ? new Date(j.published_on) : undefined,
    };
  });
}
