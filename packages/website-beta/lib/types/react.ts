import { HTMLProps, JSXElementConstructor, ReactElement, ReactPortal } from 'react'
import { AriaButtonProps } from 'react-aria'

export type ExtendedHTMLProps<T extends Element, P = {}> = Omit<HTMLProps<T>, keyof P> & P

export type ButtonAttributes<P = {}> = ExtendedHTMLProps<HTMLButtonElement, P> & {
  type?: 'button' | 'submit' | 'reset' | undefined
}
export type InputAttributes<P = {}> = ExtendedHTMLProps<HTMLInputElement, P>
export type TextAreaAttributes<P = {}> = ExtendedHTMLProps<HTMLTextAreaElement, P>
export type FormAttributes<P = {}> = ExtendedHTMLProps<HTMLFormElement, P>
export type DivAttributes<P = {}> = ExtendedHTMLProps<HTMLDivElement, P>
export type SpanAttributes<P = {}> = ExtendedHTMLProps<HTMLSpanElement, P>
export type AnchorAttributes<P = {}> = ExtendedHTMLProps<HTMLAnchorElement, P>

export type PressEvent = Parameters<Required<AriaButtonProps>['onPress']>[0]

// export type ComponentLike = keyof JSX.IntrinsicElements | React.ComponentType<any>
export type IntrinsicElementTag = keyof JSX.IntrinsicElements

export type IntrinsicComponent<T extends Element, P = {}> = Omit<HTMLProps<T>, keyof P> & P

export type IntrinsicChildren<T extends IntrinsicElementTag, P = {}> = Omit<
  React.ReactElement<P, T>,
  keyof P
>

export type ReactNodeWithProps<T extends IntrinsicElementTag = any> = ReactElement<T> | ReactPortal
export type ReactNodeWithKey<T extends IntrinsicElementTag = any> = ReactNodeWithProps<T> & {
  key: string
}

export type AsProp = string | IntrinsicElementTag | JSXElementConstructor<any>
