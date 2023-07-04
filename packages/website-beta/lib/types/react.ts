import { HTMLAttributes } from 'react'

export type ButtonAttributes<P = {}> = HTMLAttributes<HTMLButtonElement> & P
export type InputAttributes<P = {}> = HTMLAttributes<HTMLInputElement> & P
export type TextAreaAttributes<P = {}> = HTMLAttributes<HTMLTextAreaElement> & P
export type FormAttributes<P = {}> = HTMLAttributes<HTMLFormElement> & P
export type DivAttributes<P = {}> = HTMLAttributes<HTMLDivElement> & P
export type SpanAttributes<P = {}> = HTMLAttributes<HTMLSpanElement> & P
export type AnchorAttributes<P = {}> = HTMLAttributes<HTMLAnchorElement> & P
