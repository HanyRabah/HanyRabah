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

    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('start')
    const endDate = searchParams.get('end')

    // Build date filter
    const dateFilter: any = {}
    if (startDate && endDate) {
      dateFilter.date = {
        gte: new Date(startDate),
        lte: new Date(endDate + 'T23:59:59.999Z'),
      }
    }

    // Fetch analytics data
    const [totalViews, uniquePages, topPages, dailyViews] = await Promise.all([
      // Total views in date range
      prisma.analytics.aggregate({
        where: dateFilter,
        _sum: {
          visits: true,
        },
      }),
      
      // Unique pages count
      prisma.analytics.groupBy({
        by: ['page'],
        where: dateFilter,
        _count: {
          page: true,
        },
      }),
      
      // Top pages by visits
      prisma.analytics.groupBy({
        by: ['page'],
        where: dateFilter,
        _sum: {
          visits: true,
        },
        orderBy: {
          _sum: {
            visits: 'desc',
          },
        },
        take: 10,
      }),
      
      // Daily views
      prisma.analytics.groupBy({
        by: ['date'],
        where: dateFilter,
        _sum: {
          visits: true,
        },
        orderBy: {
          date: 'desc',
        },
        take: 30,
      }),
    ])

    // Format the data
    const analytics = {
      totalViews: totalViews._sum.visits || 0,
      uniquePages: uniquePages.length,
      topPages: topPages.map(page => ({
        page: page.page,
        visits: page._sum.visits || 0,
      })),
      dailyViews: dailyViews.map(day => ({
        date: day.date.toISOString().split('T')[0],
        visits: day._sum.visits || 0,
      })),
    }

    return NextResponse.json(analytics)
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
