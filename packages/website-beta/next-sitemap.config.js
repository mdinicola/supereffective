/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://supereffective.gg',
  generateRobotsTxt: true, // (optional)
  sitemapSize: 10000,
  exclude: [
    '/home',
    '/404',
    '/login',
    '/profile',
    '/account',
    '/terms-and-conditions',
    '/legal',
    '/apps/livingdex/new',
    '/apps/livingdex/missing',
    '/donate/thankyou',
    '/api/*',
    '/auth/*',
  ],
  // ...other options
}
