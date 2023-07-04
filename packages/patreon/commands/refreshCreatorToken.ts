import console from 'console'

import patreon from '../lib/patreonClient'
import { readVercelEnvVars, updateVercelEnvVars } from './vercelApi'

;(async () => {
  console.log('1. Retrieving vercel env vars...')
  const vercelEnvVars = await readVercelEnvVars()

  console.log('2. Refreshing Patreon tokens...')
  const token = await patreon.createAccessTokenWithRefreshToken(
    vercelEnvVars.PATREON_CREATOR_REFRESH_TOKEN.value,
    vercelEnvVars.PATREON_CLIENT_ID.value,
    vercelEnvVars.PATREON_CLIENT_SECRET.value
  )

  if (!token) {
    console.error(`❌ Failed to refresh Patreon tokens.`)
    process.exit(1)
    return
  }

  console.log('⚡️ Tokens refreshed, the new token expires in' + ` ${token.expires_in} seconds.`)

  const varsUpdate = {
    PATREON_CREATOR_ACCESS_TOKEN: {
      ...vercelEnvVars.PATREON_CREATOR_ACCESS_TOKEN,
      value: token.access_token,
    },
    PATREON_CREATOR_REFRESH_TOKEN: {
      ...vercelEnvVars.PATREON_CREATOR_REFRESH_TOKEN,
      value: token.refresh_token,
    },
  }

  console.log('3. Updating Vercel env vars: ', Object.keys(varsUpdate))
  await updateVercelEnvVars(varsUpdate)

  console.log('4. Calling patreon.getIdentity to try the refreshed token...')
  const identity = await patreon.getIdentity(varsUpdate.PATREON_CREATOR_ACCESS_TOKEN.value)

  if (!token) {
    console.error(`❌ Failed to get Patreon identity.`)
    process.exit(1)
    return
  }
  console.log('received identity data.type:', identity?.data?.type)
  console.log('Done.✅ ')
})()
