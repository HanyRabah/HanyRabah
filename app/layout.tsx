import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import SocialLinks from '@/components/socialLinks'
import { Navigation } from '@/components/Navigation'
import { ContactSection } from '@/components/ContactSection'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://hanyrabah.com'),
  title: {
    default: 'Hany Rabah - Senior Fullstack Engineer & Technical Lead',
    template: '%s | Hany Rabah'
  },
  description: 'Senior Fullstack Engineer and Technical Lead based in Berlin, crafting accessible, high-performance digital products. Expertise in React, Next.js, Node.js, and AWS.',
  keywords: [
    'Hany Rabah',
    'Senior Fullstack Engineer',
    'Technical Lead',
    'React Developer',
    'Next.js Expert',
    'Node.js Developer',
    'TypeScript',
    'AWS',
    'Berlin Developer',
    'Fintech Engineer',
    'Full Stack Developer',
    'JavaScript Expert',
    'Web Development',
    'Software Engineer',
    'Frontend Developer',
    'Backend Developer',
    'Portfolio',
    'GoDiligent'
  ],
  authors: [{ name: 'Hany Rabah', url: 'https://hanyrabah.com' }],
  creator: 'Hany Rabah',
  publisher: 'Hany Rabah',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hanyrabah.com',
    title: 'Hany Rabah - Senior Fullstack Engineer & Technical Lead',
    description: 'Senior Fullstack Engineer and Technical Lead based in Berlin, crafting accessible, high-performance digital products. Expertise in React, Next.js, Node.js, and AWS.',
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
    description: 'Senior Fullstack Engineer and Technical Lead based in Berlin, crafting accessible, high-performance digital products.',
    images: ['/og-image.png'],
    creator: '@hanyrabah',
    site: '@hanyrabah',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://hanyrabah.com',
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
      <Navigation />
      <SocialLinks /> 
        {children}
        <GoogleAnalytics />
        <SpeedInsights />
        <Analytics />
        <ContactSection />
      
      </body>
    </html>
  )
}
