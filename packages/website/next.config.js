const path = require('node:path')
const withMDXFastRefresh = require('@pkg/mdx/lib/next-plugin/withMDXPageRefresh')
const { withAxiom } = require('next-axiom')
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')

/** @type {import('next').NextConfig} */
let baseConfig = {
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

const withPlugins = withAxiom(
  withMDXFastRefresh(baseConfig, {
    dir: path.resolve(path.join(__dirname, '..', '..', 'cms')),
  })
)

const withPrisma = {
  ...withPlugins,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }

    return config
  },
}

module.exports = withPrisma
