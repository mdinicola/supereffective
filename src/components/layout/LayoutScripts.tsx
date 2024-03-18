import DebugPanel from '@/components/DebugPanel'
import { isDevelopmentEnv } from '@/lib/env'
import CloudflareInsightsScript from '../vendors/CloudflareInsightsScript'

export default function LayoutScripts() {
  return (
    <>
      {isDevelopmentEnv() && <DebugPanel />}
      <CloudflareInsightsScript />
    </>
  )
}
