/* eslint-disable */
import type { FunctionComponent } from 'react'
import type { FluentlayoutProperties } from '../patterns/fluentlayout'
import type { HTMLStyledProps } from '../types/jsx'

export type FluentlayoutProps = FluentlayoutProperties & Omit<HTMLStyledProps<'div'>, keyof FluentlayoutProperties | 'display' | 'h' | 'maxH' | 'flexDirection' | 'justifyContent' | 'overflow' | 'minW'>

/** A flex container that fills the viewport height, and has a minimum width of 300px. */
export declare const Fluentlayout: FunctionComponent<FluentlayoutProps>