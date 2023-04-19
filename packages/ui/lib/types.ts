import { HTMLAttributes } from 'react'

export type ButtonElementVariantProps<P, V> = HTMLAttributes<HTMLButtonElement> & P & V
export type DivElementVariantProps<P, V> = HTMLAttributes<HTMLDivElement> & P & V
export type FormElementVariantProps<P, V> = HTMLAttributes<HTMLFormElement> & P & V
export type AnchorElementVariantProps<P, V> = HTMLAttributes<HTMLAnchorElement> & P & V
//
export type VariantElementProps<P, V, E extends HTMLElement> = HTMLAttributes<E> & P & V

export type NumberFormatter = {
  (value: number): string
}

const iconVariantValues = ['simple', 'light', 'shadow', 'solid', 'outlined'] as const

export type IconVariant = (typeof iconVariantValues)[number]

export type HorizontalPosition = 'left' | 'right'

export type VerticalPosition = 'top' | 'bottom'

export type ButtonVariant = 'primary' | 'secondary' | 'light'

const sizeValues = ['xs', 'sm', 'md', 'lg', 'xl'] as const

export type Size = (typeof sizeValues)[number]

const colorValues = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
] as const

export type Color = (typeof colorValues)[number]

export type ColumnCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
