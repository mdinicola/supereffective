const path = require('node:path')
const { withAxiom } = require('next-axiom')

if (!process.env.VERCEL && !process.env.VERCEL_URL) {
  process.env.VERCEL_URL = 'localhost:' + (process.env.PORT || 3000)
}

if (!process.env.VERCEL && !process.env.NEXTAUTH_URL) {
  const protocol = process.env.VERCEL_URL.includes('localhost') ? 'http://' : 'https://'
  process.env.NEXTAUTH_URL = protocol + process.env.VERCEL_URL
}

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'cdn.supeffective.com'],
    minimumCacheTTL: 60 * 60 * 24 * 7 * 4, // 4 weeks
  },
}

const withPlugins = withAxiom(baseConfig)

module.exports = withPlugins
