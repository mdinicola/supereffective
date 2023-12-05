const path = require('node:path')
const { withAxiom } = require('next-axiom')
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  transpilePackages: ['@pkg/*'],
  images: {
    domains: ['localhost', 'cdn.supeffective.com'],
    minimumCacheTTL: 60 * 60 * 24 * 7 * 4, // 4 weeks
  },
}

const withPlugins = withAxiom(baseConfig)

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
