import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('📚 Checking BOOKS in database...\n')

  const books = await prisma.resource.findMany({
    where: { type: 'BOOKS' },
    orderBy: { createdAt: 'desc' }
  })

  console.log(`Found ${books.length} books:\n`)
  
  books.forEach((book, index) => {
    console.log(`${index + 1}. ${book.title}`)
    console.log(`   Author: ${book.author || 'N/A'}`)
    console.log(`   Rating: ${book.rating || 'N/A'}`)
    console.log(`   Read URL: ${book.url ? '✓' : '✗'}`)
    console.log(`   Audio URL: ${book.audioUrl ? '✓' : '✗'}`)
    console.log(`   Category: ${book.category || 'N/A'}`)
    console.log('')
  })

  await prisma.$disconnect()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
