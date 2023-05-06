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

export type ApiResponse<T = any> = {
  statusCode: number
  data?: T | { message: string }
  headers?: Record<string, string | string[]>
}

export const apiErrors = {
  notFound: {
    statusCode: 404,
    data: { message: 'Not found' },
  } satisfies ApiResponse,
  notAuthorized: {
    statusCode: 403,
    data: { message: 'Not authorized' },
  } satisfies ApiResponse,
  notAuthenticated: {
    statusCode: 401,
    data: { message: 'Not authenticated' },
  } satisfies ApiResponse,
  invalidRequest: {
    statusCode: 400,
    data: { message: 'Invalid request data' },
  } satisfies ApiResponse,
  notAllowed: {
    statusCode: 405,
    data: { message: 'Not allowed' },
  } satisfies ApiResponse,
  internalServerError: {
    statusCode: 500,
    data: { message: 'Internal server error' },
  } satisfies ApiResponse,
}
