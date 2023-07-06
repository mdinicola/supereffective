/* eslint-disable */
import type { FunctionComponent } from 'react'
import type { VscrollableProperties } from '../patterns/vscrollable'
import type { HTMLStyledProps } from '../types/jsx'

export type VscrollableProps = VscrollableProperties & Omit<HTMLStyledProps<'div'>, keyof VscrollableProperties | 'overflowY' | 'overscrollBehavior' | 'overflowX' | 'maxW'>

/** A vertically scrollable container, that blocks the x-axis scrollbar. */
export declare const Vscrollable: FunctionComponent<VscrollableProps>