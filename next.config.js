const path = require('node:path')
const { withAxiom } = require('next-axiom')

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
