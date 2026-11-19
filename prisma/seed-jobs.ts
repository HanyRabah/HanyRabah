/**
 * Seed target_companies table from lib/jobs/companies.ts.
 * Idempotent — safe to re-run.
 *
 *   npx tsx prisma/seed-jobs.ts
 */
import { PrismaClient } from '@prisma/client';
import { TARGET_COMPANIES } from '../lib/jobs/companies';

const prisma = new PrismaClient();

async function main() {
  let created = 0;
  let updated = 0;
  for (const c of TARGET_COMPANIES) {
    const existing = await prisma.targetCompany.findUnique({
      where: { slug_source: { slug: c.slug, source: c.source } },
    });
    const workdayConfig = c.workdayConfig ? JSON.parse(JSON.stringify(c.workdayConfig)) : null;
    // Find by name (canonical identity) — tolerates slug/source changes.
    const byName = await prisma.targetCompany.findUnique({ where: { name: c.name } });
    if (byName) {
      await prisma.targetCompany.update({
        where: { id: byName.id },
        data: {
          slug: c.slug,
          source: c.source,
          tier: c.tier,
          egyptPresence: c.egyptPresence ?? false,
          careersUrl: c.careersUrl,
          notes: c.notes,
          workdayConfig,
        },
      });
      updated++;
    } else if (existing) {
      // Rare: name differs but slug+source matches an older row.
      await prisma.targetCompany.update({
        where: { id: existing.id },
        data: {
          name: c.name,
          tier: c.tier,
          egyptPresence: c.egyptPresence ?? false,
          careersUrl: c.careersUrl,
          notes: c.notes,
          workdayConfig,
        },
      });
      updated++;
    } else {
      await prisma.targetCompany.create({
        data: {
          name: c.name,
          slug: c.slug,
          source: c.source,
          tier: c.tier,
          egyptPresence: c.egyptPresence ?? false,
          careersUrl: c.careersUrl,
          notes: c.notes,
          workdayConfig,
        },
      });
      created++;
    }
  }
  console.log(`seed-jobs: created ${created}, updated ${updated}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
