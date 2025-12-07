import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function migrateThumbnailToCoverImage() {
  console.log('Starting migration: thumbnail → coverImage')
  
  try {
    // Get all projects
    const projects = await prisma.project.findMany()
    
    console.log(`Found ${projects.length} projects`)
    
    let migratedCount = 0
    
    for (const project of projects) {
      // Check if project has no coverImage but might have had a thumbnail
      if (!project.coverImage) {
        console.log(`Project "${project.title}" has no coverImage`)
        
        // Note: Since the schema already changed, we can't access the old 'thumbnail' field
        // This script is just for documentation. Users need to re-upload images manually.
      } else {
        console.log(`Project "${project.title}" already has coverImage: ${project.coverImage}`)
      }
    }
    
    console.log(`\nMigration complete!`)
    console.log(`Projects with coverImage: ${projects.filter(p => p.coverImage).length}`)
    console.log(`Projects without coverImage: ${projects.filter(p => !p.coverImage).length}`)
    console.log(`\nNote: Projects without coverImage need to have images uploaded via the admin panel.`)
    
  } catch (error) {
    console.error('Migration failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

migrateThumbnailToCoverImage()
  .then(() => {
    console.log('Script finished successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Script failed:', error)
    process.exit(1)
  })
