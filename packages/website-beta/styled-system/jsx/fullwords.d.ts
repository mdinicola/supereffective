/* eslint-disable */
import type { FunctionComponent } from 'react'
import type { FullwordsProperties } from '../patterns/fullwords'
import type { HTMLStyledProps } from '../types/jsx'

export type FullwordsProps = FullwordsProperties & Omit<HTMLStyledProps<'div'>, keyof FullwordsProperties | 'overflowWrap' | 'hyphens'>

/** A pattern that makes text wrap at word boundaries, without breaking word letters. */
export declare const Fullwords: FunctionComponent<FullwordsProps>