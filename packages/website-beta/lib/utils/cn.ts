import { BoolLike } from '@/lib/types/utility'

export type ClassNameLike = string | BoolLike
export type ClassNamesArg = ClassNameLike | ClassNameLike[] | [BoolLike, ...ClassNameLike[]]

export function cn(...classNames: ClassNamesArg[]): string {
  return classNames
    .flatMap(arg => {
      if (
        Array.isArray(arg) &&
        arg.length >= 2 &&
        (typeof arg[0] === 'boolean' || arg[0] === undefined || arg[0] === null)
      ) {
        if (arg.length > 2) {
          const [condition, valueIfTruthy, ...valuesIfFalsy] = arg

          return condition ? valueIfTruthy : valuesIfFalsy
        }

        const [condition, ...valuesIfTruthy] = arg

        return condition ? valuesIfTruthy : undefined
      }

      return arg
    })
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}
