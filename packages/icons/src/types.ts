import type { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType } from 'react'

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type ResponsiveSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'auto' | 'full'
export type Font = 'sans' | 'comic' | 'mono'
export type Orientation = 'vertical' | 'horizontal'

export type PropsOf<T extends ElementType> = ComponentPropsWithoutRef<T>
export type PropsWithRefOf<T extends ElementType> = ComponentPropsWithRef<T>
