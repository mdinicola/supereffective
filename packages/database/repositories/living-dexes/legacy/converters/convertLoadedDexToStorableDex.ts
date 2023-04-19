import { DEX_SCHEMA_VERSION, LoadedDex, StorableDex } from '../types'
import { convertPokemonListToStorable } from './convertPokemonListToStorable'

export const convertLoadedDexToStorableDex = (dex: LoadedDex): StorableDex => {
  return {
    id: dex.id,
    userId: dex.userId,

    title: dex.title,
    sver: DEX_SCHEMA_VERSION,
    preset: [dex.gameSetId, dex.gameId, dex.presetId, dex.presetVersion],
    caught: [dex.caughtRegular, dex.totalRegular],
    caughtShiny: [dex.caughtShiny, dex.totalShiny],

    boxes: dex.boxes.map(box => ({
      pokemon: convertPokemonListToStorable(box.pokemon, DEX_SCHEMA_VERSION),
      shiny: box.shiny,
    })),

    createdAt: dex.createdAt,
    updatedAt: dex.updatedAt,
  }
}
