import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured') === 'true'
    const category = searchParams.get('category')
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined

    const projects = await prisma.project.findMany({
      where: {
        ...(featured && { featured: true }),
        ...(category && { category }),
      },
      orderBy: {
        createdAt: 'desc',
      },
      ...(limit && { take: limit }),
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      title, 
      description, 
      content, 
      featured, 
      coverImage, 
      images, 
      technologies, 
      liveUrl, 
      githubUrl, 
      category,
      status 
    } = body

    const project = await prisma.project.create({
      data: {
        title,
        slug: title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-'),
        description,
        content,
        featured: featured || false,
        coverImage,
        images: images || [],
        technologies: technologies || [],
        liveUrl,
        githubUrl,
        category,
        status: status || 'COMPLETED',
      },
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
