import { describe, expect, it } from 'vitest'

import errors from './errors'
import { getLivingDexFormat } from './formats'
import {
  LIVINGDEX_MAX_BOX_CAPACITY,
  LIVINGDEX_MAX_BOXES,
  parseLivingDex,
  serializeLivingDex,
} from './parser'
import { LivingDex, LivingDexBox, LivingDexMetadata } from './types'

const dummyMarkdown = `
\`\`\`json
{
  "$id": "0KWyiHb83ASeezpAX1oy",
  "format": "v4",
  "gameId": "SV_V",
  "title": "Pokémon Scarlet - Living Dex",
  "ownerId": "supereffective",
  "creationTime": "2023-01-25T18:29:25+00:00",
  "lastUpdateTime": "2023-01-25T18:29:25+00:00"
}
\`\`\`

> some
> ignored
> lines

## Kanto 1;1;0

- pikachu;1;0;paldea;jolly;;45;0;fairy;super;jap;;;[];[gmax,alpha,mighty,titan]
- 
- pikachu-f;1;1;kalos;bold;infected;40;5;bug;cherish;kor;[4,0,0,252,252,0];[4,0,0,31,31,0];[thunderbolt,celebrate,volt-tackle,iron-tail];[gmax]
-
`

const dummyMarkdownMeta: LivingDexMetadata = {
  $id: '0KWyiHb83ASeezpAX1oy',
  format: 'v4',
  gameId: 'SV_V',
  title: 'Pokémon Scarlet - Living Dex',
  ownerId: 'supereffective',
  creationTime: '2023-01-25T18:29:25+00:00',
  lastUpdateTime: '2023-01-25T18:29:25+00:00',
}

const dummyMarkdownBoxes: LivingDexBox[] = [
  {
    title: 'Kanto 1',
    shiny: true,
    pokemon: [
      {
        id: 'pikachu',
        captured: true,
        shiny: false,
        originMark: 'paldea',
        nature: 'jolly',
        pokerus: undefined,
        level: 45,
        dynamaxLevel: 0,
        teraType: 'fairy',
        ball: 'super',
        language: 'jap',
        evs: [],
        ivs: [],
        moves: [],
        emblemMarks: ['gmax', 'alpha', 'mighty', 'titan'],
      },
      null,
      {
        id: 'pikachu-f',
        captured: true,
        shiny: true,
        originMark: 'kalos',
        nature: 'bold',
        pokerus: 'infected',
        level: 40,
        dynamaxLevel: 5,
        teraType: 'bug',
        ball: 'cherish',
        language: 'kor',
        evs: [4, 0, 0, 252, 252, 0],
        ivs: [4, 0, 0, 31, 31, 0],
        moves: ['thunderbolt', 'celebrate', 'volt-tackle', 'iron-tail'],
        emblemMarks: ['gmax'],
      },
      null,
    ],
  },
]

const formatV4 = '```{"format": "v4"}```'

