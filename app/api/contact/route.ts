import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail, sendAutoReply } from '@/lib/email'
import { checkBotId } from 'botid/server'

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
    // Verify bot protection
    const verification = await checkBotId()
    if (verification.isBot) {
      return NextResponse.json(
        { error: 'Bot detected. Access denied.' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { name, email, subject, message, reason } = body

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Create subject from reason if not provided
    const emailSubject = subject || (reason ? `Contact: ${reason.replace(/_/g, ' ')}` : 'New Contact Form Submission')

    // Save to database
    const prismaClient = await getPrisma()
    const contact = await prismaClient.contact.create({
      data: {
        name,
        email,
        subject: emailSubject,
        message,
        reason: reason || null, // Save as enum value
      },
    })

    // Send email notification to contact@hanyrabah.com
    const emailResult = await sendContactEmail({ 
      name, 
      email, 
      subject: emailSubject, 
      message: reason ? `Contact Reason: ${reason}\n\n${message}` : message 
    })
    
    // Send auto-reply to the user
    const autoReplyResult = await sendAutoReply({ 
      name, 
      email, 
      subject: emailSubject, 
      message 
    })

    // Log email results (optional)
    if (!emailResult.success) {
      console.warn('Failed to send notification email:', emailResult.error)
    }
    
    if (!autoReplyResult.success) {
      console.warn('Failed to send auto-reply email:', autoReplyResult.error)
    }

    return NextResponse.json(
      { 
        message: 'Contact form submitted successfully', 
        id: contact.id,
        emailSent: emailResult.success,
        autoReplySent: autoReplyResult.success
      },
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

    return NextResponse.json(contacts, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    })
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 })
  }
}
