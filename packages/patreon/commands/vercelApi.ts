import { envVars } from './bootstrap'

export type VercelEnvVars<V = string | null> = Record<string, { id: string; key: string; value: V }>

export type EnvVarPayload = {
  target?:
    | ('production' | 'preview' | 'development' | 'preview' | 'development')[]
    | ('production' | 'preview' | 'development' | 'preview' | 'development')
  type: 'secret' | 'system' | 'encrypted' | 'plain' | 'sensitive'
  id?: string
  key: string
  value: string
  configurationId?: string | null
  createdAt?: number
  updatedAt?: number
  createdBy?: string | null
  updatedBy?: string | null
  gitBranch?: string
  edgeConfigId?: string | null
  edgeConfigTokenId?: string | null
}

const vercelEnvVarsConfig: VercelEnvVars = {
  PATREON_CLIENT_ID: {
    id: 'MQEa3axUDqmX9XqD',
    key: 'PATREON_CLIENT_ID',
    value: null,
  },
  PATREON_CLIENT_SECRET: {
    id: 'oQ1Dqee3TQL0pFgx',
    key: 'PATREON_CLIENT_SECRET',
    value: null,
  },
  PATREON_CREATOR_ACCESS_TOKEN: {
    id: 'Y8MWmCZ9jQsCZ0fw',
    key: 'PATREON_CREATOR_ACCESS_TOKEN',
    value: null,
  },
  PATREON_CREATOR_REFRESH_TOKEN: {
    id: '5l7MMFjR6bmWLdj5',
    key: 'PATREON_CREATOR_REFRESH_TOKEN',
    value: null,
  },
}

const vercelBaseApiUrl = `https://api.vercel.com/v9/projects/${envVars.VERCEL_PROJECT_ID}`
const vercelBaseApiHeaders = {
  Authorization: `Bearer ${envVars.VERCEL_TOKEN}`,
  'Content-Type': 'application/json',
}

async function readVercelEnvVar(envVarId: string): Promise<EnvVarPayload> {
  const res = await fetch(`${vercelBaseApiUrl}/env/${envVarId}?teamId=${envVars.VERCEL_TEAM_ID}`, {
    headers: vercelBaseApiHeaders,
    method: 'GET',
  })

  const data = await res.json()

  return data
}

export async function readVercelEnvVars(): Promise<VercelEnvVars<string>> {
  const data: VercelEnvVars = JSON.parse(JSON.stringify(vercelEnvVarsConfig))

  const results = await Promise.all(
    Object.entries(data).map(([k, v]) => {
      return readVercelEnvVar(v.id)
    })
  )

  // assign values to data:
  for (const result of results) {
    if (!data[result.key]) {
      throw new Error(`vercelEnvVarsConfig: Missing key '${result.key}'`)
    }
    data[result.key].value = result.value
  }

  Object.entries(data).forEach(([k, v]) => {
    if (!v.value) {
      throw new Error(`Missing value for ${k}`)
    }
  })

  return data as VercelEnvVars<string>
}

async function updateVercelEnvVar(data: VercelEnvVars<string>[string]): Promise<EnvVarPayload> {
  const reqUrl = `${vercelBaseApiUrl}/env/${data.id}?teamId=${envVars.VERCEL_TEAM_ID}`
  const reqBody = JSON.stringify({
    value: data.value,
  })
  const res = await fetch(reqUrl, {
    headers: vercelBaseApiHeaders,
    body: reqBody,
    method: 'PATCH',
  })

  const resJson = await res.json()

  return resJson
}
export async function updateVercelEnvVars(
  data: Partial<VercelEnvVars<string>>
): Promise<Array<EnvVarPayload | null>> {
  return Promise.all(
    Object.entries(data).map(([, v]) => {
      if (!v) {
        return Promise.resolve(null)
      }
      console.log('  Updating env var:', v.key)
      return updateVercelEnvVar(v)
    })
  )
}
