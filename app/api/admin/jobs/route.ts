import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/jobs
 *   ?status=SURFACED|APPLIED|DISMISSED  (default SURFACED = NEW + SURFACED)
 *   ?includeGlobal=1                    (default 0 — Egypt-first)
 *
 * When includeGlobal=0, returns only:
 *   - Jobs from companies with egyptPresence=true, OR
 *   - Jobs with remoteFromEgypt=true, OR
 *   - Jobs where the source is RemoteOK AND remote=true (unknown-region remote).
 */
export async function GET(req: Request) {
  const session = await getServerSession();
  if (!isAdmin(session?.user?.email)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const statusParam = (searchParams.get('status') ?? 'SURFACED').toUpperCase();
  const includeGlobal = searchParams.get('includeGlobal') === '1';

  const statusWhere =
    statusParam === 'SURFACED'
      ? { status: { in: ['NEW' as const, 'SURFACED' as const] } }
      : { status: statusParam as 'NEW' | 'APPLIED' | 'DISMISSED' | 'SURFACED' | 'ARCHIVED' };

  // Egypt-first filter: require a REAL Egypt signal, not just a noisy body mention.
  //   1. Company has an Egypt office (egyptPresence=true), OR
  //   2. Job location literally mentions Cairo / Egypt / MENA
  //      (we check via a case-insensitive location contains)
  const egyptWhere = includeGlobal
    ? {}
    : {
        OR: [
          { companyRef: { egyptPresence: true } },
          { location: { contains: 'Cairo', mode: 'insensitive' as const } },
          { location: { contains: 'Egypt', mode: 'insensitive' as const } },
          { location: { contains: 'MENA', mode: 'insensitive' as const } },
          { location: { contains: 'Middle East', mode: 'insensitive' as const } },
        ],
      };

  const allJobs = await prisma.job.findMany({
    where: { ...statusWhere, ...egyptWhere },
    orderBy: [{ score: 'desc' }, { fetchedAt: 'desc' }],
    include: {
      action: true,
      companyRef: { select: { tier: true, egyptPresence: true } },
    },
    take: 150,
  });

  // Egypt-first ordering: within the same status, Egypt-presence companies
  // and Egypt-located jobs float to the top, score desc inside each group.
  const isEgypt = (j: typeof allJobs[number]) =>
    j.companyRef?.egyptPresence === true ||
    /\b(cairo|egypt|mena|middle east)\b/i.test(j.location ?? '');

  const egypt = allJobs.filter(isEgypt);
  const global = allJobs.filter((j) => !isEgypt(j));
  const jobs = [...egypt, ...global].slice(0, 100);

  return NextResponse.json({ jobs, includeGlobal });
}
