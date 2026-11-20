import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';
import { draftCoverLetter } from '@/lib/jobs/draftCover';

export const runtime = 'nodejs';
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

/**
 * POST /api/jobs/<id>/draft-cover
 *   ?force=1  → re-draft even if a draft exists
 */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession();
  if (!isAdmin(session?.user?.email)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const url = new URL(req.url);
  const force = url.searchParams.get('force') === '1';

  const job = await prisma.job.findUnique({ where: { id } });
  if (!job) return NextResponse.json({ error: 'not found' }, { status: 404 });

  const emailSubject = `Application: ${job.title} — Hany El Saydawy`;

  if (job.coverLetter && !force) {
    return NextResponse.json({
      ok: true,
      coverLetter: job.coverLetter,
      emailSubject,
      contactEmail: job.contactEmail,
      cached: true,
      coverLetterAt: job.coverLetterAt,
    });
  }

  try {
    const result = await draftCoverLetter({
      jobTitle: job.title,
      company: job.company,
      jobDescription: job.description,
      jobUrl: job.url,
    });

    await prisma.job.update({
      where: { id },
      data: {
        coverLetter: result.text,
        coverLetterAt: new Date(),
      },
    });

    return NextResponse.json({
      ok: true,
      coverLetter: result.text,
      emailSubject,
      contactEmail: job.contactEmail,
      cached: false,
      model: result.model,
      inputTokens: result.inputTokens,
      outputTokens: result.outputTokens,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
