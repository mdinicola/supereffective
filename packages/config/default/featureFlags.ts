import { isDevelopmentEnv } from '@pkg/utils/lib/env'

import { edgeConfig } from './edge'

export function isBasicServicesEnabled(): boolean {
  return (
    edgeConfig.services.mailing.enabled &&
    edgeConfig.services.database.enabled &&
    edgeConfig.services.website.enabled
  )
}

export function hasDevFeaturesEnabled(): boolean {
  return isDevelopmentEnv()
}

export function hasPatreonFeaturesEnabled(): boolean {
  return hasDevFeaturesEnabled()
}

export function isSignInEnabled(): boolean {
  return isBasicServicesEnabled() && edgeConfig.features.signIn.enabled
}

export function isWebsiteInMaintenanceMode(): boolean {
  return edgeConfig.services.website.enabled === false
}
