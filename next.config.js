/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['vercel.blob.store'],
  },
  env: {
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
  },
}

module.exports = nextConfig
