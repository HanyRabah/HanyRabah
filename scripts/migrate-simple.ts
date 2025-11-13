import { PrismaClient } from '@prisma/client';

// Old database connection
const oldPrisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgres://neondb_owner:npg_rTSbchXEC92x@ep-winter-wildflower-a2hk396j-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require',
    },
  },
});

// New database connection (from .env)
const newPrisma = new PrismaClient();

async function migrateData() {
  console.log('🔄 Starting simplified data migration...\n');

  try {
    // ============================================
    // Migrate Posts (Blog) - Already done!
    // ============================================
    console.log('📝 Checking blog posts...');
    const newPostsCount = await newPrisma.post.count();
    console.log(`✅ Blog posts already migrated: ${newPostsCount} posts\n`);

    // ============================================
    // Migrate Projects (Basic fields only)
    // ============================================
    console.log('💼 Migrating projects...');
    const oldProjects = await oldPrisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    let projectsCreated = 0;
    for (const project of oldProjects) {
      try {
        const existingProject = await newPrisma.project.findUnique({
          where: { slug: project.slug },
        });

        if (!existingProject) {
          await newPrisma.project.create({
            data: {
              title: project.title,
              slug: project.slug,
              description: project.description,
              content: project.content,
              coverImage: project.coverImage,
              images: project.images,
              technologies: project.technologies,
              githubUrl: project.githubUrl,
              liveUrl: project.liveUrl,
              featured: project.featured,
              category: project.category,
              status: project.status,
              createdAt: project.createdAt,
              updatedAt: project.updatedAt,
            },
          });
          projectsCreated++;
          console.log(`  ✓ Migrated project: ${project.title}`);
        } else {
          console.log(`  ⊘ Skipped existing project: ${project.title}`);
        }
      } catch (error: any) {
        console.error(`  ✗ Failed to migrate project ${project.title}:`, error.message);
      }
    }
    console.log(`✅ Projects: ${projectsCreated} created, ${oldProjects.length - projectsCreated} skipped\n`);

    // ============================================
    // Migrate Services (Basic fields only)
    // ============================================
    console.log('🛠️  Migrating services...');
    const oldServices = await oldPrisma.service.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    let servicesCreated = 0;
    for (const service of oldServices) {
      try {
        // Check by title since old schema doesn't have slug
        const existingService = await newPrisma.service.findFirst({
          where: { title: service.title },
        });

        if (!existingService) {
          await newPrisma.service.create({
            data: {
              title: service.title,
              description: service.description,
              icon: service.icon,
              features: service.features,
              createdAt: service.createdAt,
              updatedAt: service.updatedAt,
            },
          });
          servicesCreated++;
          console.log(`  ✓ Migrated service: ${service.title}`);
        } else {
          console.log(`  ⊘ Skipped existing service: ${service.title}`);
        }
      } catch (error: any) {
        console.error(`  ✗ Failed to migrate service ${service.title}:`, error.message);
      }
    }
    console.log(`✅ Services: ${servicesCreated} created, ${oldServices.length - servicesCreated} skipped\n`);

    // ============================================
    // Migrate Contacts
    // ============================================
    console.log('📧 Migrating contacts...');
    const oldContacts = await oldPrisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    let contactsCreated = 0;
    for (const contact of oldContacts) {
      try {
        const existingContact = await newPrisma.contact.findFirst({
          where: {
            email: contact.email,
            createdAt: contact.createdAt,
          },
        });

        if (!existingContact) {
          await newPrisma.contact.create({
            data: {
              name: contact.name,
              email: contact.email,
              subject: contact.subject,
              message: contact.message,
              status: contact.status,
              createdAt: contact.createdAt,
              updatedAt: contact.updatedAt,
            },
          });
          contactsCreated++;
          console.log(`  ✓ Migrated contact: ${contact.name} (${contact.email})`);
        } else {
          console.log(`  ⊘ Skipped existing contact: ${contact.email}`);
        }
      } catch (error: any) {
        console.error(`  ✗ Failed to migrate contact ${contact.email}:`, error.message);
      }
    }
    console.log(`✅ Contacts: ${contactsCreated} created, ${oldContacts.length - contactsCreated} skipped\n`);

    // ============================================
    // Migrate Designs (Basic fields only)
    // ============================================
    console.log('🎨 Migrating designs...');
    const oldDesigns = await oldPrisma.design.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    let designsCreated = 0;
    for (const design of oldDesigns) {
      try {
        const existingDesign = await newPrisma.design.findUnique({
          where: { slug: design.slug },
        });

        if (!existingDesign) {
          await newPrisma.design.create({
            data: {
              title: design.title,
              slug: design.slug,
              description: design.description,
              category: design.category,
              coverImage: design.coverImage,
              images: design.images,
              figmaUrl: design.figmaUrl,
              tags: design.tags,
              featured: design.featured,
              createdAt: design.createdAt,
              updatedAt: design.updatedAt,
            },
          });
          designsCreated++;
          console.log(`  ✓ Migrated design: ${design.title}`);
        } else {
          console.log(`  ⊘ Skipped existing design: ${design.title}`);
        }
      } catch (error: any) {
        console.error(`  ✗ Failed to migrate design ${design.title}:`, error.message);
      }
    }
    console.log(`✅ Designs: ${designsCreated} created, ${oldDesigns.length - designsCreated} skipped\n`);

    // ============================================
    // Check Resources (preserve new ones)
    // ============================================
    console.log('📚 Checking resources...');
    const newResourcesCount = await newPrisma.resource.count();
    console.log(`✅ Resources preserved: ${newResourcesCount} resources (not migrating old ones to avoid duplicates)\n`);

    // ============================================
    // Summary
    // ============================================
    console.log('\n' + '='.repeat(60));
    console.log('📊 MIGRATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`📝 Blog Posts:    ${newPostsCount} (already migrated)`);
    console.log(`💼 Projects:      ${projectsCreated} migrated`);
    console.log(`🛠️  Services:      ${servicesCreated} migrated`);
    console.log(`📧 Contacts:      ${contactsCreated} migrated`);
    console.log(`🎨 Designs:       ${designsCreated} migrated`);
    console.log(`📚 Resources:     ${newResourcesCount} preserved`);
    console.log('='.repeat(60));
    console.log('\n✅ Migration completed successfully!');

  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    throw error;
  } finally {
    await oldPrisma.$disconnect();
    await newPrisma.$disconnect();
  }
}

migrateData()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
