import { Navigation } from "@/components/Navigation";
import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { ProjectsSection } from '@/components/ProjectsSection'
import { ServicesSection } from '@/components/ServicesSection'
import { BlogSection } from '@/components/BlogSection'
import { ContactSection } from '@/components/ContactSection'
import SocialLinks from '@/components/socialLinks'
import { Metadata } from 'next'
// Disable static generation until database is set up
export const dynamic = 'force-dynamic';

// SEO
export const metadata: Metadata = {
  metadataBase: new URL('https://hanyrabah.com'),
  title: 'Hany Rabah - Portfolio',
  description: 'A showcase of my latest work and projects',
  openGraph: {
    title: 'Hany Rabah - Portfolio',
    description: 'A showcase of my latest work and projects',
    type: 'website',
    locale: 'en_US',
    url: 'https://hanyrabah.com',
    siteName: 'Hany Rabah - Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hany Rabah - Portfolio',
      },
    ],
  },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <SocialLinks />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ServicesSection />
        <BlogSection />
        <ContactSection />
      </main>
    </div>
  );
}
