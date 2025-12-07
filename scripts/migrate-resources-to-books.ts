import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('📚 Migrating READING_LIST and AUDIOBOOK to BOOKS type...\n')

  // Update all READING_LIST to BOOKS
  const readingListUpdated = await prisma.resource.updateMany({
    where: { type: 'READING_LIST' },
    data: { 
      type: 'BOOKS',
      rating: 4.5 // Default rating
    }
  })

  // Update all AUDIOBOOK to BOOKS and set audioUrl
  const audiobooks = await prisma.resource.findMany({
    where: { type: 'AUDIOBOOK' }
  })

  for (const book of audiobooks) {
    await prisma.resource.update({
      where: { id: book.id },
      data: {
        type: 'BOOKS',
        audioUrl: book.url, // Move URL to audioUrl
        rating: 4.5 // Default rating
      }
    })
  }

  console.log(`✅ Updated ${readingListUpdated.count} reading list items to BOOKS`)
  console.log(`✅ Updated ${audiobooks.length} audiobooks to BOOKS`)
  console.log('\n✨ Migration complete!')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
