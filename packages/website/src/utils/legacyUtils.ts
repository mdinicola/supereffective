import { isDevelopmentEnv } from '@pkg/config/default/env'

export const debug = (...args: any[]): void => {
  if (isDevelopmentEnv()) {
    console.log('%c' + '  >> DEV_DEBUG ', 'color:' + 'Cyan', ...args)
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
