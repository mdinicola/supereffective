export const _originMarkIds = [
  'vcgb',
  'xyoras',
  'lgpe',
  'go',
  'smusum',
  'swsh',
  'bdsp',
  'la',
  'sv',
] as const

export type OriginMarkId = (typeof _originMarkIds)[number]

export function getOriginMarkIds(): readonly OriginMarkId[] {
  return _originMarkIds
}
