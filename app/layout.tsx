import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ContactDrawerProvider } from '@/contexts/ContactDrawerContext'
import { SessionProvider } from '@/components/providers/SessionProvider'
import { ThemeScript } from '@/components/ThemeScript'
import { CriticalCSS } from '@/components/CriticalCSS'
import { ConditionalShell } from '@/components/ConditionalShell'
import { ContactDrawerWrapper } from '@/components/ContactDrawerWrapper'
import { ClientAnalytics } from '@/components/ClientAnalytics'
import { ConsentManager } from '@/components/ConsentManager'
import { BotIdClient } from 'botid/client'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Improve font loading performance
  preload: true
})

export const metadata: Metadata = {
  metadataBase: new URL('https://hanyrabah.com'),
  title: {
    default: 'Hany Rabah - Senior Fullstack Engineer',
    template: '%s | Hany Rabah'
  },
  description: 'Senior Fullstack Engineer based in Berlin, crafting accessible, high-performance digital products. Expertise in React, Next.js, Node.js, and AWS.',
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
    'Frontend Engineer',
    'Backend Developer',
    'Portfolio',
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
    title: 'Hany Rabah - Senior Fullstack Engineer',
    description: 'Senior Fullstack Engineer based in Berlin, crafting accessible, high-performance digital products. Expertise in React, Next.js, Node.js, and AWS.',
    siteName: 'Hany Rabah Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hany Rabah - Senior Fullstack Engineer',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hany Rabah - Senior Fullstack Engineer',
    description: 'Senior Fullstack Engineer based in Berlin, crafting accessible, high-performance digital products.',
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

const protectedRoutes = [
  {
    path: '/api/contact',
    method: 'POST',
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <CriticalCSS />
        <ThemeScript />
        {/* Resource hints for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vercel.live" />
        <link rel="dns-prefetch" href="https://vitals.vercel-analytics.com" />
        <link rel="dns-prefetch" href="https://cdn.consentmanager.net" />
        <link rel="dns-prefetch" href="https://a.delivery.consentmanager.net" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ConsentManager />
        <BotIdClient protect={protectedRoutes} />
        <SessionProvider>
          <ThemeProvider>
            <ContactDrawerProvider>
              <ConditionalShell>
                {children}
              </ConditionalShell>
              <ContactDrawerWrapper />
              <ClientAnalytics />
            </ContactDrawerProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
