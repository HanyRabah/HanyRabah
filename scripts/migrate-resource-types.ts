import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting resource type migration...');

  try {
    // Update AESTHETIC_GOODS to TECH_ESSENTIALS
    const techResult = await prisma.$executeRaw`
      UPDATE resources 
      SET type = 'TECH_ESSENTIALS' 
      WHERE type = 'AESTHETIC_GOODS'
    `;
    console.log(`✓ Updated ${techResult} AESTHETIC_GOODS records to TECH_ESSENTIALS`);

    // Update BOUTIQUE to WALLPAPERS
    const wallpaperResult = await prisma.$executeRaw`
      UPDATE resources 
      SET type = 'WALLPAPERS' 
      WHERE type = 'BOUTIQUE'
    `;
    console.log(`✓ Updated ${wallpaperResult} BOUTIQUE records to WALLPAPERS`);

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
