import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()

    if (!session || !isAdmin(session.user?.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const published = searchParams.get('published')

    const resources = await prisma.resource.findMany({
      where: {
        ...(type ? { type: type as any } : {}),
        ...(published !== null
          ? { published: published === 'true' }
          : {}),
      },
      orderBy: [{ type: 'asc' }, { displayOrder: 'asc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        title: true,
        description: true,
        type: true,
        url: true,
        category: true,
        image: true,
        isAffiliate: true,
        displayOrder: true,
        published: true,
        clickCount: true,
        tags: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json(resources)
  } catch (error) {
    console.error('Error fetching resources:', error)
    return NextResponse.json(
      { error: 'Failed to fetch resources' },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()

    if (!session || !isAdmin(session.user?.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      title,
      description,
      type,
      url,
      category,
      image,
      isAffiliate,
      displayOrder,
      published,
      tags,
    } = body

    const resource = await prisma.resource.create({
      data: {
        title,
        description,
        type,
        url,
        category,
        image,
        isAffiliate: Boolean(isAffiliate),
        displayOrder: displayOrder ?? 0,
        published: published ?? true,
        tags: tags ?? [],
      },
    })

    return NextResponse.json(resource, { status: 201 })
  } catch (error) {
    console.error('Error creating resource:', error)
    return NextResponse.json(
      { error: 'Failed to create resource' },
      { status: 500 },
    )
  }
}
