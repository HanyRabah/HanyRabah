import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'

const prisma = new PrismaClient()

async function exportData() {
  console.log('Exporting data from feature database...')
  
  const data = {
    posts: await prisma.post.findMany(),
    projects: await prisma.project.findMany(),
    services: await prisma.service.findMany(),
    contacts: await prisma.contact.findMany(),
    articles: await prisma.article.findMany(),
    designs: await prisma.design.findMany(),
    resources: await prisma.resource.findMany(),
    analytics: await prisma.analytics.findMany(),
  }
  
  console.log(`Exported:`)
  console.log(`  - ${data.posts.length} posts`)
  console.log(`  - ${data.projects.length} projects`)
  console.log(`  - ${data.services.length} services`)
  console.log(`  - ${data.contacts.length} contacts`)
  console.log(`  - ${data.articles.length} articles`)
  console.log(`  - ${data.designs.length} designs`)
  console.log(`  - ${data.resources.length} resources`)
  console.log(`  - ${data.analytics.length} analytics`)
  
  fs.writeFileSync('database-export.json', JSON.stringify(data, null, 2))
  console.log('\nData exported to database-export.json')
  
  await prisma.$disconnect()
}

exportData().catch(console.error)
