import { Navigation } from "@/components/Navigation";
import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { ProjectsSection } from '@/components/ProjectsSection'
import { ServicesSection } from '@/components/ServicesSection'
import { BlogSection } from '@/components/BlogSection'
import { ContactSection } from '@/components/ContactSection'
import SocialLinks from '@/components/socialLinks'
// Disable static generation until database is set up
export const dynamic = 'force-dynamic';

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
