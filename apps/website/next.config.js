/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.ctfassets.net', 'itsjavi.com'],
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

module.exports = nextConfig
