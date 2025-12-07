import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkServices() {
  console.log('📦 Checking services in current database...\n')

  const services = await prisma.service.findMany({
    orderBy: { createdAt: 'desc' }
  })

  console.log(`Found ${services.length} services:\n`)

  services.forEach((service, index) => {
    console.log(`${index + 1}. ${service.title}`)
    console.log(`   Price: $${service.price}`)
    console.log(`   Popular: ${service.popular ? 'Yes' : 'No'}`)
    console.log(`   Active: ${service.active ? 'Yes' : 'No'}`)
    console.log(`   Features: ${service.features.join(', ')}`)
    console.log('')
  })

  await prisma.$disconnect()
}

checkServices()
