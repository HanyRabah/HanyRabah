'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  PenTool,
  BookOpen
} from 'lucide-react'
import Link from 'next/link'

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string | null
  published: boolean
  featured: boolean
  createdAt: string
  updatedAt: string
  tags: string[]
  category: string | null
  difficulty: string
  readTime: number | null
  coverImage: string | null
}

interface ArticlesListProps {
  limit?: number
  showHeader?: boolean
  showCreateButton?: boolean
}

export default function ArticlesList({ limit, showHeader = true, showCreateButton = true }: ArticlesListProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteArticle, setDeleteArticle] = useState<Article | null>(null)

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/admin/articles')
      if (response.ok) {
        const data = await response.json()
        setArticles(limit ? data.slice(0, limit) : data)
      }
    } catch (error) {
      console.error('Failed to fetch articles:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (article: Article) => {
    try {
      const response = await fetch(`/api/admin/articles/${article.id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        setArticles(articles.filter(a => a.id !== article.id))
        setDeleteArticle(null)
      }
    } catch (error) {
      console.error('Failed to delete article:', error)
    }
  }

  const togglePublished = async (article: Article) => {
    try {
      const response = await fetch(`/api/admin/articles/${article.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          published: !article.published,
        }),
      })
      
      if (response.ok) {
        setArticles(articles.map(a => 
          a.id === article.id 
            ? { ...a, published: !a.published }
            : a
        ))
      }
    } catch (error) {
      console.error('Failed to update article:', error)
    }
  }

  const toggleFeatured = async (article: Article) => {
    try {
      const response = await fetch(`/api/admin/articles/${article.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          featured: !article.featured,
        }),
      })
      
      if (response.ok) {
        setArticles(articles.map(a => 
          a.id === article.id 
            ? { ...a, featured: !a.featured }
            : a
        ))
      }
    } catch (error) {
      console.error('Failed to update article:', error)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-theme-primary/30 border-t-theme-primary rounded-full animate-spin" />
            <span className="ml-2 text-muted-foreground">Loading articles...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className="border border-gray-200 bg-white shadow-sm">
        {showHeader && (
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center text-gray-900">
                  <BookOpen className="w-5 h-5 mr-2 text-gray-700" />
                  Articles ({articles.length})
                </CardTitle>
                <CardDescription className="text-gray-700">
                  {limit ? `Showing ${Math.min(limit, articles.length)} most recent articles` : 'Manage your technical articles and tutorials'}
                </CardDescription>
              </div>
              {showCreateButton && (
                <Link href="/admin/articles/new">
                  <Button size="sm" className="bg-theme-primary hover:bg-theme-secondary text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    New Article
                  </Button>
                </Link>
              )}
            </div>
          </CardHeader>
        )}
        <CardContent>
          {articles.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No articles yet</h3>
              <p className="text-muted-foreground mb-4">
                Create technical articles and tutorials to share your knowledge
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Tip: Tag your posts with 'article', 'tutorial', 'guide', or 'technical' to show them here
              </p>
              {showCreateButton && (
                <Link href="/admin/posts/new">
                  <Button className="bg-theme-primary hover:bg-theme-secondary text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Article
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {limit && articles.length > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Recent articles
                  </span>
                  <Link href="/admin/posts?filter=articles">
                    <Button variant="outline" size="sm">
                      View All Articles ({articles.length})
                    </Button>
                  </Link>
                </div>
              )}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {articles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{article.title}</div>
                          {article.excerpt && (
                            <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {article.excerpt}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={article.published ? "default" : "secondary"}
                          className={article.published ? "bg-green-100 text-green-800" : ""}
                        >
                          {article.published ? 'Published' : 'Draft'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {article.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {article.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{article.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(article.createdAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Link href={`/admin/articles/${article.id}/edit`}>
                            <Button variant="outline" size="sm" className="border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white transition-colors">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                          </Link>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setDeleteArticle(article)}
                            className="border-red-500 text-red-600 hover:bg-red-500 hover:text-white transition-colors"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/blog/${article.slug}`} target="_blank">
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Article
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => togglePublished(article)}>
                                {article.published ? 'Unpublish' : 'Publish'}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toggleFeatured(article)}>
                                {article.featured ? 'Remove from Featured' : 'Mark as Featured'}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteArticle} onOpenChange={() => setDeleteArticle(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Article</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteArticle?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteArticle && handleDelete(deleteArticle)}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
