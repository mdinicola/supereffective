/* eslint-disable */
import type { SystemStyleObject, ConditionalValue } from '../types'
import type { PropertyValue } from '../types/prop-type'
import type { Properties } from '../types/csstype'
import type { Tokens } from '../tokens'

export type VscrollableProperties = {
   
}


type VscrollableOptions = VscrollableProperties & Omit<SystemStyleObject, keyof VscrollableProperties | 'overflowY' | 'overscrollBehavior' | 'overflowX' | 'maxW'>

interface VscrollablePatternFn {
  (options?: VscrollableOptions): string
  raw: (options: VscrollableOptions) => VscrollableOptions
}

/** A vertically scrollable container, that blocks the x-axis scrollbar. */
export declare const vscrollable: VscrollablePatternFn;