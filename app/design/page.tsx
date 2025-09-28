import { Metadata } from 'next'
import MainLayout from '@/components/layout/MainLayout'
import { DesignHeroSection } from '@/components/design/DesignHeroSection'
import { DesignShowcase } from '@/components/design/DesignShowcase'
import { DesignProcess } from '@/components/design/DesignProcess'

export const metadata: Metadata = {
  title: 'Design Portfolio - Hany Rabah | UI/UX Designer & Fullstack Developer Berlin',
  description: 'Explore my design portfolio showcasing UI/UX projects, design systems, and creative solutions. Unique combination of technical expertise and design sensibility. Figma to code specialist in Berlin.',
  keywords: [
    'UI/UX Design Portfolio Berlin',
    'Hany Rabah Designer',
    'Design Systems Developer',
    'User Interface Design',
    'User Experience Design',
    'Figma to Code Specialist',
    'Web Design Berlin',
    'Mobile App Design',
    'Design Process',
    'Visual Design',
    'Frontend Design',
    'Design System Architecture',
    'Prototyping',
    'User Research',
    'Wireframing',
    'Interactive Design',
    'Design Thinking',
    'Technical Designer'
  ],
  openGraph: {
    title: 'Design Portfolio - Hany Rabah | UI/UX Designer & Developer',
    description: 'Design portfolio showcasing UI/UX projects, design systems, and creative solutions. Combining technical expertise with design sensibility.',
    type: 'website',
    locale: 'en_US',
    url: 'https://hanyrabah.com/design',
    siteName: 'Hany Rabah Portfolio',
    images: [
      {
        url: '/og-design.png',
        width: 1200,
        height: 630,
        alt: 'Hany Rabah Design Portfolio - UI/UX Designer and Developer',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Design Portfolio - Hany Rabah | UI/UX Designer & Developer',
    description: 'Design portfolio showcasing UI/UX projects, design systems, and creative solutions. Technical designer in Berlin.',
    images: ['/og-design.png'],
    creator: '@hanyrabah',
  },
  alternates: {
    canonical: 'https://hanyrabah.com/design',
  },
}

export default function DesignPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <MainLayout withoutContact={true}>
        <main>
          <DesignHeroSection />
          <DesignShowcase />
          <DesignProcess />
        </main>
      </MainLayout>
    </div>
  )
}
