import { GlobalStyleObject } from '@/styled-system/types'
import { Recursive, Token } from '@/styled-system/types/composition'

export type CompositeGlobalStyleObject =
  | GlobalStyleObject
  | {
      [key: string]: GlobalStyleObject
    }

type DeepPartial<T> = {
  [P in keyof T]+?: DeepPartial<T[P]>
}
export type TokenObjectConfig = DeepPartial<Recursive<Token<string>> | undefined>
