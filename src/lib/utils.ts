import { type ClassValue, clsx } from 'clsx'
import { nanoid } from 'nanoid'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function cnx<T extends Record<string, ClassValue>>(
  classNames: T,
): {
  [K in keyof T]: string
} {
  const result = Object.fromEntries(Object.entries(classNames).map(([key, value]) => [key, cn(value)]))
  return result as ReturnType<typeof cnx<T>>
}

export function newNanoId(prefix = '', size = 7): string {
  return `${prefix}${nanoid(size)}`
}
