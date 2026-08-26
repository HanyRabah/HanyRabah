import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.scss'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from '@/contexts/ThemeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://hanyrabah.com'),
  title: 'Resume - Hany Rabah | Senior Fullstack Engineer CV & Technical Experience Cairo',
  description: 'Download Hany Rabah\'s resume. Senior Fullstack Engineer & Technical Lead with 15+ years experience in React, Next.js, Node.js, TypeScript, AWS. Based in Cairo, available for consulting and full-time opportunities.',
  keywords: [
    'Hany Rabah Resume',
    'Hany Rabah CV',
    'Senior Fullstack Engineer Resume',
    'Technical Lead CV Cairo',
    'Technical Lead CV Egypt',
    'Technical Lead CV Saudi Arabia',
    'Technical Lead CV United Arab Emirates',
    'React Developer Resume',
    'Next.js Expert CV',
    'Node.js Developer Resume',
    'TypeScript Engineer CV',
    'AWS Solutions Architect Resume',
    'Cairo Developer CV',
    'Fintech Engineer Resume',
    'Full Stack Developer CV',
    'JavaScript Expert Resume',
    'Web Development CV',
    'Software Engineer Resume Cairo',
    'Frontend Developer CV',
    'Backend Developer Resume',
    'Technical Leadership Resume',
    'GoDiligent Engineer',
    'Consulting Developer CV'
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
    type: 'profile',
    locale: 'en_US',
    url: 'https://hanyrabah.com/resume',
    title: 'Resume - Hany Rabah | Senior Fullstack Engineer CV Cairo',
    description: 'Download Hany Rabah\'s resume. Senior Fullstack Engineer & Technical Lead with 15+ years experience in React, Next.js, Node.js, TypeScript, AWS. Based in Cairo.',
    siteName: 'Hany Rabah Portfolio',
    images: [
      {
        url: '/og-resume.png',
        width: 1200,
        height: 630,
        alt: 'Hany Rabah Resume - Senior Fullstack Engineer CV Cairo',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume - Hany Rabah | Senior Fullstack Engineer CV Cairo',
    description: 'Download Hany Rabah\'s resume. Senior Fullstack Engineer with 15+ years experience. Available for consulting and opportunities.',
    images: ['/og-resume.png'],
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
    canonical: 'https://hanyrabah.com/resume',
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <ThemeProvider>
          {children}
          <GoogleAnalytics />
          <SpeedInsights />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
