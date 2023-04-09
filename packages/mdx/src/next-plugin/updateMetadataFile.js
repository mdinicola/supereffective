const fs = require('fs')
const path = require('path')

const metadataFile = path.join(__dirname, 'withMDXPageRefresh.meta.ts')

function updateMetadataFile() {
  fs.writeFileSync(
    metadataFile,
    `const timestamp = "${new Date().toISOString()}"
const withMDXPageRefreshMeta = { timestamp }
export default withMDXPageRefreshMeta
`
  )
  console.log(`[MDX Refresh] Metadata file updated.`)
}

function updateMetadataFileIfNotExists() {
  if (!fs.existsSync(metadataFile)) {
    console.log(`[MDX Refresh] Creating metadata file...`)
    updateMetadataFile()
  }
}

module.exports = {
  metadataFile,
  updateMetadataFile,
  updateMetadataFileIfNotExists,
}
