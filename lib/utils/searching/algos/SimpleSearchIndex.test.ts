import { SimpleSearchIndex } from './SimpleSearchIndex'

const pokemon = [
  {
    id: 'charizard',
    name: 'Charizard',
    color: 'red',
    type1: 'Fire',
    type2: 'Flying',
    original_region: 'Kanto',
  },
  {
    id: 'gyarados',
    name: 'Gyarados',
    color: 'blue',
    type1: 'Water',
    type2: 'Flying',
    original_region: 'Kanto',
  },
  {
    id: 'chikorita',
    name: 'Chikorita',
    color: 'green',
    type1: 'Grass',
    type2: null,
    original_region: 'Johto',
  },
  {
    id: 'kecleon',
    name: 'Kecleon',
    color: 'green',
    type1: 'Normal',
    type2: null,
    original_region: 'Hoenn',
  },
  {
    id: 'garchomp',
    name: 'Garchomp',
    color: 'blue',
    type1: 'Dragon',
    type2: 'Ground',
    original_region: 'Sinnoh',
  },
  {
    id: 'gothitelle',
    name: 'Gothitelle',
    color: 'black',
    type1: 'Psychic',
    type2: null,
    original_region: 'Unova',
  },
  {
    id: 'talonflame',
    name: 'Talonflame',
    color: 'red',
    type1: 'Fire',
    type2: 'Flying',
    original_region: 'Kalos',
  },
  {
    id: 'decidueye',
    name: 'Decidueye',
    color: 'green',
    type1: 'Grass',
    type2: 'Ghost',
    original_region: 'Alola',
  },
  {
    id: 'drednaw',
    name: 'Drednaw',
    color: 'blue',
    type1: 'Water',
    type2: 'Rock',
    original_region: 'Galar',
  },
  {
    id: 'maushold',
    name: 'Maushold',
    color: 'white',
    type1: 'Normal',
    type2: null,
    original_region: 'Paldea',
  },
]
describe('SimpleSearchIndex', () => {
  let engine: SimpleSearchIndex

  beforeEach(() => {
    engine = new SimpleSearchIndex().build(pokemon, [
      'name',
      'color',
      'type1',
      'type2',
      'original_region',
    ])
  })

  it('create', () => {
    expect(engine).toBeInstanceOf(SimpleSearchIndex)
  })

  it('search with 1 complete match', () => {
    const result = engine.searchCollection(pokemon, 'Chikorita')
    expect(result).toHaveLength(1)
    expect(result[0].id).toEqual('chikorita')
  })

  it('search with 2 words and extra whitespace', () => {
    const result = engine.searchCollection(pokemon, ' green \n oenn  \n \t  ')
    expect(result).toHaveLength(3)
    expect(result[0].id).toEqual('chikorita')
    expect(result[1].id).toEqual('kecleon')
    expect(result[2].id).toEqual('decidueye')
  })

  it('search with different criteria from different objects', () => {
    const result = engine.searchCollection(pokemon, ' kecleon \n ikoRiTa  \n ikoRiTa   ')
    expect(result).toHaveLength(2)
    expect(result[0].id).toEqual('chikorita')
    expect(result[1].id).toEqual('kecleon')
  })

  it('search with partial match', () => {
    const result = engine.searchCollection(pokemon, 'reen')
    expect(result).toHaveLength(3)
    expect(result[0].id).toEqual('chikorita')
    expect(result[1].id).toEqual('kecleon')
    expect(result[2].id).toEqual('decidueye')
  })

  it('search with empty string returns all items', () => {
    const result = engine.searchCollection(pokemon, '')
    expect(result).toHaveLength(pokemon.length)
    expect(result[0].id).toEqual('charizard')
    expect(result[pokemon.length - 1].id).toEqual('maushold')
  })
})
