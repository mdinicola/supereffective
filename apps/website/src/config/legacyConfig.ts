const envName = (process.env.NEXT_PUBLIC_ENV as string) || 'develop'

const legacyConfig = {
  limits: {
    saveBtnDelay: 2500,
    maxDexes: 4,
    maxPokemonPerBox: 30,
    maxBoxTitleSize: 15,
    maxDexTitleSize: 32,
  },
}

if (envName === 'develop') {
  legacyConfig.limits.maxDexes = 20
}

export default legacyConfig
