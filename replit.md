# Overview

This is a modern, full-stack portfolio website for Hany El Saydawy (Hany Rabah), a Senior Fullstack Engineer and Technical Lead based in Berlin. The application showcases professional experience, technical projects, blog posts, design work, and provides contact functionality. Built with Next.js 14, TypeScript, and a comprehensive theme system, it serves as both a personal portfolio and a content management platform.

The site features:
- Dynamic content management for projects, blog posts, designs, and services
- Multi-theme color system with dark/light mode support
- Email integration for contact forms
- SEO optimization with structured data and sitemaps
- Analytics integration (Google Analytics, Vercel Analytics)
- Resume/CV display functionality
- Admin dashboard for content management

## Recent Changes

**October 3, 2025 - Vercel to Replit Migration**
- Migrated project from Vercel to Replit environment
- Updated Next.js configuration to bind to 0.0.0.0:5000 for Replit compatibility
- Configured image optimization to support Replit proxy domains (*.replit.dev, *.repl.co)
- Set up Replit PostgreSQL database with Prisma schema
- Added all required environment secrets (Google OAuth, Resend, NextAuth, Analytics)
- Fixed ThemeScript to prevent null reference errors with DOM ready checks
- All core functionality tested and working in Replit environment

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework & Language**
- Next.js 14 with App Router architecture for server-side rendering and optimal performance
- TypeScript for type safety across the application
- React Server Components for improved performance and reduced bundle size

**Styling & UI**
- Tailwind CSS for utility-first styling with custom theme configuration
- Radix UI components for accessible, unstyled primitives
- Ant Design for admin dashboard interface
- Custom theme system using React Context with CSS variables for dynamic color schemes (teal, purple, blue, green) and dark/light modes
- Theme persistence via localStorage with SSR-safe hydration

**State Management**
- React Context API for theme management
- NextAuth session management for authentication state
- Server-side data fetching with Next.js data fetching patterns

**Performance Optimizations**
- Critical CSS inlining to prevent FOUC (Flash of Unstyled Content)
- Theme script injection in document head for immediate theme application
- Font optimization with Next.js font system and `display: swap`
- Image optimization with Next.js Image component and Vercel Blob storage
- Skeleton loading states for progressive rendering

## Backend Architecture

**Database Layer**
- PostgreSQL as the primary relational database (recommended: Neon for serverless)
- Prisma ORM for type-safe database access and migrations
- Schema includes: Posts, Projects, Services, Designs, Contacts, and Analytics tables
- Database connection singleton pattern to prevent connection exhaustion

**API Routes**
- Next.js API routes for server-side operations
- RESTful endpoints for CRUD operations on content
- Contact form submission handling with email integration
- Admin API routes protected by authentication middleware

**Authentication**
- NextAuth.js for authentication management
- Session-based authentication for admin dashboard access
- Role-based access control (admin role support)

**Email Service**
- Resend API for transactional emails
- Contact form emails with HTML templates
- Auto-reply functionality for form submissions

## Data Storage Solutions

**Primary Database**
- PostgreSQL via Prisma ORM
- Tables: Post, Project, Service, Design, Contact, Analytics
- Relationships managed through Prisma schema with foreign keys
- Safe database query utility for build-time database unavailability handling

**File Storage**
- Vercel Blob for image and asset storage
- Public access URLs for uploaded media
- Upload/delete utilities for blob management

**Browser Storage**
- localStorage for theme preferences persistence
- Session storage for temporary UI state

## External Dependencies

**Third-Party Services**
- **Resend**: Email delivery service for contact forms and notifications
  - API key required: `RESEND_API_KEY`
  - Sender/recipient email configuration via environment variables

- **Vercel**: Deployment platform and service provider
  - Vercel Analytics for user behavior tracking
  - Vercel Speed Insights for performance monitoring
  - Vercel Blob for file storage

- **Google Analytics**: Web analytics tracking
  - Configured via `GOOGLE_ANALYTICS_ID` environment variable

- **Neon**: PostgreSQL database hosting (recommended)
  - Connection via `DATABASE_URL` environment variable

**UI Component Libraries**
- Radix UI: Accessible component primitives (accordion, dialog, dropdown, tooltip, etc.)
- Ant Design: Admin dashboard components (tables, forms, modals)
- Lucide Icons: Icon system throughout the application
- Framer Motion: Animation library for interactive elements

**Development Dependencies**
- Playwright and Cypress for end-to-end testing
- Jest for unit testing
- TypeScript for type checking
- ESLint for code linting

## Authentication & Authorization

**Admin Access**
- NextAuth.js session-based authentication
- Protected admin routes under `/admin/*`
- Role-based middleware for admin functionality
- Session provider wrapping admin layout

**Public Routes**
- All portfolio pages are publicly accessible
- Contact form available without authentication
- Blog and project pages use dynamic routing with server-side rendering

## SEO & Analytics

**SEO Implementation**
- Dynamic meta tags for all pages
- Structured data (JSON-LD) for Person, Article, and Project schemas
- Sitemap generation from database content
- Robots.txt configuration for crawler directives
- Open Graph and Twitter Card metadata

**Analytics Tracking**
- Google Analytics script injection
- Vercel Analytics for user tracking
- Speed Insights for Core Web Vitals monitoring
- Custom analytics table in database for internal tracking

## Deployment Architecture

**Build Process**
- Prisma client generation during build (`prisma generate`)
- Static page generation where possible with `force-dynamic` fallback
- Environment-aware database connection handling
- CSS optimization and purging via Tailwind

**Environment Configuration**
- Required environment variables: DATABASE_URL, RESEND_API_KEY, SENDER_EMAIL, RECIPIENT_EMAIL, NEXTAUTH_SECRET
- Optional: GOOGLE_ANALYTICS_ID, NEXT_PUBLIC_SITE_URL
- Vercel-specific environment handling for deployments