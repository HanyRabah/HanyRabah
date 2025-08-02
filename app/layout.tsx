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
  metadataBase: new URL('http://localhost:3001'),
  title: {
    default: 'Your Name - Portfolio',
    template: '%s | Your Name - Portfolio'
  },
  description: 'Full-stack developer and designer creating digital experiences',
  keywords: ['developer', 'designer', 'portfolio', 'web development', 'UI/UX'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourportfolio.vercel.app',
    title: 'Your Name - Portfolio',
    description: 'Full-stack developer and designer creating digital experiences',
    siteName: 'Your Name Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Your Name - Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Name - Portfolio',
    description: 'Full-stack developer and designer creating digital experiences',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
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
