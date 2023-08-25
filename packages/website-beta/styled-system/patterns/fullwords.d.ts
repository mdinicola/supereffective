/* eslint-disable */
import type { SystemStyleObject, ConditionalValue } from '../types'
import type { Properties } from '../types/csstype'
import type { PropertyValue } from '../types/prop-type'
import type { DistributiveOmit } from '../types/system-types'
import type { Tokens } from '../tokens'

export type FullwordsProperties = {
   
}


type FullwordsStyles = FullwordsProperties & DistributiveOmit<SystemStyleObject, keyof FullwordsProperties | 'overflowWrap' | 'hyphens'>

interface FullwordsPatternFn {
  (styles?: FullwordsStyles): string
  raw: (styles: FullwordsStyles) => SystemStyleObject
}

/** A pattern that makes text wrap at word boundaries, without breaking word letters. */
export declare const fullwords: FullwordsPatternFn;
