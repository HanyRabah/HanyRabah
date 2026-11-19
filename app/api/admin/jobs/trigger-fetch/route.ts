import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { fetchAll } from '@/lib/jobs/fetchAll';
import { isAdmin } from '@/lib/auth';

export const runtime = 'nodejs';
export const maxDuration = 300;
export const dynamic = 'force-dynamic';

/**
 * Admin-triggered fetch (same work as /api/jobs/fetch, but admin-auth instead
 * of CRON_SECRET). Lets you kick off a sync from the UI.
 */
export async function POST() {
  const session = await getServerSession();
  if (!isAdmin(session?.user?.email)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const start = Date.now();
  try {
    const result = await fetchAll();
    return NextResponse.json({ ok: true, durationMs: Date.now() - start, ...result });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
