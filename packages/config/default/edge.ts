export type FeatureName =
  | 'signIn'
  | 'createLivingDex'
  | 'editLivingDex'
  | 'livingDexV2'
  | 'userProfilesV2'
export type ServiceName = 'website' | 'mailing' | 'database'

export type EdgeConfig = {
  services: {
    [key in ServiceName]: {
      enabled: boolean
      data?: any
    }
  }
  features: {
    [key in FeatureName]: {
      enabled: boolean
      data?: any
    }
  }
}

export const edgeConfig: EdgeConfig = {
  services: {
    website: {
      enabled: true,
    },
    mailing: {
      enabled: true,
    },
    database: {
      enabled: true,
    },
  },
  features: {
    signIn: {
      enabled: true,
    },
    createLivingDex: {
      enabled: true,
    },
    editLivingDex: {
      enabled: true,
    },
    livingDexV2: {
      enabled: true,
    },
    userProfilesV2: {
      enabled: true,
    },
  },
}
