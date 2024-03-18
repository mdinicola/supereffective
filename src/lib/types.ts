// @see https://json.schemastore.org/web-manifest-combined.json

import type { MetadataRoute } from 'next'

export type WebManifest = MetadataRoute.Manifest & {
  // @see https://developer.mozilla.org/en-US/docs/Web/Manifest/screenshots
  screenshots: Array<{
    src: string
    type?: string
    sizes?: string
    // platform?: 'android' | 'macos' | 'windows' | 'ios' | 'ipados | 'chromeos' | 'chrome_web_store' | 'itunes' // etc.
    form_factor?: 'narrow' | 'wide'
    label?: string
  }>
  edge_side_panel?: {
    // ms-edge
    preferred_width: number
  }
}

export type OgPageType = 'article' | 'website' | 'profile' | 'product'

export type FormState<T = unknown> =
  | {
      // Data with optional message
      message?: string
      data: T
      error?: never
    }
  | {
      // Message without data
      message: string
      data?: never
      error?: never
    }
  | {
      // Error without data or messageq
      message?: never
      data?: never
      error: string
    }

export type SimplifyType<T> = {
  [K in keyof T]: T[K]
} & object

export type SimplifyTypeInferred<T> = T extends infer Tbis
  ? {
      [K in keyof Tbis]: Tbis[K]
    }
  : never
