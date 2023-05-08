import { isDevelopmentEnv } from '@pkg/utils/lib/env'

export function hasDevFeaturesEnabled(): boolean {
  return isDevelopmentEnv()
}

export function hasPatreonFeaturesEnabled(): boolean {
  return hasDevFeaturesEnabled()
}
