/* eslint-disable */
import type { SystemStyleObject, ConditionalValue } from '../types'
import type { Properties } from '../types/csstype'
import type { PropertyValue } from '../types/prop-type'
import type { DistributiveOmit } from '../types/system-types'
import type { Tokens } from '../tokens'

export type VscrollableProperties = {
   
}


type VscrollableStyles = VscrollableProperties & DistributiveOmit<SystemStyleObject, keyof VscrollableProperties | 'overflowY' | 'overscrollBehavior' | 'overflowX' | 'maxW'>

interface VscrollablePatternFn {
  (styles?: VscrollableStyles): string
  raw: (styles: VscrollableStyles) => VscrollableStyles
}

/** A vertically scrollable container, that blocks the x-axis scrollbar. */
export declare const vscrollable: VscrollablePatternFn;
