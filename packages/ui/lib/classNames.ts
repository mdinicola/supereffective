import { twMerge } from 'tailwind-merge'

type ClassCondition = boolean | undefined | null
type ClassArg = string | undefined | null
type ClassArrArg = ClassArg | [ClassArg, ClassCondition, ClassArg?]

function classNames(...args: ClassArrArg[]): string {
  return twMerge(
    ...args
      .map(arg => {
        if (Array.isArray(arg)) {
          return arg[1] ? arg[0] : arg.length > 2 ? classNames(arg[2]) : undefined
        }

        return arg
      })
      .filter(Boolean)
  )
    .replace(/\s+/g, ' ')
    .trim()
}

export { classNames, classNames as cn }

export function createClassNameFactory(
  componentName: string,
  prefix = 'superui-'
): (className: string) => string {
  return (className: string) => {
    return `${prefix}${componentName}-${className}`
  }
}
