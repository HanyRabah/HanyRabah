import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { ProjectsSection } from '@/components/ProjectsSection'
import { ServicesSection } from '@/components/ServicesSection'
import { BlogSection } from '@/components/BlogSection'
import SocialLinks from '@/components/socialLinks'
import { Metadata } from 'next'
import { StructuredData } from '@/components/StructuredData'

// Disable static generation until database is set up
export const dynamic = 'force-dynamic';

// SEO
export const metadata: Metadata = {
  title: 'Hany Rabah - Senior Fullstack Engineer & Technical Lead | Berlin',
  description: 'Senior Fullstack Engineer and Technical Lead with 15+ years of experience. Specializing in React, Next.js, Node.js, and AWS. Currently at GoDiligent, building AI-driven fintech solutions in Berlin.',
  keywords: [
    'Hany Rabah',
    'Senior Fullstack Engineer Berlin',
    'Technical Lead',
    'React Developer Berlin',
    'Next.js Expert',
    'Node.js Developer',
    'TypeScript Developer',
    'AWS Solutions Architect',
    'Fintech Engineer',
    'GoDiligent',
    'Full Stack Developer Berlin',
    'JavaScript Expert',
    'Software Engineer Berlin',
    'Frontend Developer',
    'Backend Developer',
    'Web Development Consultant',
    'Technical Leadership',
    'Scalable Web Applications',
    'High Performance Applications'
  ],
  openGraph: {
    title: 'Hany Rabah - Senior Fullstack Engineer & Technical Lead',
    description: 'Senior Fullstack Engineer with 15+ years of experience building scalable, high-performance web applications. Expert in React, Next.js, Node.js, and AWS.',
    type: 'profile',
    locale: 'en_US',
    url: 'https://hanyrabah.com',
    siteName: 'Hany Rabah Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hany Rabah - Senior Fullstack Engineer & Technical Lead',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hany Rabah - Senior Fullstack Engineer & Technical Lead',
    description: 'Senior Fullstack Engineer with 15+ years of experience. Expert in React, Next.js, Node.js, and AWS.',
    images: ['/og-image.png'],
    creator: '@hanyrabah',
  },
  alternates: {
    canonical: 'https://hanyrabah.com',
  },
  other: {
    'geo.region': 'DE-BE',
    'geo.placename': 'Berlin',
    'geo.position': '52.520008;13.404954',
    'ICBM': '52.520008, 13.404954',
  },
}

export default function Home() {
  // Structured data for SEO
  const personData = {
    name: 'Hany Rabah',
    jobTitle: 'Senior Fullstack Engineer & Technical Lead',
    description: 'Senior Fullstack Engineer and Technical Lead with 15+ years of experience building scalable, high-performance web applications.',
    url: 'https://hanyrabah.com',
    image: 'https://hanyrabah.com/og-image.png',
    location: 'Berlin',
    company: 'GoDiligent',
    companyUrl: 'https://www.godiligent.ai/',
    sameAs: [
      'https://linkedin.com/in/hany-rabah',
      'https://github.com/hanyrabah',
      'https://instagram.com/hanyrabah'
    ],
    skills: [
      'React',
      'Next.js',
      'Node.js',
      'TypeScript',
      'AWS',
      'PostgreSQL',
      'Docker',
      'GraphQL',
      'Tailwind CSS',
      'MongoDB'
    ],
    education: 'Computer Science'
  }

  const websiteData = {
    name: 'Hany Rabah Portfolio',
    description: 'Senior Fullstack Engineer and Technical Lead portfolio showcasing expertise in React, Next.js, Node.js, and AWS.',
    url: 'https://hanyrabah.com',
    author: {
      name: 'Hany Rabah',
      url: 'https://hanyrabah.com'
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StructuredData type="Person" data={personData} />
      <StructuredData type="WebSite" data={websiteData} />
     
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ServicesSection />
        <BlogSection />
      </main>
    </div>
  );
}
