import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'

const prisma = new PrismaClient()

async function importData() {
  console.log('Importing data to main database...')
  
  const data = JSON.parse(fs.readFileSync('database-export.json', 'utf-8'))
  
  // Clear existing data first (in reverse order of dependencies)
  console.log('\nClearing existing data...')
  await prisma.analytics.deleteMany()
  await prisma.resource.deleteMany()
  await prisma.design.deleteMany()
  await prisma.article.deleteMany()
  await prisma.contact.deleteMany()
  await prisma.service.deleteMany()
  await prisma.project.deleteMany()
  await prisma.post.deleteMany()
  console.log('Existing data cleared.')
  
  // Import data
  console.log('\nImporting new data...')
  
  if (data.posts.length > 0) {
    await prisma.post.createMany({ data: data.posts })
    console.log(`  ✓ ${data.posts.length} posts imported`)
  }
  
  if (data.projects.length > 0) {
    await prisma.project.createMany({ data: data.projects })
    console.log(`  ✓ ${data.projects.length} projects imported`)
  }
  
  if (data.services.length > 0) {
    await prisma.service.createMany({ data: data.services })
    console.log(`  ✓ ${data.services.length} services imported`)
  }
  
  if (data.contacts.length > 0) {
    await prisma.contact.createMany({ data: data.contacts })
    console.log(`  ✓ ${data.contacts.length} contacts imported`)
  }
  
  if (data.articles.length > 0) {
    await prisma.article.createMany({ data: data.articles })
    console.log(`  ✓ ${data.articles.length} articles imported`)
  }
  
  if (data.designs.length > 0) {
    await prisma.design.createMany({ data: data.designs })
    console.log(`  ✓ ${data.designs.length} designs imported`)
  }
  
  if (data.resources.length > 0) {
    await prisma.resource.createMany({ data: data.resources })
    console.log(`  ✓ ${data.resources.length} resources imported`)
  }
  
  if (data.analytics.length > 0) {
    await prisma.analytics.createMany({ data: data.analytics })
    console.log(`  ✓ ${data.analytics.length} analytics imported`)
  }
  
  console.log('\n✅ Data import complete!')
  
  await prisma.$disconnect()
}

importData().catch(console.error)
