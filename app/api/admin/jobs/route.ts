import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/jobs?status=NEW|APPLIED|DISMISSED|SURFACED
 * Returns jobs ordered by score desc, fetchedAt desc.
 */
export async function GET(req: Request) {
  const session = await getServerSession();
  if (!isAdmin(session?.user?.email)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const statusParam = (searchParams.get('status') ?? 'NEW').toUpperCase();

  // "SURFACED" = NEW + SURFACED (anything not applied/dismissed)
  const whereByStatus =
    statusParam === 'SURFACED'
      ? { status: { in: ['NEW' as const, 'SURFACED' as const] } }
      : { status: statusParam as 'NEW' | 'APPLIED' | 'DISMISSED' | 'SURFACED' | 'ARCHIVED' };

  const jobs = await prisma.job.findMany({
    where: whereByStatus,
    orderBy: [{ score: 'desc' }, { fetchedAt: 'desc' }],
    include: { action: true, companyRef: { select: { tier: true } } },
    take: 100,
  });

  return NextResponse.json({ jobs });
}
