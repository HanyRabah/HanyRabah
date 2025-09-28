import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession()
    
    if (!session || session.user?.email !== 'hany.rabah@gmail.com') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch all designs
    const designs = await prisma.design.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        featured: true,
        coverImage: true,
        images: true,
        tags: true,
        category: true,
        tools: true,
        clientName: true,
        projectUrl: true,
        figmaUrl: true,
        behanceUrl: true,
        dribbbleUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json(designs)
  } catch (error) {
    console.error('Error fetching designs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch designs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession()
    
    if (!session || session.user?.email !== 'hany.rabah@gmail.com') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { 
      title, 
      slug, 
      description, 
      content,
      coverImage,
      images,
      tags, 
      category,
      tools,
      clientName,
      projectUrl,
      figmaUrl,
      behanceUrl,
      dribbbleUrl,
      featured 
    } = body

    // Create new design
    const design = await prisma.design.create({
      data: {
        title,
        slug,
        description,
        content,
        coverImage,
        images: images || [],
        tags: tags || [],
        category: category || 'WEB_DESIGN',
        tools: tools || [],
        clientName,
        projectUrl,
        figmaUrl,
        behanceUrl,
        dribbbleUrl,
        featured: featured || false,
      },
    })

    return NextResponse.json(design, { status: 201 })
  } catch (error) {
    console.error('Error creating design:', error)
    return NextResponse.json(
      { error: 'Failed to create design' },
      { status: 500 }
    )
  }
}
