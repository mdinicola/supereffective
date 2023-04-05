import React, { useState } from 'react'

import { GAME_SETS, GameSetId } from '#/features/legacy/livingdex/games'
import { PokemonEntryMinimal } from '#/features/legacy/livingdex/pokemon'
import PkImage from '#/features/legacy/livingdex/views/PkImage'
import Button from '#/primitives/legacy/Button/Button'
import { classNameIf, classNames, titleize } from '#/utils/legacyUtils'
import css from './Pokedex.module.css'

export interface PokedexProps {
  className?: string
  pokemon: PokemonEntryMinimal[]
  useSearch?: boolean
  showForms?: boolean
  showShiny?: boolean
  showCounts?: boolean
  children?: React.ReactNode

  [key: string]: any
}

export interface PokemonInfoPanelProps {
  className?: string
  children?: undefined
  showShiny?: boolean
  pokemon: PokemonEntryMinimal | null
  onCloseBtnClick?: () => void
  onTypeBtnClick?: (type: string) => void
  isOpen: boolean

  [key: string]: any
}

export const PokemonInfoPanel = ({
  className,
  children, // put here to avoid it being spread
  onCloseBtnClick,
  onTypeBtnClick,
  isOpen,
  showShiny,
  pokemon,
  ...rest
}: PokemonInfoPanelProps) => {
  if (pokemon === null) {
    return null
  }

  const classes = classNames(css.infoPanel, classNameIf(isOpen, css.open, css.close), className)
  const dexNum4Digits = pokemon.dexNum ? pokemon.dexNum.toString().padStart(4, '0') : '????'
  const handleTypeClick = (type: string) => {
    if (onTypeBtnClick) {
      onTypeBtnClick(type)
    }
  }

  return (
    <div className={classes} {...rest}>
      {onCloseBtnClick && (
        <span onClick={onCloseBtnClick} className={css.closeBtn}>
          x
        </span>
      )}
      <div className={css.inner}>
        <div className={css.pkTitle}>
          <span className={css.dexNo}>No. {dexNum4Digits}</span>
          <span className={css.pkName}>{pokemon.name}</span>
        </div>
        <div className={css.picFrame}>
          <PkImage
            slug={pokemon.id}
            title={pokemon.name}
            shiny={showShiny === true}
            pixelArt={false}
            classNameExtra={css.pkimg}
          />
        </div>
        <div className={css.types}>
          {pokemon.type1 && (
            <span
              onClick={() => handleTypeClick(pokemon.type1!)}
              className={css.tooltip}
              data-tooltip={titleize(pokemon.type1)}
              data-flow="bottom"
            >
              <i className={`icon-type-${pokemon.type1}--colored-circle`} />
            </span>
          )}
          {pokemon.type2 && (
            <span
              onClick={() => handleTypeClick(pokemon.type2!)}
              className={css.tooltip}
              data-tooltip={titleize(pokemon.type2)}
              data-flow="bottom"
            >
              <i className={`icon-type-${pokemon.type2}--colored-circle`} />
            </span>
          )}
        </div>
        <section>
          <div className={css.title}>Obtainable In</div>
          <div className={css.gameIcons}>
            {pokemon.obtainableIn.map((gameSetId: GameSetId) => (
              <div
                key={gameSetId}
                className={css.gameset}
                data-tooltip={GAME_SETS[gameSetId].name}
                data-flow="bottom"
              >
                <span className={`gameset-tag gameset-${gameSetId}`}>{gameSetId}</span>
              </div>
            ))}
            {pokemon.eventOnlyIn.map((gameSetId: GameSetId) => (
              <div
                key={gameSetId}
                className={css.gameset}
                data-tooltip={GAME_SETS[gameSetId].name + ' (Event Only)'}
                data-flow="bottom"
              >
                <span className={`gameset-tag gameset-${gameSetId}`}>{gameSetId}</span>
                <span className={`icon-pkg-pokeball-outlined`} title="Event Only"></span>
              </div>
            ))}
            {pokemon.obtainableIn.length + pokemon.eventOnlyIn.length === 0 && <b>---</b>}
          </div>
        </section>
        <section>
          <div className={css.title}>Storable In</div>
          <div className={css.gameIcons}>
            {pokemon.storableIn.map((gameSetId: GameSetId) => (
              <div
                key={gameSetId}
                className={css.gameset}
                data-tooltip={GAME_SETS[gameSetId].name}
                data-flow="bottom"
              >
                <span className={`gameset-tag gameset-${gameSetId}`}>{gameSetId}</span>
              </div>
            ))}
            {pokemon.storableIn.length === 0 && <b>---</b>}
          </div>
        </section>
        {/*<section>*/}
        {/*  <div className={css.title}>More Info</div>*/}
        {/*  <div className={css.gameIcons}>*/}
        {/*    <a>*/}
        {/*      <PkImage slug="celebi" title="Serebii.net" shiny={false} pixelArt={true} classNameExtra="" />*/}
        {/*    </a>*/}
        {/*    <a>*/}
        {/*      <PkImage slug="bulbasaur" title="Bulbapedia" shiny={false} pixelArt={true} classNameExtra="" />*/}
        {/*    </a>*/}
        {/*  </div>*/}
        {/*</section>*/}
      </div>
    </div>
  )
}

