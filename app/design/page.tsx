import { Metadata } from 'next'
import MainLayout from '@/components/layout/MainLayout'
import { DesignHeroSection } from '@/components/design/DesignHeroSection'
import { DesignShowcase } from '@/components/design/DesignShowcase'
import { DesignProcess } from '@/components/design/DesignProcess'

export const metadata: Metadata = {
  title: 'Design Portfolio - Hany Rabah | UI/UX Designer & Developer',
  description: 'Explore my design portfolio showcasing UI/UX projects, design systems, and creative solutions. Combining technical expertise with design sensibility.',
  keywords: [
    'UI/UX Design Portfolio',
    'Hany Rabah Designer',
    'Design Systems',
    'User Interface Design',
    'User Experience Design',
    'Figma Designer',
    'Web Design',
    'Mobile App Design',
    'Design Process',
    'Visual Design'
  ],
  openGraph: {
    title: 'Design Portfolio - Hany Rabah',
    description: 'Explore my design portfolio showcasing UI/UX projects, design systems, and creative solutions.',
    type: 'website',
    url: 'https://hanyrabah.com/design',
  },
}

export default function DesignPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <MainLayout>
        <main>
          <DesignHeroSection />
          <DesignShowcase />
          <DesignProcess />
        </main>
      </MainLayout>
    </div>
  )
}
