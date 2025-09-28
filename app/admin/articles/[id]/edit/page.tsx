'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ArrowLeft,
  Save,
  Eye,
  Loader2
} from 'lucide-react'
import Link from 'next/link'

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  published: boolean
  featured: boolean
  tags: string[]
  category: string | null
  difficulty: string
  readTime: number | null
  coverImage: string | null
  createdAt: string
  updatedAt: string
}

export default function EditArticle() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    published: false,
    featured: false,
    tags: '',
    category: '',
    difficulty: 'BEGINNER',
    readTime: '',
    coverImage: ''
  })

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session || session.user?.email !== 'hany.rabah@gmail.com') {
      router.push('/admin/login')
      return
    }

    fetchArticle()
  }, [session, status, router, params.id])

  const fetchArticle = async () => {
    try {
      const response = await fetch(`/api/admin/articles/${params.id}`)
      if (response.ok) {
        const articleData = await response.json()
        setArticle(articleData)
        setFormData({
          title: articleData.title,
          slug: articleData.slug,
          excerpt: articleData.excerpt || '',
          content: articleData.content,
          published: articleData.published,
          featured: articleData.featured,
          tags: articleData.tags.join(', '),
          category: articleData.category || '',
          difficulty: articleData.difficulty,
          readTime: articleData.readTime?.toString() || '',
          coverImage: articleData.coverImage || ''
        })
      } else {
        router.push('/admin/articles')
      }
    } catch (error) {
      console.error('Failed to fetch article:', error)
      router.push('/admin/articles')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch(`/api/admin/articles/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          slug: formData.slug,
          excerpt: formData.excerpt || null,
          content: formData.content,
          published: formData.published,
          featured: formData.featured,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
          category: formData.category || null,
          difficulty: formData.difficulty,
          readTime: formData.readTime ? parseInt(formData.readTime) : null,
          coverImage: formData.coverImage || null,
        }),
      })

      if (response.ok) {
        router.push('/admin/articles')
      } else {
        alert('Failed to save article')
      }
    } catch (error) {
      console.error('Failed to save article:', error)
      alert('Failed to save article')
    } finally {
      setSaving(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin mx-auto" />
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-gray-600">Article not found</p>
          <Link href="/admin/articles">
            <Button variant="outline">Back to Articles</Button>
          </Link>
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
            <Link href="/admin/articles">
              <Button variant="outline" size="sm" className="border-gray-300">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Articles
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Article</h1>
              <p className="text-gray-600">Modify your technical article</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link href={`/blog/${article.slug}`} target="_blank">
              <Button variant="outline" size="sm" className="border-gray-300">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </Link>
            <Button 
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-gray-50 border-b border-gray-200">
                <CardTitle className="text-gray-900">Article Content</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label htmlFor="title" className="text-gray-700">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="mt-1 border-gray-300"
                  />
                </div>
                
                <div>
                  <Label htmlFor="slug" className="text-gray-700">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="mt-1 border-gray-300"
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt" className="text-gray-700">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={3}
                    className="mt-1 border-gray-300"
                  />
                </div>

                <div>
                  <Label htmlFor="content" className="text-gray-700">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={15}
                    className="mt-1 border-gray-300"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-gray-50 border-b border-gray-200">
                <CardTitle className="text-gray-900">Article Settings</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="published" className="text-gray-700">Published</Label>
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="featured" className="text-gray-700">Featured</Label>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                </div>

                <div>
                  <Label htmlFor="difficulty" className="text-gray-700">Difficulty</Label>
                  <Select value={formData.difficulty} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
                    <SelectTrigger className="mt-1 border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BEGINNER">Beginner</SelectItem>
                      <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                      <SelectItem value="ADVANCED">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="readTime" className="text-gray-700">Read Time (minutes)</Label>
                  <Input
                    id="readTime"
                    type="number"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="5"
                    className="mt-1 border-gray-300"
                  />
                </div>

                <div>
                  <Label htmlFor="category" className="text-gray-700">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Web Development"
                    className="mt-1 border-gray-300"
                  />
                </div>

                <div>
                  <Label htmlFor="tags" className="text-gray-700">Tags</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="react, typescript, tutorial"
                    className="mt-1 border-gray-300"
                  />
                  <p className="text-sm text-gray-500 mt-1">Separate tags with commas</p>
                </div>

                <div>
                  <Label htmlFor="coverImage" className="text-gray-700">Cover Image URL</Label>
                  <Input
                    id="coverImage"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="mt-1 border-gray-300"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-gray-50 border-b border-gray-200">
                <CardTitle className="text-gray-900">Article Info</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Status:</span>
                  <Badge variant={article.published ? "default" : "secondary"}>
                    {article.published ? 'Published' : 'Draft'}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Difficulty:</span>
                  <Badge variant="outline">{article.difficulty}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Read Time:</span>
                  <span className="text-gray-900">{article.readTime || 'Not set'} min</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Created:</span>
                  <span className="text-gray-900">{new Date(article.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Updated:</span>
                  <span className="text-gray-900">{new Date(article.updatedAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
