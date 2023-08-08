import { MDXRefreshMeta } from '@pkg/mdx/components/MDXRefreshMeta'
import { isDevelopmentEnv } from '@pkg/utils/lib/env'

import DarkModeScript from '@/components/layouts/shared/DarkModeScript'

export default function BaseHead() {
  return (
    <>
      {isDevelopmentEnv() && (
        // Forces a page refresh when a new MDX file is changed
        <MDXRefreshMeta />
      )}
      <DarkModeScript defaultEnabled={true} />
    </>
  )
}
