import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function setPublished() {
  console.log('Setting all existing projects and designs to published...')
  
  const projectsResult = await prisma.project.updateMany({
    data: { published: true }
  })
  console.log(`Updated ${projectsResult.count} projects to published=true`)
  
  const designsResult = await prisma.design.updateMany({
    data: { published: true }
  })
  console.log(`Updated ${designsResult.count} designs to published=true`)
  
  await prisma.$disconnect()
  console.log('Done!')
}

setPublished().catch(console.error)
