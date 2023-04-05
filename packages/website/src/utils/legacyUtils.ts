import { isDevelopmentEnv } from '#/config/env'

export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (navigator === undefined || navigator.clipboard === undefined) {
    return false
  }
  await navigator.clipboard.writeText(text)
  return true
}

export const getWindow = (): Window | undefined => {
  return typeof window !== 'undefined' ? window : undefined
}

export const getLocationHash = (): string | null => {
  return typeof window !== 'undefined' ? window.location.hash : null
}

export const deepClone = (obj: any): typeof obj => {
  return JSON.parse(JSON.stringify(obj))
}

export const getUtcTimestamp = (): string => {
  return new Date().toISOString()
}

export const debug = (...args: any[]): void => {
  if (isDevelopmentEnv()) {
    console.log('%c' + '  >> ', 'color:' + 'Cyan', ...args)
  }
}

export const classNames = (...args: (string | undefined | null)[]): string => {
  // filter(Boolean) filters out falsy values: false, 0, 0, 0n, "", null, undefined, NaN
  return args.filter(Boolean).join(' ').trim()
}

export const classNameIf = (
  condition: boolean | undefined | null,
  trueClassName: string | undefined | null,
  falseClassName?: string | undefined | null
): string => {
  return condition === true ? classNames(trueClassName) : classNames(falseClassName)
}

export const titleize = (str: string): string => {
  if (!str) return ''
  const parts = str.split('.')
  const last = parts[parts.length - 1]
  return last.replace(/([A-Z])/g, ' $1').replace(/^./, l => l.toUpperCase())
}
