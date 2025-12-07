import { HeroSection } from '@/components/HeroSection'
// import { AboutSection } from '@/components/AboutSection'
// import { ProjectsSection } from '@/components/ProjectsSection'
// import { ServicesSection } from '@/components/ServicesSection'
import { BlogSection } from '@/components/BlogSection'
import { TimeBasedGreeting } from '@/components/TimeBasedGreeting'
import { InfoBlocks } from '@/components/InfoBlocks'
import { Metadata } from 'next'
import { StructuredData } from '@/components/StructuredData'

// Enable ISR with 1-hour revalidation for optimal global performance
export const revalidate = 3600; // Revalidate every 1 hour

// SEO
export const metadata: Metadata = {
  title: 'Hany Rabah - Berlin Fullstack Engineer | React, Next.js & AI Integration Expert',
  description: 'Senior Fullstack Engineer based in Berlin with 20+ years experience. Expert in React, Next.js, Node.js, TypeScript, AWS, and AI integration. Building scalable fintech solutions at GoDiligent. Available for consulting.',
  keywords: [
    'Hany Rabah',
    'Berlin Fullstack Engineer',
    'React Developer Berlin',
    'Next.js Expert Berlin',
    'AI Integration Developer',
    'TypeScript Specialist',
    'AWS Solutions Architect',
    'Technical Lead Berlin',
    'Node.js Expert',
    'Fintech Engineer',
    'GoDiligent',
    'JavaScript Consultant',
    'Software Engineer Berlin',
    'Full Stack Developer',
    'Web Development Consultant',
    'Technical Leadership',
    'Scalable Applications',
    'High Performance Web Apps',
    'Interactive Globe Map',
    'Real-time Applications',
    'Database Architecture',
    'DevOps Engineer',
    'Microservices Architecture'
  ],
  openGraph: {
    title: 'Hany Rabah - Berlin Fullstack Engineer | React, Next.js & AI Integration Expert',
    description: 'Senior Fullstack Engineer based in Berlin with 20+ years experience. Expert in React, Next.js, Node.js, TypeScript, AWS, and AI integration. Building scalable fintech solutions.',
    type: 'profile',
    locale: 'en_US',
    url: 'https://hanyrabah.com',
    siteName: 'Hany Rabah Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hany Rabah - Berlin Fullstack Engineer specializing in React, Next.js, and AI Integration',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hany Rabah - Berlin Fullstack Engineer | React & AI Expert',
    description: 'Senior Fullstack Engineer in Berlin. 20+ years experience with React, Next.js, Node.js, AWS, and AI integration. Available for consulting.',
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
    jobTitle: 'Senior Fullstack Engineer',
    description: 'Senior Fullstack Engineer with 20+ years of experience building scalable, high-performance web applications.',
    url: 'https://hanyrabah.com',
    image: 'https://hanyrabah.com/og-image.png',
    location: 'Berlin',
    company: 'GoDiligent',
    companyUrl: 'https://www.godiligent.ai/',
    sameAs: [
      'https://www.linkedin.com/in/hanyrabah/',
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
      <main className="space-y-12">
        <HeroSection />
        
        {/* Enhanced Homepage Content */}
        <section className="container mx-auto px-6">
          <TimeBasedGreeting />
          <InfoBlocks />
        </section>
        
        {/* <BlogSection /> */}
      </main>
    </div>
  );
}
