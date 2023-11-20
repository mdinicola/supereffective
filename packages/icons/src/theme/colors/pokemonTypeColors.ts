import { pokemonTypes } from '@supeffective/dataset'

export const pokemonTypeColorTokens = Object.fromEntries(
  pokemonTypes.map(type => [
    `type-${type.id}`,
    {
      value: type.color,
      description: `Color for the "${type.name}" Pokémon type`,
    },
  ])
)
