const path = require('node:path')
const { withAxiom } = require('next-axiom')

if (!process.env.VERCEL && !process.env.VERCEL_URL) {
  process.env.VERCEL_URL = 'http://localhost:' + (process.env.PORT || 3000)
}

if (!process.env.NEXTAUTH_URL) {
  process.env.NEXTAUTH_URL = process.env.VERCEL_URL
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
