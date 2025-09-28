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
  Github,
  FolderOpen
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface Project {
  id: string
  title: string
  slug: string
  description: string
  technologies: string[]
  coverImage: string | null
  liveUrl: string | null
  githubUrl: string | null
  featured: boolean
  createdAt: string
  updatedAt: string
}

interface ProjectsListProps {
  limit?: number
  showHeader?: boolean
  showCreateButton?: boolean
}

export default function ProjectsList({ limit, showHeader = true, showCreateButton = true }: ProjectsListProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteProject, setDeleteProject] = useState<Project | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/admin/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(limit ? data.slice(0, limit) : data)
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (project: Project) => {
    try {
      const response = await fetch(`/api/admin/projects/${project.id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        setProjects(projects.filter(p => p.id !== project.id))
        setDeleteProject(null)
      }
    } catch (error) {
      console.error('Failed to delete project:', error)
    }
  }

  const toggleFeatured = async (project: Project) => {
    try {
      const response = await fetch(`/api/admin/projects/${project.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          featured: !project.featured,
        }),
      })
      
      if (response.ok) {
        setProjects(projects.map(p => 
          p.id === project.id 
            ? { ...p, featured: !p.featured }
            : p
        ))
      }
    } catch (error) {
      console.error('Failed to update project:', error)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-theme-primary/30 border-t-theme-primary rounded-full animate-spin" />
            <span className="ml-2 text-muted-foreground">Loading projects...</span>
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
                  <FolderOpen className="w-5 h-5 mr-2 text-gray-700" />
                  Projects ({projects.length})
                </CardTitle>
                <CardDescription>
                  {limit ? `Showing ${Math.min(limit, projects.length)} most recent projects` : 'Manage your portfolio projects'}
                </CardDescription>
              </div>
              {showCreateButton && (
                <Link href="/admin/projects/new">
                  <Button size="sm" className="bg-theme-primary hover:bg-theme-secondary text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    New Project
                  </Button>
                </Link>
              )}
            </div>
          </CardHeader>
        )}
        <CardContent>
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
              <p className="text-muted-foreground mb-4">
                Get started by adding your first portfolio project
              </p>
              {showCreateButton && (
                <Link href="/admin/projects/new">
                  <Button className="bg-theme-primary hover:bg-theme-secondary text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Project
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {limit && projects.length > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Recent projects
                  </span>
                  <Link href="/admin/projects">
                    <Button variant="outline" size="sm">
                      View All ({projects.length})
                    </Button>
                  </Link>
                </div>
              )}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Technologies</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Links</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          {project.coverImage && (
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted">
                              <Image
                                src={project.coverImage}
                                alt={project.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <div className="font-medium">{project.title}</div>
                            <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {project.description}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 2).map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.technologies.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={project.featured ? "default" : "secondary"}
                            className={project.featured ? "bg-yellow-100 text-yellow-800" : ""}
                          >
                            {project.featured ? (
                              <>
                                <Star className="w-3 h-3 mr-1" />
                                Featured
                              </>
                            ) : (
                              'Regular'
                            )}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-theme-primary hover:text-theme-secondary"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(project.createdAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Link href={`/admin/projects/${project.id}/edit`}>
                            <Button variant="outline" size="sm" className="border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white transition-colors">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                          </Link>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setDeleteProject(project)}
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
                                <Link href={`/projects/${project.slug}`} target="_blank">
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Project
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toggleFeatured(project)}>
                                <Star className="w-4 h-4 mr-2" />
                                {project.featured ? 'Remove from Featured' : 'Mark as Featured'}
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
      <AlertDialog open={!!deleteProject} onOpenChange={() => setDeleteProject(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteProject?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteProject && handleDelete(deleteProject)}
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
