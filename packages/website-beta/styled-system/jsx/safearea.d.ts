/* eslint-disable */
import type { FunctionComponent } from 'react'
import type { SafeareaProperties } from '../patterns/safearea'
import type { HTMLStyledProps } from '../types/jsx'

export type SafeareaProps = SafeareaProperties & Omit<HTMLStyledProps<'div'>, keyof SafeareaProperties | 'padding' | 'paddingX' | 'paddingY' | 'paddingTop' | 'paddingRight' | 'paddingBottom' | 'paddingLeft' | 'paddingBlock' | 'paddingInline' | 'paddingInlineStart' | 'paddingInlineEnd' | 'paddingBlockStart' | 'paddingBlockEnd' | 'paddingEnd' | 'paddingStart' | 'px' | 'py'>

/** A pattern that adds padding to the top, right, bottom and left, to account for safe area insets. */
export declare const Safearea: FunctionComponent<SafeareaProps>