'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { ProjectsSection } from '@/components/ProjectsSection'
import { ServicesSection } from '@/components/ServicesSection'
import { BlogSection } from '@/components/BlogSection'
import { PageSkeleton } from '@/components/skeletons/PageSkeleton'
import MainLayout from '@/components/layout/MainLayout'

export function PageContent() {
  const { isThemeReady } = useTheme()

  if (!isThemeReady) {
    return (
      <MainLayout>
        <PageSkeleton />
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ServicesSection />
        <BlogSection />
      </main>
    </MainLayout>
  )
}
