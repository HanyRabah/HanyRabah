export interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  published: boolean
  featured: boolean
  coverImage?: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
}

export interface Project {
  id: string
  title: string
  slug: string
  description: string
  content?: string
  featured: boolean
  coverImage?: string
  images: string[]
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  category?: string
  status: 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'ARCHIVED'
  createdAt: Date
  updatedAt: Date
}

export interface Service {
  id: string
  title: string
  description: string
  icon?: string
  features: string[]
  price?: string
  popular: boolean
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Contact {
  id: string
  name: string
  email: string
  subject?: string
  message: string
  status: 'UNREAD' | 'READ' | 'REPLIED' | 'ARCHIVED'
  createdAt: Date
  updatedAt: Date
}
