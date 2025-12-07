'use client'

import dynamic from 'next/dynamic'

// Dynamic import analytics scripts to avoid blocking initial page load
const GoogleAnalytics = dynamic(() => import('@/components/GoogleAnalytics').then(mod => ({ default: mod.GoogleAnalytics })), {
  ssr: false,
})

const SpeedInsights = dynamic(() => import('@vercel/speed-insights/next').then(mod => ({ default: mod.SpeedInsights })), {
  ssr: false,
})

const Analytics = dynamic(() => import('@vercel/analytics/next').then(mod => ({ default: mod.Analytics })), {
  ssr: false,
})

export function ClientAnalytics() {
  return (
    <>
      <GoogleAnalytics />
      <SpeedInsights />
      <Analytics />
    </>
  )
}
