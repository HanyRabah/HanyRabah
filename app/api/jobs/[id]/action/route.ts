import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';

export const runtime = 'nodejs';

const VALID = new Set(['APPLIED', 'DISMISSED', 'SAVED']);

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession();
  if (!isAdmin(session?.user?.email)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as { kind?: string; note?: string };
  const kind = (body.kind ?? '').toUpperCase();
  if (!VALID.has(kind)) {
    return NextResponse.json({ error: 'invalid kind' }, { status: 400 });
  }

  const status =
    kind === 'APPLIED' ? 'APPLIED' : kind === 'DISMISSED' ? 'DISMISSED' : 'SURFACED';

  const job = await prisma.job.update({
    where: { id },
    data: {
      status,
      action: {
        upsert: {
          create: { kind: kind as 'APPLIED' | 'DISMISSED' | 'SAVED', note: body.note },
          update: { kind: kind as 'APPLIED' | 'DISMISSED' | 'SAVED', note: body.note },
        },
      },
    },
    include: { action: true },
  });

  return NextResponse.json({ ok: true, job });
}
