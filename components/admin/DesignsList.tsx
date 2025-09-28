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
  Star,
  ExternalLink,
  Palette,
  Figma
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface Design {
  id: string
  title: string
  slug: string
  description: string
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

interface DesignsListProps {
  limit?: number
  showHeader?: boolean
  showCreateButton?: boolean
}

export default function DesignsList({ limit, showHeader = true, showCreateButton = true }: DesignsListProps) {
  const [designs, setDesigns] = useState<Design[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteDesign, setDeleteDesign] = useState<Design | null>(null)

  useEffect(() => {
    fetchDesigns()
  }, [])

  const fetchDesigns = async () => {
    try {
      const response = await fetch('/api/admin/designs')
      if (response.ok) {
        const data = await response.json()
        setDesigns(limit ? data.slice(0, limit) : data)
      }
    } catch (error) {
      console.error('Failed to fetch designs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (design: Design) => {
    try {
      const response = await fetch(`/api/admin/designs/${design.id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        setDesigns(designs.filter(d => d.id !== design.id))
        setDeleteDesign(null)
      }
    } catch (error) {
      console.error('Failed to delete design:', error)
    }
  }

  const toggleFeatured = async (design: Design) => {
    try {
      const response = await fetch(`/api/admin/designs/${design.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          featured: !design.featured,
        }),
      })
      
      if (response.ok) {
        setDesigns(designs.map(d => 
          d.id === design.id 
            ? { ...d, featured: !d.featured }
            : d
        ))
      }
    } catch (error) {
      console.error('Failed to update design:', error)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-theme-primary/30 border-t-theme-primary rounded-full animate-spin" />
            <span className="ml-2 text-muted-foreground">Loading designs...</span>
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
                  <Palette className="w-5 h-5 mr-2 text-gray-700" />
                  Designs ({designs.length})
                </CardTitle>
                <CardDescription>
                  {limit ? `Showing ${Math.min(limit, designs.length)} most recent designs` : 'Manage your design portfolio'}
                </CardDescription>
              </div>
              {showCreateButton && (
                <Link href="/admin/designs/new">
                  <Button size="sm" className="bg-theme-primary hover:bg-theme-secondary text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    New Design
                  </Button>
                </Link>
              )}
            </div>
          </CardHeader>
        )}
        <CardContent>
          {designs.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <Palette className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No designs yet</h3>
              <p className="text-muted-foreground mb-4">
                Showcase your design work and creative projects
              </p>
              {showCreateButton && (
                <Link href="/admin/designs/new">
                  <Button className="bg-theme-primary hover:bg-theme-secondary text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Design
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {limit && designs.length > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Recent designs
                  </span>
                  <Link href="/admin/designs">
                    <Button variant="outline" size="sm">
                      View All Designs ({designs.length})
                    </Button>
                  </Link>
                </div>
              )}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Design</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Tools</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Links</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {designs.map((design) => (
                    <TableRow key={design.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          {design.coverImage && (
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted">
                              <Image
                                src={design.coverImage}
                                alt={design.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <div className="font-medium">{design.title}</div>
                            <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {design.description}
                            </div>
                            {design.clientName && (
                              <div className="text-xs text-muted-foreground">
                                Client: {design.clientName}
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {design.category.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {design.tools.slice(0, 2).map((tool) => (
                            <Badge key={tool} variant="outline" className="text-xs">
                              {tool}
                            </Badge>
                          ))}
                          {design.tools.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{design.tools.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={design.featured ? "default" : "secondary"}
                          className={design.featured ? "bg-yellow-100 text-yellow-800" : ""}
                        >
                          {design.featured ? (
                            <>
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </>
                          ) : (
                            'Regular'
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {design.projectUrl && (
                            <a
                              href={design.projectUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-theme-primary hover:text-theme-secondary"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                          {design.figmaUrl && (
                            <a
                              href={design.figmaUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <Figma className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(design.createdAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Link href={`/admin/designs/${design.id}/edit`}>
                            <Button variant="outline" size="sm" className="border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white transition-colors">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                          </Link>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setDeleteDesign(design)}
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
                                <Link href={`/design/${design.slug}`} target="_blank">
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Design
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toggleFeatured(design)}>
                                <Star className="w-4 h-4 mr-2" />
                                {design.featured ? 'Remove from Featured' : 'Mark as Featured'}
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
      <AlertDialog open={!!deleteDesign} onOpenChange={() => setDeleteDesign(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Design</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteDesign?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteDesign && handleDelete(deleteDesign)}
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