describe('parseLivingDex', () => {
  it('succeeds (minimal info)', async () => {
    const dex = parseLivingDex(formatV4)

    expect(dex.format).toBe('v4')
    expect(dex.$id).toBeUndefined()
    expect(dex.boxes).toBeInstanceOf(Array)
    expect(dex.boxes).toHaveLength(0)
  })

  it('succeeds (minimal info) with json tag', async () => {
    const dex = parseLivingDex('```json{"format": "v4"}```')

    expect(dex.format).toBe('v4')
    expect(dex.$id).toBeUndefined()
    expect(dex.boxes).toBeInstanceOf(Array)
    expect(dex.boxes).toHaveLength(0)
  })

  it('throws an error if JSON meta is missing', async () => {
    expect(() => parseLivingDex('')).toThrowWithCause(errors.LIVINGDEX.INVALID_MARKDOWN.cause)
    expect(() => parseLivingDex('- pikachu')).toThrowWithCause(
      errors.LIVINGDEX.INVALID_MARKDOWN.cause
    )
  })

  it('throws an error if JSON meta is invalid JSON', async () => {
    expect(() => parseLivingDex('```"format": "v4"}```')).toThrowWithCause(
      errors.LIVINGDEX.INVALID_MARKDOWN.cause
    )
  })

  it('throws an error if format is wrong', async () => {
    expect(() => parseLivingDex('```{"format": "v3"}```')).toThrowWithCause(
      errors.LIVINGDEX.INVALID_FORMAT.cause
    )
  })

  it('throws an error if pokemon is supplied before box', async () => {
    expect(() => parseLivingDex(formatV4 + '\n- pikachu')).toThrowWithCause(
      errors.LIVINGDEX.NO_BOXES_DETECTED.cause
    )
  })

  it('should throw an error if the boxes exceeds the configured limit', () => {
    const data = Array(LIVINGDEX_MAX_BOXES + 1)
      .fill('## Kanto 1')
      .join('\n')
    expect(() => parseLivingDex(formatV4 + data)).toThrowWithCause(
      errors.LIVINGDEX.BOXES_LIMIT_EXCEEDED.cause
    )
  })

  it('should throw an error if the box pokemon count exceeds the configured limit', () => {
    const data = Array(LIVINGDEX_MAX_BOX_CAPACITY + 1)
      .fill('- pikachu')
      .join('\n')
    expect(() => parseLivingDex(formatV4 + '## Kanto 1\n' + data)).toThrowWithCause(
      errors.LIVINGDEX.BOX_ITEM_LIMIT_EXCEEDED.cause
    )
  })

  it('should parse boxes and pokemon', () => {
    const dex = parseLivingDex(dummyMarkdown)
    expect(dex.boxes).toHaveLength(1)
    expect(dex.boxes[0].pokemon).toHaveLength(dummyMarkdownBoxes[0].pokemon.length)

    expect(dex).toEqual({
      ...dummyMarkdownMeta,
      boxes: dummyMarkdownBoxes,
    })
  })
})

describe('serializeLivingDex', () => {
  it('converts a living dex object into markdown and vice-versa, keeping the same data', () => {
    const dex: LivingDex = {
      ...dummyMarkdownMeta,
      boxes: dummyMarkdownBoxes,
    }
    const result = serializeLivingDex(dex, getLivingDexFormat('v4'))

    const expectedResult = `# LivingDex

\`\`\`json
{"$id":"0KWyiHb83ASeezpAX1oy","format":"v4","gameId":"SV_V","title":"Pokémon Scarlet - Living Dex","ownerId":"supereffective","creationTime":"2023-01-25T18:29:25+00:00","lastUpdateTime":"2023-01-25T18:29:25+00:00"}
\`\`\`

> Box format:
>
> \`## title:string:text;shiny:boolean\`
>
> Pokémon format:
>
> \`- id:string:slug; captured:boolean; shiny:boolean; originMark:string:slug; nature:string:slug; pokerus:string:slug; level:number:int; dynamaxLevel:number:int; teraType:string:slug; ball:string:slug; language:string:slug; evs:number:int[]; ivs:number:int[]; moves:string:slug[]; emblemMarks:string:slug[]\`

## "Kanto 1";1
- pikachu;1;0;paldea;jolly;;45;0;fairy;super;jap;[];[];[];[gmax,alpha,mighty,titan]
- ;
- pikachu-f;1;1;kalos;bold;infected;40;5;bug;cherish;kor;[4,0,0,252,252,0];[4,0,0,31,31,0];[thunderbolt,celebrate,volt-tackle,iron-tail];[gmax]
- ;
`

    // fs.writeFileSync('result.txt', result)
    // fs.writeFileSync('expectedResult.txt', expectedResult)

    expect(result).toEqual(expectedResult)

    // convert back
    const convertedDex = parseLivingDex(result)

    expect(convertedDex).toEqual(dex)
  })
})
