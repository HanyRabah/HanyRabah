import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail, sendAutoReply } from '@/lib/email'

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

async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY
    
    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY is not set')
      return false
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    })

    const data = await response.json()
    return data.success === true
  } catch (error) {
    console.error('reCAPTCHA verification error:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message, recaptchaToken } = body

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Verify reCAPTCHA if configured
    if (process.env.RECAPTCHA_SECRET_KEY) {
      if (!recaptchaToken) {
        return NextResponse.json(
          { error: 'reCAPTCHA verification required' },
          { status: 400 }
        )
      }

      const isValidRecaptcha = await verifyRecaptcha(recaptchaToken)
      
      if (!isValidRecaptcha) {
        return NextResponse.json(
          { error: 'reCAPTCHA verification failed. Please try again.' },
          { status: 400 }
        )
      }
    }

    // Save to database
    const prismaClient = await getPrisma()
    const contact = await prismaClient.contact.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    })

    // Send email notification to contact@hanyrabah.com
    const emailResult = await sendContactEmail({ name, email, subject, message })
    
    // Send auto-reply to the user
    const autoReplyResult = await sendAutoReply({ name, email, subject, message })

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

    return NextResponse.json(contacts)
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 })
  }
}
