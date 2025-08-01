import { NextRequest, NextResponse } from 'next/server'

// Lazy import prisma to avoid connection during build
let prisma: any = null

async function getPrisma() {
  if (!prisma) {
    try {
      const { prisma: prismaClient } = await import('@/lib/prisma')
      prisma = prismaClient
    } catch (error) {
      console.error('Failed to initialize Prisma:', error)
      throw new Error('Database connection failed')
    }
  }
  return prisma
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    const prismaClient = await getPrisma()
    const contact = await prismaClient.contact.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    })

    return NextResponse.json(
      { message: 'Contact form submitted successfully', id: contact.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const prismaClient = await getPrisma()
    const contacts = await prismaClient.contact.findMany({
      where: {
        ...(status && { status: status as any }),
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(contacts)
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 })
  }
}
