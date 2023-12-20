import { clsx, type ClassValue } from 'clsx'

export function cn(...className: ClassValue[]) {
  return clsx(className)
}
