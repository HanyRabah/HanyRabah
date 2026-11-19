import { prisma } from '@/lib/prisma';
import { TARGET_COMPANIES } from './companies';
import { fetchAshby } from './sources/ashby';
import { fetchGreenhouse } from './sources/greenhouse';
import { fetchLever } from './sources/lever';
import { fetchRemoteOK } from './sources/remoteok';
import { fetchWorkday } from './sources/workday';
import { scoreJob } from './score';
import type { FetchReport, RawJob, ScoredJob } from './types';

/**
 * Runs every source in parallel. Rejected adapters don't tank the batch.
 * Returns scored, deduped, persisted jobs + a report per source.
 */
export async function fetchAll(): Promise<{
  reports: FetchReport[];
  inserted: number;
  skippedDuplicates: number;
  droppedLowScore: number;
}> {
  const reports: FetchReport[] = [];

  // ── Target-company adapters (parallel) ─────────────────────────────
  const companyPromises = TARGET_COMPANIES.map(async (c) => {
    try {
      let jobs: RawJob[] = [];
      switch (c.source) {
        case 'GREENHOUSE':
          jobs = await fetchGreenhouse(c.slug, c.name);
          break;
        case 'ASHBY':
          jobs = await fetchAshby(c.slug, c.name);
          break;
        case 'LEVER':
          jobs = await fetchLever(c.slug, c.name);
          break;
        case 'WORKDAY':
          if (!c.workdayConfig) throw new Error('missing workdayConfig');
          jobs = await fetchWorkday(c.name, c.slug, c.workdayConfig);
          break;
        case 'OTHER':
          // Watch-only company, no auto-fetch.
          return { report: { source: c.source, companySlug: c.slug, count: 0, ok: true }, jobs: [] };
        default:
          return { report: { source: c.source, companySlug: c.slug, count: 0, ok: false, error: 'unsupported source' }, jobs: [] };
      }
      return {
        report: { source: c.source, companySlug: c.slug, count: jobs.length, ok: true },
        jobs,
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return {
        report: { source: c.source, companySlug: c.slug, count: 0, ok: false, error: msg },
        jobs: [] as RawJob[],
      };
    }
  });

  // ── Broad sources (parallel with company fetches) ──────────────────
  const broadPromises: Promise<{ report: FetchReport; jobs: RawJob[] }>[] = [
    fetchRemoteOK()
      .then((jobs) => ({ report: { source: 'REMOTEOK', count: jobs.length, ok: true }, jobs }))
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : String(err);
        return { report: { source: 'REMOTEOK', count: 0, ok: false, error: msg }, jobs: [] };
      }),
  ];

  const settled = await Promise.all([...companyPromises, ...broadPromises]);

  const allRaw: RawJob[] = [];
  for (const s of settled) {
    reports.push(s.report);
    allRaw.push(...s.jobs);
  }

  // ── Score + filter ─────────────────────────────────────────────────
  const scored: ScoredJob[] = allRaw.map(scoreJob).filter((j) => j.score >= 40);
  const droppedLowScore = allRaw.length - scored.length;

  // ── Persist (upsert on externalId + source) ────────────────────────
  // Map companySlug → TargetCompany.id (for Greenhouse/Ashby/Lever jobs).
  const companyRows = await prisma.targetCompany.findMany({ select: { id: true, slug: true, source: true } });
  const companyMap = new Map(companyRows.map((c) => [`${c.source}:${c.slug}`, c.id]));

  let inserted = 0;
  let skippedDuplicates = 0;

  for (const j of scored) {
    try {
      const companyId = companyMap.get(`${j.source}:${j.companySlug}`);
      const res = await prisma.job.upsert({
        where: {
          externalId_source: { externalId: j.externalId, source: j.source },
        },
        update: {
          // Refresh score + reasons in case our scorer improves
          score: j.score,
          scoreReasons: j.reasons,
          remote: j.remote,
          location: j.location,
          salary: j.salary,
          visaFriendly: j.visaFriendly,
          remoteFromEgypt: j.remoteFromEgypt,
        },
        create: {
          externalId: j.externalId,
          source: j.source,
          title: j.title,
          company: j.companyName,
          companyId: companyId ?? null,
          location: j.location,
          remote: j.remote,
          description: j.description,
          url: j.url,
          salary: j.salary,
          tags: j.tags ?? [],
          postedAt: j.postedAt,
          score: j.score,
          scoreReasons: j.reasons,
          visaFriendly: j.visaFriendly,
          remoteFromEgypt: j.remoteFromEgypt,
          status: 'NEW',
        },
      });
      // Prisma upsert doesn't return "was it created?" so count via createdAt age
      const createdNow = Date.now() - res.fetchedAt.getTime() < 60_000;
      if (createdNow) inserted++;
      else skippedDuplicates++;
    } catch (err) {
      // single-job failure is non-fatal
      console.error('Job upsert failed', j.title, j.source, j.externalId, err);
    }
  }

  return { reports, inserted, skippedDuplicates, droppedLowScore };
}
