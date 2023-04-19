const path = require('node:path')
const withMDXFastRefresh = require('@pkg/mdx/lib/next-plugin/withMDXPageRefresh')
const { withAxiom } = require('next-axiom')

/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@pkg/*'],
  images: {
    domains: ['itsjavi.com', 'localhost'],
    minimumCacheTTL: 60 * 60 * 24 * 7 * 4, // 4 weeks
  },
  async rewrites() {
    return [
      {
        source: '/supereffective-assets/:match*',
        destination: 'https://itsjavi.com/supereffective-assets/assets/:match*',
      },
    ]
  },
}

module.exports = withAxiom(
  withMDXFastRefresh(nextConfig, {
    dir: path.resolve(path.join(__dirname, '..', '..', 'cms')),
  })
)
