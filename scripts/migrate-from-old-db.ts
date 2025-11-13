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
  console.log('🔄 Starting data migration from old database...\n');

  try {
    // ============================================
    // Migrate Posts (Blog)
    // ============================================
    console.log('📝 Migrating blog posts...');
    const oldPosts = await oldPrisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    let postsCreated = 0;
    for (const post of oldPosts) {
      try {
        // Check if post already exists by slug
        const existingPost = await newPrisma.post.findUnique({
          where: { slug: post.slug },
        });

        if (!existingPost) {
          await newPrisma.post.create({
            data: {
              title: post.title,
              slug: post.slug,
              content: post.content,
              excerpt: post.excerpt,
              coverImage: post.coverImage,
              author: post.author,
              published: post.published,
              featured: post.featured,
              tags: post.tags,
              readTime: post.readTime,
              views: post.views,
              likes: post.likes,
              createdAt: post.createdAt,
              updatedAt: post.updatedAt,
            },
          });
          postsCreated++;
          console.log(`  ✓ Migrated post: ${post.title}`);
        } else {
          console.log(`  ⊘ Skipped existing post: ${post.title}`);
        }
      } catch (error) {
        console.error(`  ✗ Failed to migrate post ${post.title}:`, error);
      }
    }
    console.log(`✅ Posts: ${postsCreated} created, ${oldPosts.length - postsCreated} skipped\n`);

    // ============================================
    // Migrate Projects
    // ============================================
    console.log('💼 Migrating projects...');
    const oldProjects = await oldPrisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    let projectsCreated = 0;
    for (const project of oldProjects) {
      try {
        // Check if project already exists by slug
        const existingProject = await newPrisma.project.findUnique({
          where: { slug: project.slug },
        });

        if (!existingProject) {
          await newPrisma.project.create({
            data: {
              title: project.title,
              slug: project.slug,
              description: project.description,
              longDescription: project.longDescription,
              image: project.image,
              technologies: project.technologies,
              githubUrl: project.githubUrl,
              liveUrl: project.liveUrl,
              featured: project.featured,
              displayOrder: project.displayOrder,
              category: project.category,
              status: project.status,
              startDate: project.startDate,
              endDate: project.endDate,
              teamSize: project.teamSize,
              role: project.role,
              challenges: project.challenges,
              solutions: project.solutions,
              results: project.results,
              testimonial: project.testimonial,
              testimonialAuthor: project.testimonialAuthor,
              testimonialRole: project.testimonialRole,
              gallery: project.gallery,
              metrics: project.metrics,
              createdAt: project.createdAt,
              updatedAt: project.updatedAt,
            },
          });
          projectsCreated++;
          console.log(`  ✓ Migrated project: ${project.title}`);
        } else {
          console.log(`  ⊘ Skipped existing project: ${project.title}`);
        }
      } catch (error) {
        console.error(`  ✗ Failed to migrate project ${project.title}:`, error);
      }
    }
    console.log(`✅ Projects: ${projectsCreated} created, ${oldProjects.length - projectsCreated} skipped\n`);

    // ============================================
    // Migrate Services
    // ============================================
    console.log('🛠️  Migrating services...');
    const oldServices = await oldPrisma.service.findMany({
      orderBy: { displayOrder: 'asc' },
    });
    
    let servicesCreated = 0;
    for (const service of oldServices) {
      try {
        // Check if service already exists by slug
        const existingService = await newPrisma.service.findUnique({
          where: { slug: service.slug },
        });

        if (!existingService) {
          await newPrisma.service.create({
            data: {
              title: service.title,
              slug: service.slug,
              description: service.description,
              icon: service.icon,
              features: service.features,
              displayOrder: service.displayOrder,
              published: service.published,
              createdAt: service.createdAt,
              updatedAt: service.updatedAt,
            },
          });
          servicesCreated++;
          console.log(`  ✓ Migrated service: ${service.title}`);
        } else {
          console.log(`  ⊘ Skipped existing service: ${service.title}`);
        }
      } catch (error) {
        console.error(`  ✗ Failed to migrate service ${service.title}:`, error);
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
        // Check if contact already exists by email and createdAt
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
      } catch (error) {
        console.error(`  ✗ Failed to migrate contact ${contact.email}:`, error);
      }
    }
    console.log(`✅ Contacts: ${contactsCreated} created, ${oldContacts.length - contactsCreated} skipped\n`);

    // ============================================
    // Migrate Designs
    // ============================================
    console.log('🎨 Migrating designs...');
    const oldDesigns = await oldPrisma.design.findMany({
      orderBy: { displayOrder: 'asc' },
    });
    
    let designsCreated = 0;
    for (const design of oldDesigns) {
      try {
        // Check if design already exists by slug
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
              thumbnail: design.thumbnail,
              images: design.images,
              figmaUrl: design.figmaUrl,
              liveUrl: design.liveUrl,
              tags: design.tags,
              featured: design.featured,
              displayOrder: design.displayOrder,
              published: design.published,
              createdAt: design.createdAt,
              updatedAt: design.updatedAt,
            },
          });
          designsCreated++;
          console.log(`  ✓ Migrated design: ${design.title}`);
        } else {
          console.log(`  ⊘ Skipped existing design: ${design.title}`);
        }
      } catch (error) {
        console.error(`  ✗ Failed to migrate design ${design.title}:`, error);
      }
    }
    console.log(`✅ Designs: ${designsCreated} created, ${oldDesigns.length - designsCreated} skipped\n`);

    // ============================================
    // Migrate Old Resources (skip duplicates)
    // ============================================
    console.log('📚 Migrating old resources (preserving new ones)...');
    const oldResources = await oldPrisma.resource.findMany({
      orderBy: { displayOrder: 'asc' },
    });
    
    let resourcesCreated = 0;
    let resourcesSkipped = 0;
    for (const resource of oldResources) {
      try {
        // Check if resource already exists by title and type
        const existingResource = await newPrisma.resource.findFirst({
          where: {
            title: resource.title,
            type: resource.type,
          },
        });

        if (!existingResource) {
          await newPrisma.resource.create({
            data: {
              title: resource.title,
              description: resource.description,
              type: resource.type,
              url: resource.url,
              category: resource.category,
              image: resource.image,
              isAffiliate: resource.isAffiliate,
              tags: resource.tags,
              published: resource.published,
              displayOrder: resource.displayOrder,
              clickCount: resource.clickCount,
              gumroadUrl: resource.gumroadUrl,
              price: resource.price,
              createdAt: resource.createdAt,
              updatedAt: resource.updatedAt,
            },
          });
          resourcesCreated++;
          console.log(`  ✓ Migrated resource: ${resource.title}`);
        } else {
          resourcesSkipped++;
          console.log(`  ⊘ Skipped existing resource: ${resource.title}`);
        }
      } catch (error) {
        console.error(`  ✗ Failed to migrate resource ${resource.title}:`, error);
      }
    }
    console.log(`✅ Resources: ${resourcesCreated} created, ${resourcesSkipped} skipped\n`);

    // ============================================
    // Summary
    // ============================================
    console.log('\n' + '='.repeat(60));
    console.log('📊 MIGRATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`📝 Blog Posts:    ${postsCreated} migrated`);
    console.log(`💼 Projects:      ${projectsCreated} migrated`);
    console.log(`🛠️  Services:      ${servicesCreated} migrated`);
    console.log(`📧 Contacts:      ${contactsCreated} migrated`);
    console.log(`🎨 Designs:       ${designsCreated} migrated`);
    console.log(`📚 Resources:     ${resourcesCreated} migrated (${resourcesSkipped} preserved)`);
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
