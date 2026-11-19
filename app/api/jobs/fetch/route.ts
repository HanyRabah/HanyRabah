import { NextResponse } from 'next/server';
import { fetchAll } from '@/lib/jobs/fetchAll';

export const runtime = 'nodejs';
export const maxDuration = 300; // seconds — long enough for all sources
export const dynamic = 'force-dynamic';

/**
 * Cron endpoint — called by Vercel Cron (daily at 04:00 UTC = 06:00 Cairo).
 * Protected by `CRON_SECRET`. Vercel Cron sends `Authorization: Bearer <CRON_SECRET>`.
 */
export async function GET(req: Request) {
  const auth = req.headers.get('authorization') ?? '';
  const cronSecret = process.env.CRON_SECRET;

  // Allow unauthenticated local dev only when CRON_SECRET is unset.
  if (cronSecret && auth !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const start = Date.now();
  try {
    const result = await fetchAll();
    return NextResponse.json({
      ok: true,
      durationMs: Date.now() - start,
      ...result,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

export const POST = GET;
