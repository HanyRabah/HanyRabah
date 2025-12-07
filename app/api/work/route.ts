import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') // 'development', 'design', or null for all
  const featured = searchParams.get('featured') // 'true' to get only featured items

  try {
    const work: any[] = []

    // Fetch projects (development work) - only published
    if (!type || type === 'development') {
      const projects = await prisma.project.findMany({
        where: { 
          published: true,
          ...(featured === 'true' ? { featured: true } : {})
        },
        orderBy: { createdAt: 'desc' }
      })
      work.push(...projects.map(p => ({ 
        ...p, 
        workType: 'development',
        type: 'development' // For easier filtering
      })))
    }

    // Fetch designs - only published
    if (!type || type === 'design') {
      const designs = await prisma.design.findMany({
        where: { 
          published: true,
          ...(featured === 'true' ? { featured: true } : {})
        },
        orderBy: { createdAt: 'desc' }
      })
      work.push(...designs.map(d => ({ 
        ...d, 
        workType: 'design',
        type: 'design' // For easier filtering
      })))
    }

    // Sort all work by date (most recent first)
    work.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return dateB - dateA
    })

    return NextResponse.json(work)
  } catch (error) {
    console.error('Error fetching work:', error)
    return NextResponse.json(
      { error: 'Failed to fetch work items' }, 
      { status: 500 }
    )
  }
}
