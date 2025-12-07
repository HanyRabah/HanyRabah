import { withBotId } from 'botid/next/config'

const nextConfig = {
  // Fix turbopack workspace root warning
  turbopack: {
    root: '/Users/hany/MyWorkspace/personal/Portfolio',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vercel.blob.store',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
    // Fix image quality warning
    qualities: [75, 80, 90],
  },
  env: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  },
  async redirects() {
    return [
      // Work redirects
      {
        source: '/projects',
        destination: '/work?filter=development',
        permanent: true,
      },
      {
        source: '/design',
        destination: '/work?filter=design',
        permanent: true,
      },
      // Content Hub redirects
      {
        source: '/reading-list',
        destination: '/resources/content?type=reading',
        permanent: true,
      },
      {
        source: '/audiobooks',
        destination: '/resources/content?type=audiobooks',
        permanent: true,
      },
      {
        source: '/newsletters',
        destination: '/resources/content?type=newsletters',
        permanent: true,
      },
      {
        source: '/podcasts',
        destination: '/resources/content?type=podcasts',
        permanent: true,
      },
      // Marketplace redirects
      {
        source: '/tech-essentials',
        destination: '/resources/marketplace?type=tech',
        permanent: true,
      },
      {
        source: '/wallpapers',
        destination: '/resources/marketplace?type=wallpapers',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ]
  },
}
export default withBotId(nextConfig)
