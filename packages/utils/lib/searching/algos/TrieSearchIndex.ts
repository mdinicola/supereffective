import { Collection, CollectionItem, SearchEngine, SearchWorkerAlgorithm } from '../types'

export class TrieNode {
  public ids: Set<string> = new Set()
  public children: Map<string, TrieNode> = new Map()
}

/**
 * Trie search algorithm is good when we are indexing small text tokens instead of long texts.
 *
 * For full-text search in large texts is better to use
 * other algorithms like: Suffix Arrays or Suffix Trees.
 */
export class TrieSearchIndex implements SearchEngine {
  public root: TrieNode = new TrieNode()
  readonly algo: SearchWorkerAlgorithm.Trie = SearchWorkerAlgorithm.Trie

  build(collection: Collection, properties: string[]): TrieSearchIndex {
    this.root = new TrieNode()

    for (const item of collection as unknown as CollectionItem[]) {
      for (const prop of properties) {
        let propValue = (item as Record<string, unknown>)[prop]
        if (typeof propValue === 'number') {
          propValue = String(propValue)
        }
        if (typeof propValue !== 'string' || propValue === '') {
          continue
        }
        const words = propValue.replace(/\s/g, '').toLowerCase().split(' ')
        for (const word of words) {
          this.#insert(word, item.id)
        }
      }
      this.root.ids.add(item.id)
    }

    return this
  }

  #insert(word: string, id: string): void {
    let current = this.root
    for (const char of word) {
      // if (!current.words) {
      //   current.words = new Set()
      // }
      // current.words.add(word)
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode())
      }
      current = current.children.get(char) as TrieNode
      current.ids.add(id)
    }
  }

  matchStartsWith(root: TrieNode, word: string): Set<string> {
    let current = root
    for (const char of word) {
      if (!current.children.has(char)) {
        return new Set()
      }
      current = current.children.get(char) as TrieNode
    }

    return current.ids
  }

  matchIncludes(root: TrieNode, word: string): Set<string> {
    const hits: Set<string> = new Set()
    this.#findMatches(root, word, 0, hits)

    return hits
  }

  #findMatches(node: TrieNode, word: string, index: number, results: Set<string>): void {
    // `ROOT -> r -> e -> d`
    // `     -> g -> r -> e -> e -> n`
    // `          -> a -> s -> t -> l -> y`
    // `     -> p -> h -> o -> t -> o`
    // `                    -> r -> e -> e -> l`
    //
    //  r  + e  + e
    if (index >= word.length) {
      node.ids.forEach(id => results.add(id))

      return
    }
    for (const [token, child] of node.children) {
      const char = word.slice(index, index + token.length)
      if (char === token) {
        this.#findMatches(child, word, index + 1, results)
      } else {
        this.#findMatches(child, word, index, results)
      }
    }
  }

  search(text: string): Set<string> {
    if (!text) {
      return this.root.ids
    }
    let hits: Set<string> = new Set()
    const words = new Set(text.toLowerCase().split(' '))
    for (const word of words) {
      const trimmedWord = word.trim().replace(/\s/g, '')
      if (trimmedWord === '') {
        continue
      }

      const ids = this.matchIncludes(this.root, trimmedWord)
      if (!ids) {
        return new Set()
      }
      if (hits.size === 0) {
        hits = ids
        continue
      }

      hits = new Set([...hits].filter(id => ids.has(id)))
    }

    return hits
  }

  searchCollection<T extends Collection>(collection: T, text: string): T {
    if (!text) {
      return collection
    }
    const hits = this.search(text)

    if (hits.size === 0) {
      return [] as Collection as T
    }

    return collection.filter(item => hits.has(item.id)) as T
  }
}

export function createTrieSearchIndex(
  collection: Collection,
  properties: string[]
): TrieSearchIndex {
  return new TrieSearchIndex().build(collection, properties)
}
