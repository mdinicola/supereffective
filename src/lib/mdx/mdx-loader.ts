import fs from 'node:fs'
import path from 'node:path'
import { assertServerOnly } from '../env'
import { safeSlug } from '../strings'
import type { MDXDataType, MDXFileContent, MDXIndex } from './types'

import mdxIndexRaw from '@/mdx-cache.json'
import { parseMdxFrontmatter, parseMdxParts } from './mdx-parser'

assertServerOnly()

const CMS_PATH = path.resolve(path.join(process.cwd(), 'content'))
const mdxIndex = mdxIndexRaw as MDXIndex

export const getAllMdxEntriesByType = _createGetAllEntriesFn(CMS_PATH) as <D extends MDXDataType>(
  type: string,
) => MDXFileContent<D>[]

export const findMdxEntryBySlug = <D extends MDXDataType>(
  entries: MDXFileContent<D>[],
  slug: string,
): MDXFileContent<D> | undefined => {
  if (!slug || slug !== safeSlug(slug)) {
    return undefined
  }

  return entries.find((entry) => entry.slug === slug)
}

function _getMDXFileContent<D extends MDXDataType>(baseDir: string, filePath: string): MDXFileContent<D> {
  const relativePath = filePath.replace(baseDir, '').replace(/(^\/|\/$)/g, '')
  const firstDir = relativePath.split('/').shift()

  const source = fs.readFileSync(filePath, 'utf8')

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const data: Record<string, any> = parseMdxFrontmatter<D>(source)
  const sourceParts = parseMdxParts(source)

  // dates to iso string
  for (const key in data) {
    if (data[key] instanceof Date) {
      data[key] = (data[key] as Date).toISOString()
    }
  }

  return {
    ...(data as D),
    _source: {
      file: relativePath,
      type: data.type || firstDir || undefined,
    },
    body: sourceParts.body,
  } satisfies MDXFileContent<D>
}

function _createGetAllEntriesFn<D extends MDXDataType>(baseDir: string): (type: string) => MDXFileContent<D>[] {
  const allFiles = Object.values(mdxIndex.index)
    .flat()
    .map((entry) => entry.path)

  const entriesByDir = allFiles.reduce(
    (acc, file) => {
      const content = _getMDXFileContent<D>(baseDir, file)
      if (!content._source.type) {
        throw new Error(`Missing type for MDX file: ${file}`)
      }

      const contentType = content._source.type.toLowerCase()

      if (!acc[contentType]) {
        acc[contentType] = []
      }
      acc[contentType].push(content)
      return acc
    },
    {} as Record<string, MDXFileContent<D>[]>,
  )

  return (type: string) => entriesByDir[type.toLowerCase()] || []
}
