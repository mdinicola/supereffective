const path = require('node:path')
const withMDXFastRefresh = require('@pkg/mdx/lib/next-plugin/withMDXPageRefresh')
const { withAxiom } = require('next-axiom')
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')

/** @type {import('next').NextConfig} */
let baseConfig = {
  reactStrictMode: true,
  transpilePackages: ['@pkg/*'],
  experimental: {
    // turbo: true, // removed, use next --turbo instead (not compatible yet with Server Actions)
    serverActions: true,
    serverActionsBodySizeLimit: '2mb',
    // useDeploymentId: true,
    // useDeploymentIdServerActions: true,
  },
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

const withInlineSvg = {
  ...withPrisma,
  webpack: config => {
    // https://github.com/gregberge/svgr/issues/860#issuecomment-1603940142

    // Configures webpack to handle SVG files with SVGR. SVGR optimizes and transforms SVG files
    // into React components. See https://react-svgr.com/docs/next/

    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find(rule => rule.test?.test?.('.svg'))

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /\?url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        // issuer: /\.[jt]sx?$/,
        issuer: { not: /\.(css|scss|sass)$/ },
        resourceQuery: { not: /\?url/ }, // exclude if *.svg?url
        // use: ['@svgr/webpack'],
        loader: '@svgr/webpack',
        options: {
          dimensions: false,
          titleProp: true,
        },
      }
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
}

module.exports = withInlineSvg
