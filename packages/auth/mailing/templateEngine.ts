import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export function loadTemplate(filename: string): string {
  return String(fs.readFileSync(path.join(__dirname, 'templates', filename)))
}

export function renderTemplate(filename: string, vars: Record<string, any>): string {
  const code = loadTemplate(filename)
  return code.replace(/{{(\w+)}}/g, (match, p1) => {
    return vars[p1] || match
  })
}
