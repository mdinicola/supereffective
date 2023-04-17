import { HTMLAttributes } from 'react'

export type ButtonElementProps<P, V> = HTMLAttributes<HTMLButtonElement> & P & V
export type DivElementProps<P, V> = HTMLAttributes<HTMLDivElement> & P & V
export type FormElementProps<P, V> = HTMLAttributes<HTMLFormElement> & P & V
export type AnchorElementProps<P, V> = HTMLAttributes<HTMLAnchorElement> & P & V
//
export type VariantElementProps<P, V, E extends HTMLElement> = HTMLAttributes<E> & P & V
