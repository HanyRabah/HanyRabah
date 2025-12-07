import { PrismaClient } from '@prisma/client'

const SOURCE_DATABASE_URL = "postgres://neondb_owner:npg_rTSbchXEC92x@ep-winter-wildflower-a2hk396j-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require"
const TARGET_DATABASE_URL = process.env.DATABASE_URL!

const sourcePrisma = new PrismaClient({
  datasources: {
    db: {
      url: SOURCE_DATABASE_URL
    }
  }
})

const targetPrisma = new PrismaClient({
  datasources: {
    db: {
      url: TARGET_DATABASE_URL
    }
  }
})

async function migrateData() {
  console.log('🔄 Starting data migration...')

  try {
    // Fetch Services from source
    console.log('\n📦 Fetching services from source...')
    const services = await sourcePrisma.service.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' }
    })
    console.log(`Found ${services.length} active services`)

    // Fetch Blog Posts from source
    console.log('\n📝 Fetching blog posts from source...')
    const posts = await sourcePrisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' }
    })
    console.log(`Found ${posts.length} published posts`)

    // Fetch Projects from source
    console.log('\n🚀 Fetching projects from source...')
    const projects = await sourcePrisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    })
    console.log(`Found ${projects.length} projects`)

    // Clear target database
    console.log('\n🗑️  Clearing target database...')
    await targetPrisma.post.deleteMany()
    await targetPrisma.project.deleteMany()
    await targetPrisma.service.deleteMany()

    // Migrate Services
    console.log('\n📦 Migrating services...')
    for (const service of services) {
      await targetPrisma.service.create({
        data: {
          title: service.title,
          description: service.description,
          icon: service.icon,
          features: service.features,
          price: service.price,
          popular: service.popular,
          active: service.active
        }
      })
    }
    console.log(`✅ Migrated ${services.length} services`)

    // Migrate Blog Posts
    console.log('\n📝 Migrating blog posts...')
    for (const post of posts) {
      await targetPrisma.post.create({
        data: {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          published: post.published,
          featured: post.featured,
          coverImage: post.coverImage,
          tags: post.tags,
          publishedAt: post.publishedAt,
          seoTitle: post.seoTitle,
          seoDescription: post.seoDescription,
          seoKeywords: post.seoKeywords,
          seoImage: post.seoImage
        }
      })
    }
    console.log(`✅ Migrated ${posts.length} blog posts`)

    // Migrate Projects
    console.log('\n🚀 Migrating projects...')
    for (const project of projects) {
      await targetPrisma.project.create({
        data: {
          title: project.title,
          slug: project.slug,
          description: project.description,
          content: project.content,
          featured: project.featured,
          coverImage: project.coverImage,
          images: project.images,
          technologies: project.technologies,
          liveUrl: project.liveUrl,
          githubUrl: project.githubUrl,
          category: project.category,
          status: project.status,
          publishedAt: project.publishedAt,
          seoTitle: project.seoTitle,
          seoDescription: project.seoDescription,
          seoKeywords: project.seoKeywords,
          seoImage: project.seoImage
        }
      })
    }
    console.log(`✅ Migrated ${projects.length} projects`)

    console.log('\n✅ Data migration complete!')
    console.log(`\nSummary:`)
    console.log(`  📦 Services: ${services.length}`)
    console.log(`  📝 Blog Posts: ${posts.length}`)
    console.log(`  🚀 Projects: ${projects.length}`)

  } catch (error) {
    console.error('❌ Error during migration:', error)
    throw error
  } finally {
    await sourcePrisma.$disconnect()
    await targetPrisma.$disconnect()
  }
}

migrateData()
