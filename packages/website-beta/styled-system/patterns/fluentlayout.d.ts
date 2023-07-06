/* eslint-disable */
import type { SystemStyleObject, ConditionalValue } from '../types'
import type { PropertyValue } from '../types/prop-type'
import type { Properties } from '../types/csstype'
import type { Tokens } from '../tokens'

export type FluentlayoutProperties = {
   
}


type FluentlayoutOptions = FluentlayoutProperties & Omit<SystemStyleObject, keyof FluentlayoutProperties | 'display' | 'h' | 'maxH' | 'flexDirection' | 'justifyContent' | 'overflow' | 'minW'>

/** A flex container that fills the viewport height, and has a minimum width of 300px. */
export declare function fluentlayout(options?: FluentlayoutOptions): string
