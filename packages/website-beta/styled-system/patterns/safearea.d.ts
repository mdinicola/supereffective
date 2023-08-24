/* eslint-disable */
import type { SystemStyleObject, ConditionalValue } from '../types'
import type { Properties } from '../types/csstype'
import type { PropertyValue } from '../types/prop-type'
import type { DistributiveOmit } from '../types/system-types'
import type { Tokens } from '../tokens'

export type SafeareaProperties = {
   
}


type SafeareaStyles = SafeareaProperties & DistributiveOmit<SystemStyleObject, keyof SafeareaProperties | 'padding' | 'paddingX' | 'paddingY' | 'paddingTop' | 'paddingRight' | 'paddingBottom' | 'paddingLeft' | 'paddingBlock' | 'paddingInline' | 'paddingInlineStart' | 'paddingInlineEnd' | 'paddingBlockStart' | 'paddingBlockEnd' | 'paddingEnd' | 'paddingStart' | 'px' | 'py'>

interface SafeareaPatternFn {
  (styles?: SafeareaStyles): string
  raw: (styles: SafeareaStyles) => SafeareaStyles
}

/** A pattern that adds padding to the top, right, bottom and left, to account for safe area insets. */
export declare const safearea: SafeareaPatternFn;
