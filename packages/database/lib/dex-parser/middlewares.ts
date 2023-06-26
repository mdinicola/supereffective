import { findPokemonInBoxes } from './helpers'
import { createMiddlewarePipeline, MiddlewareContext } from './middleware'
import { DeserializedLivingDexDoc } from './types'

function _mw_FixMausholdIds({
  dex,
}: MiddlewareContext<DeserializedLivingDexDoc>): DeserializedLivingDexDoc {
  const mausholdFourHits = findPokemonInBoxes('maushold-four', dex)
  const mausholdThreeHits = findPokemonInBoxes('maushold', dex)
  const shouldSwitch = mausholdFourHits.length > 0 && mausholdThreeHits.length > 0

  if (!shouldSwitch) {
    return dex
  }

  for (const [boxIndex, pokemonIndex] of mausholdFourHits) {
    dex.boxes[boxIndex].pokemon[pokemonIndex]!.id = 'maushold'
  }

  for (const [boxIndex, pokemonIndex] of mausholdThreeHits) {
    dex.boxes[boxIndex].pokemon[pokemonIndex]!.id = 'maushold-three' as any
  }

  return dex
}

export const applyDefaultMiddlewares = createMiddlewarePipeline(_mw_FixMausholdIds)
