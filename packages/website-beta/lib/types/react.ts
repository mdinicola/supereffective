import { HTMLProps } from 'react'

export type ButtonAttributes<P = {}> = HTMLProps<HTMLButtonElement> &
  P & {
    type?: 'button' | 'submit' | 'reset' | undefined
  }
export type InputAttributes<P = {}> = HTMLProps<HTMLInputElement> & P
export type TextAreaAttributes<P = {}> = HTMLProps<HTMLTextAreaElement> & P
export type FormAttributes<P = {}> = HTMLProps<HTMLFormElement> & P
export type DivAttributes<P = {}> = HTMLProps<HTMLDivElement> & P
export type SpanAttributes<P = {}> = HTMLProps<HTMLSpanElement> & P
export type AnchorAttributes<P = {}> = HTMLProps<HTMLAnchorElement> & P
