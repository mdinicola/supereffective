import { useState } from 'react'
import Link from 'next/link'

import { useDexesContext } from '@/features/livingdex/state/LivingDexListContext'
import { GameLogo } from '@/features/livingdex/views/GameLogo'
import PageMeta from '@/features/pages/components/PageMeta'
import { Pokedex } from '@/features/pokedex/views/Pokedex'
import { LoadingBanner } from '@/lib/components/layouts/LegacyLayout/LoadingBanner'
import { abs_url } from '@/lib/components/legacy/Link/Links'
import { useScrollToLocation } from '@/lib/hooks/useScrollToLocation'
import { getGameSetByGameId } from '@/lib/repositories/game-sets'
import { getGameById } from '@/lib/repositories/games'
import { LegacyGame } from '@/lib/repositories/games/types'
import { DexPokemon, NullableDexPokemon } from '@/lib/repositories/living-dexes/legacy/types'
import { getPokemonEntries, getPokemonSearchIndex } from '@/lib/repositories/pokemon'
import { PokemonEntry } from '@/lib/repositories/pokemon/types'

import styles from './missing.module.css'

type MissingPokemon = {
  game: LegacyGame
  pokemon: PokemonEntry[]
  countSpecies: number
  countForms: number
}

const Page = () => {
  useScrollToLocation()
  const { dexes, dexesLoading } = useDexesContext()
  const [showShiny, setShowShiny] = useState(false)

  if (dexesLoading) {
    return <LoadingBanner />
  }

  if (dexes === null) {
    return <LoadingBanner content={<span>You need to be logged in to access this page.</span>} />
  }

  const allPokemon = getPokemonEntries()
  const pokemonSearch = getPokemonSearchIndex()

  if (dexes.length === 0) {
    return (
      <LoadingBanner
        content={
          <div>
            You currently don't have any Pokédex to track. Try{' '}
            <Link href={'/apps/livingdex/new'}>creating one</Link> first.
            <div></div>
          </div>
        }
      />
    )
  }

  const shinyAnchor = (
    <span
      onClick={() => {
        setShowShiny(true)
      }}
      className={styles.nonShinyAnchor}
    >
      <i className={'icon-pkg-shiny'} /> View Shiny Mode
    </span>
  )

  const nonShinyAnchor = (
    <span
      onClick={() => {
        setShowShiny(false)
      }}
      className={styles.shinyAnchor}
    >
      <i className={'icon-pkg-pokedex'} /> View Normal Mode
    </span>
  )

  const missingPokemonByGame: MissingPokemon[] = []

  for (const dex of dexes) {
    let countSpecies = 0
    let countForms = 0

    const missingPokemon: PokemonEntry[] = []
    const boxesPokemon: DexPokemon[] = dex.boxes
      .reduce((acc, box) => acc.concat(box.pokemon), [] as NullableDexPokemon[])
      .filter(p => p !== null) as DexPokemon[]

    for (const pokemon of allPokemon) {
      if (showShiny && !pokemon.shiny.released) {
        continue
      }
      if (showShiny && pokemon.shiny.base !== null) {
        continue
      }
      // if (pokemon.isForm) {
      //   continue
      // }
      if (boxesPokemon.some(p => p.pid === pokemon.id)) {
        if (!boxesPokemon.some(p => p.pid === pokemon.id && p.caught && p.shiny === showShiny)) {
          if (pokemon.form.isForm) {
            countForms++
          } else {
            countSpecies++
          }
          missingPokemon.push(pokemon)
        }
      }
    }

    if (missingPokemon.length > 0) {
      missingPokemonByGame.push({
        game: getGameById(dex.gameId),
        pokemon: missingPokemon,
        countSpecies,
        countForms,
      })
    }
  }

  return (
    <div className={'page-container'} style={{ maxWidth: 'none' }}>
      <PageMeta
        metaTitle={'Missing Pokémon - Living Pokédex Tracker - Supereffective.gg'}
        metaDescription={''}
        robots={'noindex,nofollow'}
        canonicalUrl={abs_url('/apps/livingdex/missing')}
        lang={'en'}
      />
      <div className={styles.topRightCallout}>
        {showShiny && nonShinyAnchor}
        {!showShiny && shinyAnchor}
      </div>
      <div className={'page-content'}>
        <div className={'text-center'}>
          <h2 className="main-title-outlined">
            <i className="icon-pkg-pokeball" /> Missing Pokémon
          </h2>
          <p className={styles.heroContent}>
            List of Pokémon that are not yet stored in each of your Living Pokédexes.
          </p>
        </div>
        {missingPokemonByGame.map(missingPokemon => {
          if (!missingPokemon.game.setId) {
            throw new Error('Missing game set id for ' + missingPokemon.game.id)
          }
          const gameSet = getGameSetByGameId(missingPokemon.game.id)
          if (showShiny && !gameSet.hasShinies) {
            return null
          }
          return (
            missingPokemon.pokemon.length > 0 && (
              <div className={styles.gameBlock} key={missingPokemon.game.id}>
                <Pokedex
                  pokemon={missingPokemon.pokemon}
                  pokemonSearch={pokemonSearch}
                  useSearch={missingPokemon.pokemon.length >= 50}
                  showForms={true}
                  showCounts={true}
                  showShiny={showShiny}
                  className={styles.dex}
                >
                  <h3
                    style={{ fontSize: '1.6rem' }}
                    className="text-center"
                    title={'Pokémon ' + missingPokemon.game.name}
                  >
                    <div id={'g-' + missingPokemon.game.id} className="offset-anchor" />
                    <a href={'#g-' + missingPokemon.game.id}>
                      <GameLogo
                        game={missingPokemon.game.id}
                        ext=".png"
                        size={200}
                        asSwitchIcon={false}
                      />
                    </a>
                  </h3>
                  <p className={'text-center ' + styles.missingCount}>
                    Missing: {missingPokemon.countSpecies} species, {missingPokemon.countForms}{' '}
                    forms
                  </p>
                </Pokedex>
              </div>
            )
          )
        })}
      </div>
    </div>
  )
}

export default Page
