import fs from 'node:fs'
import path from 'node:path'

export function parseJsonFile<T = unknown>(relativeFilePath: string): T {
  const absoluteFilePath = path.join(process.cwd(), relativeFilePath)

  if (!fs.existsSync(absoluteFilePath)) {
    throw new Error(`File not found: ${absoluteFilePath}`)
  }

  return JSON.parse(fs.readFileSync(absoluteFilePath, 'utf8'))
}
