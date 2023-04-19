const withMDXFastRefresh = require('@pkg/mdx/lib/next-plugin/withMDXPageRefresh')
const { withAxiom } = require('next-axiom')
const path = require('node:path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@pkg/*'],
  images: {
    domains: ['itsjavi.com', 'localhost'],
    minimumCacheTTL: 60 * 60 * 24 * 7 * 4, // 4 weeks
  },
  experimental: {
    appDir: true,
  },
}

module.exports = withAxiom(
  withMDXFastRefresh(nextConfig, {
    dir: path.resolve(path.join(__dirname, '..', '..', 'cms')),
  })
)
