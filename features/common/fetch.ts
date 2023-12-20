import { fetchPokemonIndex } from '@supeffective/dataset'

import config from '@/config'

export async function fetchPokemonIds(): Promise<string[]> {
  return await fetchPokemonIndex(config.assets.dataUrl, {
    next: {
      revalidate: config.assets.dataCacheTtl,
      tags: ['pokemon-ids'],
    },
  }).then(entries => entries.map(e => e.id))
}
