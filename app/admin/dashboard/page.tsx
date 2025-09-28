'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  FolderOpen, 
  Palette, 
  PenTool, 
  LogOut, 
  User, 
  Plus,
  BarChart3,
  Settings
} from 'lucide-react'
import Link from 'next/link'
import PostsList from '@/components/admin/PostsList'
import ProjectsList from '@/components/admin/ProjectsList'
import ArticlesList from '@/components/admin/ArticlesList'
import DesignsList from '@/components/admin/DesignsList'

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    posts: 0,
    projects: 0,
    designs: 0,
    articles: 0
  })

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session || session.user?.email !== 'hany.rabah@gmail.com') {
      router.push('/admin/login')
      return
    }

    // Fetch stats
    fetchStats()
  }, [session, status, router])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/admin/login' })
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-theme-primary/30 border-t-theme-primary rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-border bg-theme-secondary">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-theme-primary/10 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-theme-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-foreground">Portfolio Content Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-foreground" />
                <span className="text-sm text-foreground">{session.user?.email}</span>
              </div>
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="text-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Blog Posts</CardTitle>
              <FileText className="h-4 w-4 text-gray-700" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.posts}</div>
              <p className="text-xs text-gray-700">Published articles</p>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Projects</CardTitle>
              <FolderOpen className="h-4 w-4 text-gray-700" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.projects}</div>
              <p className="text-xs text-gray-700">Portfolio projects</p>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Designs</CardTitle>
              <Palette className="h-4 w-4 text-gray-700" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.designs}</div>
              <p className="text-xs text-gray-700">Design works</p>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Articles</CardTitle>
              <PenTool className="h-4 w-4 text-gray-700" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.articles}</div>
              <p className="text-xs text-gray-700">Technical articles</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-theme-primary text-white">
            <TabsTrigger className="text-white hover:text-foreground" value="posts">Blog Posts</TabsTrigger>
            <TabsTrigger className="text-white hover:text-foreground" value="projects">Projects</TabsTrigger>
            <TabsTrigger className="text-white hover:text-foreground" value="designs">Designs</TabsTrigger>
            <TabsTrigger className="text-white hover:text-foreground" value="articles">Articles</TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
                <p className="text-gray-700">Manage your blog content</p>
              </div>
              <div className="flex items-center space-x-2">
                <Link href="/admin/posts">
                  <Button variant="outline">
                    View All Posts
                  </Button>
                </Link>
                <Link href="/admin/posts/new">
                  <Button className="bg-theme-primary hover:bg-theme-secondary text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    New Post
                  </Button>
                </Link>
              </div>
            </div>
            <PostsList limit={5} showHeader={false} showCreateButton={false} />
          </TabsContent>
          
          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Projects</h2>
                <p className="text-muted-foreground">Manage your portfolio projects</p>
              </div>
              <div className="flex items-center space-x-2">
                <Link href="/admin/projects">
                  <Button variant="outline">
                    View All Projects
                  </Button>
                </Link>
                <Link href="/admin/projects/new">
                  <Button className="bg-theme-primary hover:bg-theme-secondary text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    New Project
                  </Button>
                </Link>
              </div>
            </div>
            <ProjectsList limit={5} showHeader={false} showCreateButton={false} />
          </TabsContent>
          
          <TabsContent value="designs" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Designs</h2>
                <p className="text-muted-foreground">Manage your design portfolio</p>
              </div>
              <div className="flex items-center space-x-2">
                <Link href="/admin/designs">
                  <Button variant="outline">
                    View All Designs
                  </Button>
                </Link>
                <Link href="/admin/designs/new">
                  <Button className="bg-theme-primary hover:bg-theme-secondary text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    New Design
                  </Button>
                </Link>
              </div>
            </div>
            <DesignsList limit={5} showHeader={false} showCreateButton={false} />
          </TabsContent>
          
          <TabsContent value="articles" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Technical Articles</h2>
                <p className="text-muted-foreground">Manage technical articles and tutorials</p>
              </div>
              <div className="flex items-center space-x-2">
                <Link href="/admin/articles">
                  <Button variant="outline">
                    View All Articles
                  </Button>
                </Link>
                <Link href="/admin/articles/new">
                  <Button className="bg-theme-primary hover:bg-theme-secondary text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    New Article
                  </Button>
                </Link>
              </div>
            </div>
            <ArticlesList limit={5} showHeader={false} showCreateButton={false} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
