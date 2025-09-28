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

    // Fetch all articles
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        published: true,
        featured: true,
        coverImage: true,
        tags: true,
        category: true,
        difficulty: true,
        readTime: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json(articles)
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
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
      content, 
      excerpt, 
      tags, 
      category,
      difficulty,
      readTime,
      coverImage, 
      published,
      featured 
    } = body

    // Create new article
    const article = await prisma.article.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        tags: tags || [],
        category,
        difficulty: difficulty || 'BEGINNER',
        readTime,
        coverImage,
        published: published || false,
        featured: featured || false,
      },
    })

    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    )
  }
}
