const fs = require('node:fs')

const pathExists = function (_path) {
  return fs.existsSync(_path)
}

const assurePath = function (_path) {
  if (!pathExists(_path)) {
    fs.mkdirSync(_path, { recursive: true })
  }
}

const parseJsonFile = _path => {
  if (!pathExists(_path)) {
    throw new Error(`File ${_path} does not exist`)
  }

  return JSON.parse(fs.readFileSync(_path, 'utf8'))
}

const saveJsonFile = (_path, data, indentation = 2) => {
  fs.writeFileSync(_path, JSON.stringify(data, null, indentation))
}

module.exports = {
  assurePath,
  parseJsonFile,
  saveJsonFile,
}
