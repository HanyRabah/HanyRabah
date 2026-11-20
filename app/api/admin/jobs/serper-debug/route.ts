import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { isAdmin } from '@/lib/auth';
import {
  fetchBaytViaSerper,
  fetchLinkedInHiringPosts,
  fetchWuzzufViaSerper,
} from '@/lib/jobs/sources/serper';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * Admin-only debug endpoint.
 *   /api/admin/jobs/serper-debug         → run all three source functions
 *   /api/admin/jobs/serper-debug?q=foo   → run one raw Serper query
 */
export async function GET(req: Request) {
  const session = await getServerSession();
  if (!isAdmin(session?.user?.email)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const hasKey = Boolean(process.env.SERPER_API_KEY);
  const { searchParams } = new URL(req.url);
  const rawQuery = searchParams.get('q');

  if (rawQuery) {
    // Raw-query mode — hit Serper directly, return organic results.
    try {
      const res = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: {
          'X-API-KEY': process.env.SERPER_API_KEY ?? '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ q: rawQuery, num: 10 }),
      });
      const body = await res.text();
      let parsed: unknown;
      try { parsed = JSON.parse(body); } catch { parsed = body; }
      return NextResponse.json({ query: rawQuery, status: res.status, response: parsed });
    } catch (e: unknown) {
      return NextResponse.json({ query: rawQuery, error: String(e) }, { status: 500 });
    }
  }

  const runOne = async (
    name: string,
    fn: () => Promise<Array<{ title: string; url: string; location?: string; description: string }>>,
  ) => {
    try {
      const jobs = await fn();
      return {
        source: name,
        ok: true,
        count: jobs.length,
        sample: jobs.slice(0, 5).map((j) => ({
          title: j.title,
          url: j.url,
          location: j.location,
          snippet: j.description.slice(0, 160),
        })),
      };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      return { source: name, ok: false, error: msg, count: 0, sample: [] };
    }
  };

  const [linkedin, wuzzuf, bayt] = await Promise.all([
    runOne('LINKEDIN_POSTS', fetchLinkedInHiringPosts),
    runOne('WUZZUF', fetchWuzzufViaSerper),
    runOne('BAYT', fetchBaytViaSerper),
  ]);

  return NextResponse.json({
    serperKeyPresent: hasKey,
    results: [linkedin, wuzzuf, bayt],
  });
}
