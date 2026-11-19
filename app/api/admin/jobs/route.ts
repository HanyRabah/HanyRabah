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

  const egyptWhere = includeGlobal
    ? {}
    : {
        OR: [
          { companyRef: { egyptPresence: true } },
          { remoteFromEgypt: true },
        ],
      };

  const jobs = await prisma.job.findMany({
    where: { ...statusWhere, ...egyptWhere },
    orderBy: [{ score: 'desc' }, { fetchedAt: 'desc' }],
    include: {
      action: true,
      companyRef: { select: { tier: true, egyptPresence: true } },
    },
    take: 100,
  });

  return NextResponse.json({ jobs, includeGlobal });
}
