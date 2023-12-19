import { SimpleSearchIndex } from './algos/SimpleSearchIndex'
import { TrieSearchIndex } from './algos/TrieSearchIndex'
import {
  SearchEngine,
  SearchWorkerAction,
  SearchWorkerAlgorithm,
  SearchWorkerMessageEvent,
} from './types'

function createSearchEngine(algo: SearchWorkerAlgorithm): SearchEngine {
  switch (algo) {
    case SearchWorkerAlgorithm.Trie:
      return new TrieSearchIndex()
    case SearchWorkerAlgorithm.Simple:
      return new SimpleSearchIndex()
    default: {
      throw new Error(`SearchWorkerAlgorithm not supported: ${algo}`)
    }
  }
}

export const searchWorker = (event: SearchWorkerMessageEvent<SearchWorkerAction>): void => {
  const { type, data, algo } = event.data

  if (type === SearchWorkerAction.Index) {
    const engine: SearchEngine = createSearchEngine(algo)
    const { collection, properties } = data
    engine.build(collection, properties)
    postMessage({ engine })

    return
  }

  if (type === SearchWorkerAction.Query) {
    const { collection, engine, query } = data
    const hits = engine.searchCollection(collection, query)
    postMessage({ hits })
  }
}
