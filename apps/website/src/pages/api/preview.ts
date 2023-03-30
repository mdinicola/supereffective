// Next.js preview support: https://nextjs.org/docs/advanced-features/preview-mode

import type { NextApiRequest, NextApiResponse } from 'next'

import {
  CmsCanonicalBasePath,
  CmsEntryType,
  getCmsEntry,
} from '@app/src/services/legacy/cms/HeadlessCms'

type Data = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow')

  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  const expectedToken = process.env.PREVIEW_MODE_TOKEN
  // if empty
  if (!req.query.token || req.query.token !== expectedToken) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  if (!req.query.id) {
    return res.status(400).json({ message: 'Missing id param' })
  }

  if (!req.query.slug) {
    return res.status(400).json({ message: 'Missing slug param' })
  }

  if (!req.query.contentType) {
    return res.status(400).json({ message: 'Missing contentType param' })
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  // getPostBySlug would implement the required fetching logic to the headless CMS

  const canonicalBasePath = CmsCanonicalBasePath.fromString(req.query.contentType as string)

  const entry = await getCmsEntry(
    req.query.contentType as CmsEntryType,
    req.query.slug as string,
    canonicalBasePath,
    true
  )

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!entry) {
    return res.status(404).json({ message: 'Invalid search parameters. Entry not found' })
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.redirect(canonicalBasePath + entry.slug)
}
