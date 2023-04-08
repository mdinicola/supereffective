const chokidar = require('chokidar')
const { globSync } = require('glob')
const metadataHandler = require('./updateMetadataFile')

/**
 * @param {import('next').NextConfig} nextConfig
 * @param {{dir: string, timestampFile: string, touchFiles: string[]}} pluginOptions
 * @return {(*&{webpack(*, *): *})|*}
 */
function withMDXPageRefresh(nextConfig, pluginOptions) {
  return {
    ...nextConfig,
    webpack(config, options) {
      metadataHandler.updateMetadataFileIfNotExists()

      if (!options.dev) {
        console.warn('[MDX Refresh] Skipping MDX Refresh setup in production')
        return config
      }

      const globPattern = `${pluginOptions.dir}/**/*.mdx`

      console.log(`[MDX Refresh] Listening to changes in ${globPattern}...`)

      const mdxFiles = globSync(globPattern)
      const mdxWatcher = chokidar.watch(mdxFiles)

      mdxWatcher.on('change', (changedPath, pathStats) => {
        console.log(`[MDX Refresh] Change detected on ${changedPath}, triggering a page refresh...`)
        metadataHandler.updateMetadataFile()
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  }
}

module.exports = withMDXPageRefresh
