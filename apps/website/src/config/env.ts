export function isProduction(): boolean {
  return getEnvName() === 'production'
}

export function isDevelopment(): boolean {
  return getEnvName() === 'develop'
}

export function getEnvName(): string {
  return (process.env.NEXT_PUBLIC_ENV as string) || 'develop'
}
