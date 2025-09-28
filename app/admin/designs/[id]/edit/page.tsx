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

interface Design {
  id: string
  title: string
  slug: string
  description: string
  content: string
  featured: boolean
  coverImage: string | null
  images: string[]
  tags: string[]
  category: string
  tools: string[]
  clientName: string | null
  projectUrl: string | null
  figmaUrl: string | null
  behanceUrl: string | null
  dribbbleUrl: string | null
  createdAt: string
  updatedAt: string
}

export default function EditDesign() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const [design, setDesign] = useState<Design | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    featured: false,
    coverImage: '',
    images: '',
    tags: '',
    category: 'WEB_DESIGN',
    tools: '',
    clientName: '',
    projectUrl: '',
    figmaUrl: '',
    behanceUrl: '',
    dribbbleUrl: ''
  })

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session || session.user?.email !== 'hany.rabah@gmail.com') {
      router.push('/admin/login')
      return
    }

    fetchDesign()
  }, [session, status, router, params.id])

  const fetchDesign = async () => {
    try {
      const response = await fetch(`/api/admin/designs/${params.id}`)
      if (response.ok) {
        const designData = await response.json()
        setDesign(designData)
        setFormData({
          title: designData.title,
          slug: designData.slug,
          description: designData.description,
          content: designData.content,
          featured: designData.featured,
          coverImage: designData.coverImage || '',
          images: designData.images.join(', '),
          tags: designData.tags.join(', '),
          category: designData.category,
          tools: designData.tools.join(', '),
          clientName: designData.clientName || '',
          projectUrl: designData.projectUrl || '',
          figmaUrl: designData.figmaUrl || '',
          behanceUrl: designData.behanceUrl || '',
          dribbbleUrl: designData.dribbbleUrl || ''
        })
      } else {
        router.push('/admin/designs')
      }
    } catch (error) {
      console.error('Failed to fetch design:', error)
      router.push('/admin/designs')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch(`/api/admin/designs/${params.id}`, {
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
          coverImage: formData.coverImage || null,
          images: formData.images.split(',').map(img => img.trim()).filter(img => img),
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
          category: formData.category,
          tools: formData.tools.split(',').map(tool => tool.trim()).filter(tool => tool),
          clientName: formData.clientName || null,
          projectUrl: formData.projectUrl || null,
          figmaUrl: formData.figmaUrl || null,
          behanceUrl: formData.behanceUrl || null,
          dribbbleUrl: formData.dribbbleUrl || null,
        }),
      })

      if (response.ok) {
        router.push('/admin/designs')
      } else {
        alert('Failed to save design')
      }
    } catch (error) {
      console.error('Failed to save design:', error)
      alert('Failed to save design')
    } finally {
      setSaving(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin mx-auto" />
          <p className="text-gray-600">Loading design...</p>
        </div>
      </div>
    )
  }

  if (!design) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-gray-600">Design not found</p>
          <Link href="/admin/designs">
            <Button variant="outline">Back to Designs</Button>
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
            <Link href="/admin/designs">
              <Button variant="outline" size="sm" className="border-gray-300">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Designs
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Design</h1>
              <p className="text-gray-600">Modify your design project</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link href={`/design/${design.slug}`} target="_blank">
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
                <CardTitle className="text-gray-900">Design Content</CardTitle>
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
                <CardTitle className="text-gray-900">Design Settings</CardTitle>
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
                  <Label htmlFor="category" className="text-gray-700">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger className="mt-1 border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="WEB_DESIGN">Web Design</SelectItem>
                      <SelectItem value="MOBILE_APP">Mobile App</SelectItem>
                      <SelectItem value="UI_UX">UI/UX</SelectItem>
                      <SelectItem value="BRANDING">Branding</SelectItem>
                      <SelectItem value="ILLUSTRATION">Illustration</SelectItem>
                      <SelectItem value="DESIGN_SYSTEM">Design System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tools" className="text-gray-700">Tools</Label>
                  <Input
                    id="tools"
                    value={formData.tools}
                    onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
                    placeholder="Figma, Photoshop, Illustrator"
                    className="mt-1 border-gray-300"
                  />
                  <p className="text-sm text-gray-500 mt-1">Separate with commas</p>
                </div>

                <div>
                  <Label htmlFor="tags" className="text-gray-700">Tags</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="modern, clean, responsive"
                    className="mt-1 border-gray-300"
                  />
                  <p className="text-sm text-gray-500 mt-1">Separate tags with commas</p>
                </div>

                <div>
                  <Label htmlFor="clientName" className="text-gray-700">Client Name</Label>
                  <Input
                    id="clientName"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="Company Name"
                    className="mt-1 border-gray-300"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-gray-50 border-b border-gray-200">
                <CardTitle className="text-gray-900">Images & Links</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label htmlFor="coverImage" className="text-gray-700">Cover Image URL</Label>
                  <Input
                    id="coverImage"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    placeholder="https://example.com/cover.jpg"
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
                  <Label htmlFor="projectUrl" className="text-gray-700">Project URL</Label>
                  <Input
                    id="projectUrl"
                    value={formData.projectUrl}
                    onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                    placeholder="https://project.com"
                    className="mt-1 border-gray-300"
                  />
                </div>

                <div>
                  <Label htmlFor="figmaUrl" className="text-gray-700">Figma URL</Label>
                  <Input
                    id="figmaUrl"
                    value={formData.figmaUrl}
                    onChange={(e) => setFormData({ ...formData, figmaUrl: e.target.value })}
                    placeholder="https://figma.com/file/..."
                    className="mt-1 border-gray-300"
                  />
                </div>

                <div>
                  <Label htmlFor="behanceUrl" className="text-gray-700">Behance URL</Label>
                  <Input
                    id="behanceUrl"
                    value={formData.behanceUrl}
                    onChange={(e) => setFormData({ ...formData, behanceUrl: e.target.value })}
                    placeholder="https://behance.net/gallery/..."
                    className="mt-1 border-gray-300"
                  />
                </div>

                <div>
                  <Label htmlFor="dribbbleUrl" className="text-gray-700">Dribbble URL</Label>
                  <Input
                    id="dribbbleUrl"
                    value={formData.dribbbleUrl}
                    onChange={(e) => setFormData({ ...formData, dribbbleUrl: e.target.value })}
                    placeholder="https://dribbble.com/shots/..."
                    className="mt-1 border-gray-300"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="bg-gray-50 border-b border-gray-200">
                <CardTitle className="text-gray-900">Design Info</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Status:</span>
                  <Badge variant={design.featured ? "default" : "secondary"}>
                    {design.featured ? 'Featured' : 'Regular'}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Category:</span>
                  <Badge variant="outline">{design.category.replace('_', ' ')}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Created:</span>
                  <span className="text-gray-900">{new Date(design.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Updated:</span>
                  <span className="text-gray-900">{new Date(design.updatedAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
