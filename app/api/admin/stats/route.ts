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

    // Fetch stats from database
    const [posts, projects, articles, designs, contacts, totalViews] = await Promise.all([
      prisma.post.count(),
      prisma.project.count(),
      prisma.article.count(),
      prisma.design.count(),
      prisma.contact.count(),
      prisma.analytics.aggregate({
        _sum: {
          visits: true,
        },
      }),
    ])

    const stats = {
      posts,
      projects,
      articles,
      designs,
      contacts,
      views: totalViews._sum.visits || 0,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
