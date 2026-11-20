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
 * Admin-only debug endpoint — runs the 3 Serper queries and returns the raw
 * counts + first 3 results per source. Shows exactly what Serper replies.
 */
export async function GET() {
  const session = await getServerSession();
  if (!isAdmin(session?.user?.email)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const hasKey = Boolean(process.env.SERPER_API_KEY);

  const runOne = async (name: string, fn: () => Promise<Array<{ title: string; url: string; location?: string; description: string }>>) => {
    try {
      const jobs = await fn();
      return {
        source: name,
        ok: true,
        count: jobs.length,
        sample: jobs.slice(0, 3).map((j) => ({
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
