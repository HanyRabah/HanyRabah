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
import { 
  ArrowLeft,
  Save,
  Eye,
  Loader2
} from 'lucide-react'
import Link from 'next/link'

interface Project {
  id: string
  title: string
  slug: string
  description: string
  content: string
  featured: boolean
  thumbnail: string | null
  images: string[]
  technologies: string[]
  liveUrl: string | null
  githubUrl: string | null
  createdAt: string
  updatedAt: string
}

export default function EditProject() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    featured: false,
    thumbnail: '',
    images: '',
    technologies: '',
    liveUrl: '',
    githubUrl: ''
  })

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session || session.user?.email !== 'hany.rabah@gmail.com') {
      router.push('/admin/login')
      return
    }

    fetchProject()
  }, [session, status, router, params.id])

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/admin/projects/${params.id}`)
      if (response.ok) {
        const projectData = await response.json()
        setProject(projectData)
        setFormData({
          title: projectData.title,
          slug: projectData.slug,
          description: projectData.description,
          content: projectData.content,
          featured: projectData.featured,
          thumbnail: projectData.thumbnail || '',
          images: projectData.images.join(', '),
          technologies: projectData.technologies.join(', '),
          liveUrl: projectData.liveUrl || '',
          githubUrl: projectData.githubUrl || ''
        })
      } else {
        router.push('/admin/projects')
      }
    } catch (error) {
      console.error('Failed to fetch project:', error)
      router.push('/admin/projects')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch(`/api/admin/projects/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          slug: formData.slug,
          description: formData.description,
          content: formData.content,
          featured: formData.featured,
          thumbnail: formData.thumbnail || null,
          images: formData.images.split(',').map(img => img.trim()).filter(img => img),
          technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech),
          liveUrl: formData.liveUrl || null,
          githubUrl: formData.githubUrl || null,
        }),
      })

      if (response.ok) {
        router.push('/admin/projects')
      } else {
        alert('Failed to save project')
      }
    } catch (error) {
      console.error('Failed to save project:', error)
      alert('Failed to save project')
    } finally {
      setSaving(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin mx-auto" />
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-gray-600">Project not found</p>
          <Link href="/admin/projects">
            <Button variant="outline">Back to Projects</Button>
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
            <Link href="/admin/projects">
              <Button variant="outline" size="sm" className="border-gray-300">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Project</h1>
              <p className="text-gray-600">Modify your project details</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link href={`/projects/${project.slug}`} target="_blank">
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
                <CardTitle className="text-gray-900">Project Content</CardTitle>
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
                  <Label htmlFor="description" className="text-gray-700">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                <CardTitle className="text-gray-900">Project Settings</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="featured" className="text-gray-700">Featured</Label>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                </div>

                <div>
                  <Label htmlFor="technologies" className="text-gray-700">Technologies</Label>
                  <Input
                    id="technologies"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    placeholder="React, TypeScript, Node.js"
                    className="mt-1 border-gray-300"
                  />
                  <p className="text-sm text-gray-500 mt-1">Separate with commas</p>
                </div>

                <div>
                  <Label htmlFor="thumbnail" className="text-gray-700">Thumbnail URL</Label>
                  <Input
                    id="thumbnail"
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="mt-1 border-gray-300"
                  />
                </div>

                <div>
                  <Label htmlFor="images" className="text-gray-700">Additional Images</Label>
                  <Textarea
                    id="images"
                    value={formData.images}
                    onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                    placeholder="URL1, URL2, URL3"
                    rows={3}
                    className="mt-1 border-gray-300"
                  />
                  <p className="text-sm text-gray-500 mt-1">Separate URLs with commas</p>
                </div>

                <div>
                  <Label htmlFor="liveUrl" className="text-gray-700">Live URL</Label>
                  <Input
                    id="liveUrl"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    placeholder="https://example.com"
                    className="mt-1 border-gray-300"
                  />
                </div>

                <div>
                  <Label htmlFor="githubUrl" className="text-gray-700">GitHub URL</Label>
                  <Input
                    id="githubUrl"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/user/repo"
                    className="mt-1 border-gray-300"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-gray-50 border-b border-gray-200">
                <CardTitle className="text-gray-900">Project Info</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Status:</span>
                  <Badge variant={project.featured ? "default" : "secondary"}>
                    {project.featured ? 'Featured' : 'Regular'}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Created:</span>
                  <span className="text-gray-900">{new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Updated:</span>
                  <span className="text-gray-900">{new Date(project.updatedAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
