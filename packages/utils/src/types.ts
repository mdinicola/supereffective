export type ValueOf<T extends Array<string | number>> = T[number]
export declare type OmitUndefined<T> = T extends undefined ? never : T
export declare type StringToBoolean<T> = T extends 'true' | 'false' ? boolean : T

export type SimplifyType<T> = {
  [K in keyof T]: T[K]
} & object

export type SimplifyTypeInferred<T> = T extends infer Tbis
  ? {
      [K in keyof Tbis]: Tbis[K]
    }
  : never
