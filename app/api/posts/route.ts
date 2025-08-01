import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published') === 'true'
    const featured = searchParams.get('featured') === 'true'
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined

    const posts = await prisma.post.findMany({
      where: {
        ...(published && { published: true }),
        ...(featured && { featured: true }),
      },
      orderBy: {
        createdAt: 'desc',
      },
      ...(limit && { take: limit }),
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, excerpt, published, featured, coverImage, tags } = body

    const post = await prisma.post.create({
      data: {
        title,
        slug: title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-'),
        content,
        excerpt,
        published: published || false,
        featured: featured || false,
        coverImage,
        tags: tags || [],
        publishedAt: published ? new Date() : null,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}
