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
    if (existing) {
      await prisma.targetCompany.update({
        where: { id: existing.id },
        data: { name: c.name, tier: c.tier, careersUrl: c.careersUrl, notes: c.notes },
      });
      updated++;
    } else {
      await prisma.targetCompany.create({
        data: {
          name: c.name,
          slug: c.slug,
          source: c.source,
          tier: c.tier,
          careersUrl: c.careersUrl,
          notes: c.notes,
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
