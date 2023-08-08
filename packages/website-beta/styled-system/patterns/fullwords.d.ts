/* eslint-disable */
import type { SystemStyleObject, ConditionalValue } from '../types'
import type { PropertyValue } from '../types/prop-type'
import type { Properties } from '../types/csstype'
import type { Tokens } from '../tokens'

export type FullwordsProperties = {
   
}


type FullwordsOptions = FullwordsProperties & Omit<SystemStyleObject, keyof FullwordsProperties | 'overflowWrap' | 'hyphens'>

interface FullwordsPatternFn {
  (options?: FullwordsOptions): string
  raw: (options: FullwordsOptions) => FullwordsOptions
}

/** A pattern that makes text wrap at word boundaries, without breaking word letters. */
export declare const fullwords: FullwordsPatternFn;
