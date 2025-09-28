'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Plus, 
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'
import ArticlesList from '@/components/admin/ArticlesList'

export default function ArticlesManagement() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session || session.user?.email !== 'hany.rabah@gmail.com') {
      router.push('/admin/login')
      return
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-theme-primary/30 border-t-theme-primary rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading articles...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/admin/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Technical Articles</h1>
              <p className="text-muted-foreground">Manage your technical articles and tutorials</p>
            </div>
          </div>
          <Link href="/admin/articles/new">
            <Button className="bg-theme-primary hover:bg-theme-secondary text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Article
            </Button>
          </Link>
        </div>

        {/* Articles List */}
        <ArticlesList />
      </div>
    </div>
  )
}
