import type { RawJob } from '../types';

/**
 * Workday public job-search API. Public to anyone with the right tenant URL.
 *
 *   POST https://<sub>.<pod>.myworkdayjobs.com/wday/cxs/<tenant>/<board>/jobs
 *   body: { appliedFacets: { locationCountry: ["Egypt"] }, limit, offset, searchText }
 *
 * Each company has its own (sub, pod, tenant, board). We pass them as one
 * `wdConfig` object so the adapter is boring and generic.
 */
export interface WorkdayConfig {
  subdomain: string;      // e.g. "pwc"
  pod: string;            // e.g. "wd3"
  tenant: string;         // e.g. "pwc"
  board: string;          // e.g. "Global_Experienced_Careers"
  /**
   * Country name as Workday indexes it in the locationCountry facet.
   * "Egypt" matches most tenants. Some use ISO-ish names.
   */
  countries?: string[];
  searchText?: string;
}

interface WorkdayJob {
  title: string;
  externalPath: string;   // e.g. "/en-US/Global_Experienced_Careers/job/Senior-Dev_..."
  locationsText?: string;
  postedOn?: string;
  bulletFields?: string[];
}

interface WorkdayResponse {
  jobPostings?: WorkdayJob[];
  total?: number;
}

export async function fetchWorkday(
  companyName: string,
  slug: string,
  wd: WorkdayConfig,
): Promise<RawJob[]> {
  const base = `https://${wd.subdomain}.${wd.pod}.myworkdayjobs.com`;
  const url = `${base}/wday/cxs/${wd.tenant}/${wd.board}/jobs`;

  // Workday location facets are tenant-specific (locationCountry, locations,
  // locationHierarchy1, primaryLocation, …). Try with facet first; on
  // 400/422 (facet unknown), retry without. Always post-filter by location
  // text, since even "valid" facets are sometimes silently ignored.
  // Workday caps `limit` at 20. For Egypt-office postings (handful per tenant)
  // this is enough. For broader fetches we'd need to paginate via `offset`.
  const baseBody = { limit: 20, offset: 0, searchText: wd.searchText ?? '' };
  const bodyWithFacet = {
    ...baseBody,
    appliedFacets: wd.countries?.length ? { locationCountry: wd.countries } : {},
  };
  const bodyNoFacet = { ...baseBody, appliedFacets: {} };

  const doFetch = (body: object) =>
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': 'HanyJobRadar/1.0',
      },
      body: JSON.stringify(body),
      next: { revalidate: 0 },
    });

  let res = await doFetch(bodyWithFacet);
  if (!res.ok && (res.status === 400 || res.status === 422)) {
    res = await doFetch(bodyNoFacet);
  }
  if (!res.ok) throw new Error(`Workday ${wd.tenant}: HTTP ${res.status}`);
  const data = (await res.json()) as WorkdayResponse;

  const wantedCountries = (wd.countries ?? ['Egypt']).map((c) => c.toLowerCase());
  const EGYPT_CITY_HINTS = ['cairo', 'giza', 'alexandria'];

  return (data.jobPostings ?? [])
    .filter((j) => {
      const loc = (j.locationsText ?? '').toLowerCase();
      if (!loc) return false;
      return (
        wantedCountries.some((c) => loc.includes(c)) ||
        EGYPT_CITY_HINTS.some((c) => loc.includes(c))
      );
    })
    .map((j) => {
      const absoluteUrl = `${base}${j.externalPath}`;
      const loc = j.locationsText ?? '';
      const description = (j.bulletFields ?? []).join(' · ').slice(0, 4000);
      const extId = j.externalPath.split('/').pop() ?? j.title;
      return {
        externalId: extId,
        source: 'WORKDAY' as const,
        companySlug: slug,
        companyName,
        title: j.title,
        location: loc || undefined,
        remote: /remote|anywhere/i.test(loc),
        description,
        url: absoluteUrl,
        postedAt: j.postedOn ? parseWorkdayPosted(j.postedOn) : undefined,
      };
    });
}

/**
 * Workday posts dates like "Posted 3 Days Ago" or "Posted Today". Best-effort.
 */
function parseWorkdayPosted(s: string): Date | undefined {
  const m = s.match(/(\d+)\s+(day|days|week|weeks|month|months)/i);
  if (!m) return undefined;
  const n = parseInt(m[1], 10);
  const unit = m[2].toLowerCase();
  const ms =
    unit.startsWith('day') ? n * 86400_000 :
    unit.startsWith('week') ? n * 7 * 86400_000 :
    n * 30 * 86400_000;
  return new Date(Date.now() - ms);
}
