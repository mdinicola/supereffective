import { useContext, useState } from 'react'

import Link from 'next/link'

import { DexPokemon, NullableDexPokemon } from '@pkg/database/src/dexes/types'
import { getGameRepository } from '@pkg/database/src/games/getGameRepository'
import { getGameSetRepository } from '@pkg/database/src/games/getGameSetRepository'
import { GameBasicInfo } from '@pkg/database/src/games/types'
import { getPokemonRepository } from '@pkg/database/src/pokemon/getPokemonRepository'
import { PokemonEntryMinimal } from '@pkg/database/src/pokemon/types'

import { GameLogo } from '#/features/legacy/livingdex/views/GameLogo'
import { Pokedex } from '#/features/legacy/pokedex/views/Pokedex'
import { useUserDexes } from '#/features/legacy/users/hooks/useUserDexes'
import { UserContext } from '#/features/legacy/users/state/UserContext'
import PageMeta from '#/features/pages/components/PageMeta'
import { useScrollToLocation } from '#/hooks/legacy/useScrollToLocation'
import { LoadingBanner } from '#/layouts/LegacyLayout/LoadingBanner'
import { abs_url } from '#/primitives/legacy/Link/Links'
import PkSpriteStyles from '#/styles/legacy/PkSpriteStyles'

import styles from './missing.module.css'

const pokeRepo = getPokemonRepository()
const gameRepo = getGameRepository()
const gameSetRepo = getGameSetRepository()

export async function getServerSideProps() {
  return {
    props: {
      allPokemon: pokeRepo.getPokemonEntries(),
    },
  }
}

type MissingPokemon = {
  game: GameBasicInfo
  pokemon: PokemonEntryMinimal[]
  countSpecies: number
  countForms: number
}

const Page = ({ allPokemon }: { allPokemon: PokemonEntryMinimal[] }) => {
  useScrollToLocation()
  const [dexes, loadingDexes] = useUserDexes(useContext(UserContext))
  const [showShiny, setShowShiny] = useState(false)

  if (loadingDexes) {
    return <LoadingBanner />
  }

  if (dexes === null) {
    return <LoadingBanner content={<p>You need to be logged in to access this page.</p>} />
  }

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

    const missingPokemon: PokemonEntryMinimal[] = []
    const boxesPokemon: DexPokemon[] = dex.boxes
      .reduce((acc, box) => acc.concat(box.pokemon), [] as NullableDexPokemon[])
      .filter(p => p !== null) as DexPokemon[]

    for (const pokemon of allPokemon) {
      if (showShiny && !pokemon.shinyReleased) {
        continue
      }
      if (showShiny && pokemon.shinyBase !== null) {
        continue
      }
      // if (pokemon.isForm) {
      //   continue
      // }
      if (boxesPokemon.some(p => p.pid === pokemon.id)) {
        if (!boxesPokemon.some(p => p.pid === pokemon.id && p.caught && p.shiny === showShiny)) {
          if (pokemon.isForm) {
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
        game: gameRepo.getById(dex.gameId),
        pokemon: missingPokemon,
        countSpecies,
        countForms,
      })
    }
  }

  return (
    <div className={'page-container'} style={{ maxWidth: 'none' }}>
      <PkSpriteStyles />
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
          const gameSet = gameSetRepo.getByGameId(missingPokemon.game.id)
          if (showShiny && !gameSet.hasShinies) {
            return null
          }
          return (
            missingPokemon.pokemon.length > 0 && (
              <div className={styles.gameBlock} key={missingPokemon.game.id}>
                <Pokedex
                  pokemon={missingPokemon.pokemon}
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
