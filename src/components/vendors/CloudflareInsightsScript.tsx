import { isProductionEnv } from '@/lib/env'

export default function CloudflareInsightsScript() {
  return (
    <>
      {isProductionEnv() && (
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "ebc18611cf774bbdaa215928f9fa7d8b"}'
        />
      )}
    </>
  )
}
