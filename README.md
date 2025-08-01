# Portfolio Website

A modern, full-stack portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features a content management system with Prisma and PostgreSQL, image storage with Vercel Blob, and comprehensive SEO optimization.

## Features

- ⚡ **Next.js 14** with App Router and TypeScript
- 🎨 **Tailwind CSS** for styling with dark mode support
- 📊 **Prisma ORM** with PostgreSQL (Neon) database
- 🖼️ **Vercel Blob** for image storage
- 📈 **Google Analytics** integration
- 🔍 **SEO optimized** with meta tags, sitemap, and robots.txt
- 📝 **Blog system** with markdown support
- 💼 **Project showcase** with detailed pages
- 📧 **Contact form** with database storage
- 🚀 **Vercel deployment** ready

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Image Storage**: Vercel Blob
- **Analytics**: Google Analytics
- **Deployment**: Vercel

## Getting Started

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your environment variables:
   - `DATABASE_URL`: Your Neon PostgreSQL connection string
   - `GOOGLE_ANALYTICS_ID`: Your Google Analytics measurement ID
   - `BLOB_READ_WRITE_TOKEN`: Your Vercel Blob token

3. **Set up the database**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   ├── projects/          # Project pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
├── lib/                   # Utility functions
├── prisma/               # Database schema
├── types/                # TypeScript types
└── public/               # Static assets
```

## Database Schema

The application includes models for:
- **Posts**: Blog posts with tags and publishing status
- **Projects**: Portfolio projects with technologies and links
- **Services**: Service offerings
- **Contacts**: Contact form submissions
- **Analytics**: Basic page visit tracking

## Deployment

1. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

2. **Set up environment variables** in Vercel dashboard

3. **Configure your domain** and SSL

## Content Management

- Add blog posts via API endpoints or database directly
- Manage projects through the database
- Contact form submissions are stored in the database
- Images can be uploaded to Vercel Blob storage

## SEO Features

- Dynamic meta tags for all pages
- Automatic sitemap generation
- Robots.txt configuration
- Open Graph and Twitter Card support
- Structured data markup

## License

MIT License - feel free to use this template for your own portfolio!
