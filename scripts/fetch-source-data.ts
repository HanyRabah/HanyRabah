import { PrismaClient } from '@prisma/client'

const SOURCE_DATABASE_URL = "postgres://neondb_owner:npg_rTSbchXEC92x@ep-winter-wildflower-a2hk396j-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require"

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: SOURCE_DATABASE_URL
    }
  }
})

async function fetchData() {
  console.log('🔍 Fetching data from source database...')

  try {
    // Fetch Services
    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'desc' }
    })
    console.log(`\n📦 Found ${services.length} services`)
    console.log(JSON.stringify(services, null, 2))

    // Fetch Blog Posts
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' }
    })
    console.log(`\n📝 Found ${posts.length} blog posts`)
    console.log(JSON.stringify(posts, null, 2))

    // Fetch Projects
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    })
    console.log(`\n🚀 Found ${projects.length} projects`)
    console.log(JSON.stringify(projects, null, 2))

    // Fetch Designs
    const designs = await prisma.design.findMany({
      orderBy: { createdAt: 'desc' }
    })
    console.log(`\n🎨 Found ${designs.length} designs`)
    console.log(JSON.stringify(designs, null, 2))

    console.log('\n✅ Data fetch complete!')
  } catch (error) {
    console.error('❌ Error fetching data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

fetchData()
