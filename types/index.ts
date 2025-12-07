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

export type ResourceType =
  | 'READING_LIST'
  | 'AESTHETIC_GOODS'
  | 'BOUTIQUE'
  | 'TALENT'
  | 'INVESTMENT'
  | 'NEWSLETTER'
  | 'PODCAST'

export interface Resource {
  id: string
  title: string
  description?: string
  type: ResourceType
  url: string
  category?: string
  image?: string
  isAffiliate: boolean
  displayOrder: number
  published: boolean
  clickCount: number
  tags: string[]
  createdAt: Date
  updatedAt: Date
}
