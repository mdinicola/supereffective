/* eslint-disable */
import type { SystemStyleObject, ConditionalValue } from '../types'
import type { Properties } from '../types/csstype'
import type { PropertyValue } from '../types/prop-type'
import type { DistributiveOmit } from '../types/system-types'
import type { Tokens } from '../tokens'

export type FluentlayoutProperties = {
   
}


type FluentlayoutStyles = FluentlayoutProperties & DistributiveOmit<SystemStyleObject, keyof FluentlayoutProperties | 'display' | 'h' | 'maxH' | 'flexDirection' | 'justifyContent' | 'overflow' | 'minW'>

interface FluentlayoutPatternFn {
  (styles?: FluentlayoutStyles): string
  raw: (styles: FluentlayoutStyles) => FluentlayoutStyles
}

/** A flex container that fills the viewport height, and has a minimum width of 300px. */
export declare const fluentlayout: FluentlayoutPatternFn;