interface PokedexState {
  infoPanelOpen: boolean
  selectedPkmId: string | null | undefined
  search?: string | null
  showForms: boolean
}

type PkmEntry = PokemonEntryMinimal & {
  isFemaleForm: boolean
  searchText: string
}

type PkmEntryMap = {
  [key: string]: PkmEntry
}

export const Pokedex = ({
  className,
  children,
  pokemon,
  showShiny,
  showForms = false,
  showCounts = true,
  useSearch = true,
  ...rest
}: PokedexProps) => {
  let speciesCount = 0
  let formsCount = 0

  const searchablePokemon: PkmEntry[] = pokemon.map((pkm: PokemonEntryMinimal) => {
    if (pkm.isForm) {
      formsCount++
    } else {
      speciesCount++
    }
    if (pkm.dexNum !== null && pkm.dexNum > 5000) {
      pkm.dexNum = null
    }
    const dexNum = (pkm.dexNum === null ? 0 : pkm.dexNum).toString()
    const searchText = classNames(
      'num:' + dexNum,
      dexNum.padStart(4, '0'),
      dexNum.padStart(3, '0'),
      'name:' + pkm.id,
      'name:' + pkm.name,
      'name:' + pkm.name.replace(/ /g, '').replace(/\s/g, ''),
      'type:' + (pkm.type1 ? pkm.type1 : ''),
      'type:' + (pkm.type2 ? pkm.type2 : ''),
      'id:' + (pkm.id ? pkm.id : ''),
      'base:' + (pkm.baseSpecies ? pkm.baseSpecies : '')
    ).toLowerCase()

    const isFemaleForm = /(\(female\)|female)/gi.test(pkm.name)
    const pkName = pkm.name.replace(/(\(female\)|female)/gi, '♀')
    return { ...pkm, name: pkName, isFemaleForm, searchText }
  })

  const pokemonById: PkmEntryMap = searchablePokemon.reduce((prev, pkm) => {
    prev[pkm.id] = pkm
    return prev
  }, {} as PkmEntryMap)

  const [state, setState] = useState<PokedexState>({
    infoPanelOpen: false,
    selectedPkmId: null,
    search: null,
    showForms: showForms === true,
  })

  const selectedPkm = state.selectedPkmId ? pokemonById[state.selectedPkmId] : null

  if (selectedPkm === undefined) {
    throw new Error(`${state.selectedPkmId} is not a valid Pokemon ID`)
  }

  const classes = classNames(css.dex)

  const selectPokemon = (pkmId: string): void => {
    setState({
      ...state,
      infoPanelOpen: true,
      selectedPkmId: pkmId,
    })
  }

  const handleClose = (): void => {
    setState({
      ...state,
      infoPanelOpen: false,
    })
  }

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      search: e.target.value,
    })
  }

  const searchByType = (type: string): void => {
    setState({
      ...state,
      infoPanelOpen: false,
      search: 'type:' + type,
    })
  }

  let shownSpeciesCount = 0
  let shownFormsCount = 0

  let searchValue = state.search ? state.search.toLowerCase() : ''
  if (searchValue.length >= 1 && searchValue.length < 3) {
    searchValue = ''
  }
  const searchCriteria = searchValue.split(/\s+/)

  const pokemonCells = searchablePokemon
    .filter(pk => state.showForms || !pk.isForm)
    .filter(pk => {
      if (searchValue.length === 0) {
        return true
      }
      return searchCriteria.some(criteria => pk.searchText.includes(criteria))
    })
    .map((pkm, index) => {
      if (pkm.isForm) {
        shownFormsCount++
      } else {
        shownSpeciesCount++
      }
      return (
        <div
          key={index}
          tabIndex={0}
          className={css.cell}
          data-tooltip={pkm.name}
          data-flow="bottom"
          onClick={e => {
            selectPokemon(pkm.id)
            e.stopPropagation()
          }}
          onFocus={e => {
            selectPokemon(pkm.id)
            e.stopPropagation()
          }}
        >
          <PkImage
            slug={pkm.id}
            title={pkm.name}
            shiny={showShiny === true}
            pixelArt={false}
            classNameExtra={css.pkimg}
          />
          {pkm.isFemaleForm && <span className={'female-symbol ' + css.femaleIcon}>{'♀'}</span>}
        </div>
      )
    })

  const headerContent = (
    <div className={'text-center ' + css.docTop}>
      <h2 className="main-title-outlined ">
        <i className="icon-pkg-pokedex-rotom" /> National Pokédex{' '}
        <small className={css.betaLabel} />
      </h2>
      <div className={css.intro}>
        <p>
          The Pokédex section has all basic information for you to check where to obtain all the
          Pokémon species and forms from the entire game series of all generations. You can view
          each entry by clicking on the Pokémon icon, or by searching for a Pokémon by name, number,
          or type.
        </p>
        <p style={{ fontSize: '0.9rem' }}>
          <i className="icon-help_outline icon--2x" /> Type anything or narrow-down your search by
          including prefixes like <code>num:</code>, <code>name:</code> and <code>type:</code>. If
          you type for example, just "ice" it will match everything, including "Jellicent". You can
          also enter different criteria, separated by space (in that case it will search using an OR
          condition).
        </p>
      </div>
    </div>
  )

  const searchContainer = (
    <div className={'text-center search-container ' + css.docTop}>
      <div className={css.intro}>
        <div className={css.search}>
          <input
            type="search"
            placeholder="Search by name, number or type (e.g. type:fire)"
            value={state.search ? state.search : ''}
            onChange={handleSearchInput}
          />
          <div className={css.buttons}>
            {showCounts && (
              <span>
                Showing {shownSpeciesCount} species, {shownFormsCount} forms
              </span>
            )}
            <Button
              className={css.btn}
              onClick={() => setState({ ...state, showForms: !state.showForms })}
            >
              {!state.showForms && (
                <span>
                  <i className="icon-eye" /> Show Forms
                </span>
              )}
              {state.showForms && (
                <span>
                  <i className="icon-eye-blocked" /> Hide Forms
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className={classNames(css.dexApp, className)}>
      {children ? children : headerContent}
      {useSearch && searchContainer}

      <div className={classes} {...rest}>
        <div className={css.grid}>{pokemonCells}</div>
        <PokemonInfoPanel
          isOpen={state.infoPanelOpen}
          showShiny={showShiny}
          onTypeBtnClick={useSearch ? searchByType : undefined}
          onCloseBtnClick={handleClose}
          pokemon={selectedPkm}
        />
      </div>
    </div>
  )
}
