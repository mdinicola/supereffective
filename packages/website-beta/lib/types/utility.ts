export type KeyOf<T> = keyof T

export type ValueOf<T> = T[keyof T]

export type BoolLike = boolean | undefined | null
export type FalseLike = false | '' | 0 | null | undefined

export type HorizontalPlacement = 'left' | 'right'

export type VerticalPlacement = 'top' | 'bottom'
