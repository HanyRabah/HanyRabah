# 👋 Hi, I’m Hany El Saydawy

🚀 **Fullstack Engineer & Technical Lead**  
🌍 Based in Berlin | Open to Remote Roles in Europe, MENA & Globally  

🔧 I specialize in:
- Frontend: **React**, **TypeScript**, **Next.js**, **TailwindCSS**
- Backend: **Node.js**, **GraphQL**, **PostgreSQL**
- DevOps: **AWS**, **CI/CD**, **Docker**
- Testing: **Playwright**, **Cypress**, **Jest**

🧠 Recently Working On:
- AI-powered platforms (check [diligent-merchant-onboarding](https://github.com/HanyRabah/diligent-merchant-onboarding))
- Scalable dashboards & CMS integrations
- Performance-optimized UI systems

📌 **Highlighted Projects**:
- 🧼 [Carizmo - Car Wash Booking App](https://github.com/HanyRabah/carizmo)
- 🗺️ [Draw Map Polygon Tool](https://github.com/HanyRabah/dp-interactive-map)
- 🧪 [Playwright Test Setup](https://github.com/HanyRabah/playwright-e2e-template)

💬 Let’s connect:
- [LinkedIn](https://www.linkedin.com/in/hanyrabah)
- 📫 hany.rabah@gmail.com

_“I love turning design into delightful products and mentoring others to do the same.”_

## ⚡ Technologies

![JavaScript](https://img.shields.io/badge/-JavaScript-black?style=flat-square&logo=javascript)
![Nodejs](https://img.shields.io/badge/-Nodejs-black?style=flat-square&logo=Node.js)
![Angular](https://img.shields.io/badge/-angular-de4132?style=flat-square&logo=Angular)
![React](https://img.shields.io/badge/-React-black?style=flat-square&logo=react)
![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3)
![Bootstrap](https://img.shields.io/badge/-Bootstrap-563D7C?style=flat-square&logo=bootstrap)
![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=typescript)
![MongoDB](https://img.shields.io/badge/-MongoDB-black?style=flat-square&logo=mongodb)
![Heroku](https://img.shields.io/badge/-Heroku-430098?style=flat-square&logo=heroku)
![Git](https://img.shields.io/badge/-Git-black?style=flat-square&logo=git)
![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github)
![GitLab](https://img.shields.io/badge/-GitLab-FCA121?style=flat-square&logo=gitlab)


© 2025 GitHub, Inc.

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
