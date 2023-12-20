import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { TypeIcon } from '@supeffective/icons'

// import { GameLabel, TypeIcon } from '@/lib/icons'
import PkImgFile from '@/features/livingdex/views/PkImgFile'
import Button from '@/lib/components/Button'
import { ExternLink } from '@/lib/components/Links'
import { getGameSetById } from '@/lib/data-client/game-sets'
import { PokemonEntry, PokemonEntrySearchIndex } from '@/lib/data-client/pokemon/types'
import { classNameIf, classNames } from '@/lib/utils/deprecated'

import css from './Pokedex.module.css'

export interface PokedexProps {
  className?: string
  pokemon: PokemonEntry[]
  pokemonSearch: PokemonEntrySearchIndex
  useSearch?: boolean
  showForms?: boolean
  showCounts?: boolean
  children?: React.ReactNode

  [key: string]: any
}

export interface PokemonInfoPanelProps {
  className?: string
  children?: undefined
  showShiny?: boolean
  pokemon: PokemonEntry | null
  onCloseBtnClick?: () => void
  onTypeBtnClick?: (type: string) => void
  isOpen: boolean

  [key: string]: any
}

const titleize = (str: string): string => {
  if (!str) return ''
  const parts = str.split('.')
  const last = parts[parts.length - 1]
  return last.replace(/([A-Z])/g, ' $1').replace(/^./, l => l.toUpperCase())
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
          <PkImgFile
            nid={pokemon.nid}
            title={pokemon.name}
            shiny={showShiny === true}
            className={css.pkimg}
            variant="3d"
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
              <TypeIcon typeId={pokemon.type1 as any} size="sm" colored filled />
              {pokemon.type1}
            </span>
          )}
          {pokemon.type2 && (
            <span
              onClick={() => handleTypeClick(pokemon.type2!)}
              className={css.tooltip}
              data-tooltip={titleize(pokemon.type2)}
              data-flow="bottom"
            >
              <TypeIcon typeId={pokemon.type2 as any} size="sm" colored filled />
              {pokemon.type2}
            </span>
          )}
        </div>
        <section>
          <div className={css.title}>Obtainable In</div>
          <div className={css.gameIcons}>
            {pokemon.location.obtainableIn.map((gameSetId: string) => (
              <div
                key={gameSetId}
                className={css.gameset}
                data-tooltip={getGameSetById(gameSetId).name}
                data-flow="bottom"
              >
                {/* <GameLabel gameId={gameSetId} colored rounded size="sm" /> */}
                <span>{gameSetId}</span>
              </div>
            ))}
            {pokemon.location.eventOnlyIn.map((gameSetId: string) => (
              <div
                key={gameSetId}
                className={css.gameset}
                data-tooltip={getGameSetById(gameSetId).name + ' (Event Only)'}
                data-flow="bottom"
              >
                {/* <GameLabel gameId={gameSetId} colored rounded size="xs" /> */}
                <span>{gameSetId}</span>
                <span className={`icon-pkg-pokeball-outlined`} title="Event Only"></span>
              </div>
            ))}
            {pokemon.location.obtainableIn.length + pokemon.location.eventOnlyIn.length === 0 && (
              <b>---</b>
            )}
          </div>
        </section>
        <section>
          <div className={css.title}>Storable In</div>
          <div className={css.gameIcons}>
            {pokemon.location.storableIn.map((gameSetId: string) => (
              <div
                key={gameSetId}
                className={css.gameset}
                data-tooltip={getGameSetById(gameSetId).name}
                data-flow="bottom"
              >
                {/* <GameLabel gameId={gameSetId} colored rounded size="xs" /> */}
                <span>{gameSetId}</span>
              </div>
            ))}
            {pokemon.location.storableIn.length === 0 && <b>---</b>}
          </div>
        </section>
        <section>
          <div className={css.title}>External Links</div>
          <div className={css.gameIcons + ` ${css.externalLinks}`}>
            <ExternLink href={`https://www.serebii.net/pokemon/${pokemon.refs.serebii}`}>
              <Image
                src={'/assets/brands/serebii.png'}
                width={40}
                height={40}
                alt="serebii.net"
                title="serebii.net"
              />
            </ExternLink>
            <ExternLink
              href={`https://bulbapedia.bulbagarden.net/wiki/${pokemon.refs.bulbapedia}_(Pokémon)`}
            >
              <Image
                src={'/assets/brands/bulbapedia.png'}
                width={40}
                height={40}
                alt="bulbapedia.bulbagarden.net"
                title="bulbapedia.bulbagarden.net"
              />
            </ExternLink>
            <ExternLink href={`https://www.smogon.com/dex/sv/pokemon/${pokemon.refs.smogon}`}>
              <Image
                src={'/assets/brands/smogon.png'}
                width={40}
                height={40}
                alt="smogon.com"
                title="smogon.com"
              />
            </ExternLink>
          </div>
        </section>
      </div>
    </div>
  )
}

interface PokedexState {
  infoPanelOpen: boolean
  selectedPkmId: string | null | undefined
  search?: string | null
  showForms: boolean
  currentPage: number
  perPage: number
}

type PkmEntryMap = {
  [key: string]: PokemonEntry
}

export const Pokedex = ({
  className,
  children,
  pokemon,
  pokemonSearch,
  showShiny,
  showForms = false,
  showCounts = true,
  useSearch = true,
  perPage = 24,
  ...rest
}: PokedexProps) => {
  const initialPerpage = perPage

  const loadMoreRef = useRef(null)
  const [state, setState] = useState<PokedexState>({
    infoPanelOpen: false,
    selectedPkmId: null,
    search: null,
    showForms: showForms === true,
    currentPage: 0,
    perPage: initialPerpage,
  })
  const pokemonList = Array.from(pokemon.values())

  const handleLoadMore = (): void => {
    setState({
      ...state,
      perPage: Math.min(state.perPage + initialPerpage, searchablePokemon.length),
    })
  }

  useEffect(() => {
    if (!loadMoreRef.current || !IntersectionObserver) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        //setIsIntersecting(entry.isIntersecting)
        if (entry.isIntersecting) {
          handleLoadMore()
        }
      },
      { rootMargin: '50px' }
    )
    observer.observe(loadMoreRef.current)
    return () => observer.disconnect()
  }, [state.perPage, state.search, state.showForms, state.currentPage])

  let speciesCount = 0
  let formsCount = 0
  const searchablePokemon: PokemonEntry[] = pokemonList.map((pkm: PokemonEntry) => {
    if (pkm.form.isForm) {
      formsCount++
    } else {
      speciesCount++
    }

    let pkName = pkm.name

    if (pkm.form.isFemaleForm) {
      pkName = pkName.replace(/(\(female\)|female)/gi, '♀')
    }

    if (pkm.form.isMaleForm) {
      pkName = pkName + ' ♂'
    }
    return { ...pkm, name: pkName }
  })

  const pokemonById: PkmEntryMap = searchablePokemon.reduce((prev, pkm) => {
    prev[pkm.id] = pkm
    return prev
  }, {} as PkmEntryMap)

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
      currentPage: 0,
      perPage: initialPerpage,
    })
  }

  const searchByType = (type: string): void => {
    setState({
      ...state,
      infoPanelOpen: false,
      search: 'type:' + type,
      currentPage: 0,
      perPage: initialPerpage,
    })
  }

  let shownSpeciesCount = 0
  let shownFormsCount = 0

  let searchValue = state.search ? state.search.toLowerCase() : ''
  if (searchValue.length >= 1 && searchValue.length < 3) {
    searchValue = ''
  }
  const searchResults = pokemonSearch.search(searchValue)

  const filteredPokemon = searchablePokemon.filter(pk => {
    if (searchValue.length === 0) {
      return true
    }
    return searchResults.has(pk.id)
  })

  const filteredPokemonFormAware = filteredPokemon.filter(pk => state.showForms || !pk.form.isForm)

  const startIndex = state.currentPage * state.perPage
  const hasMorePokemon = state.perPage < filteredPokemonFormAware.length
  const renderablePokemon = filteredPokemonFormAware.slice(startIndex, startIndex + state.perPage)

  filteredPokemon.forEach(pkm => {
    // update counters
    if (pkm.form.isForm) {
      shownFormsCount++
    } else {
      shownSpeciesCount++
    }
  })

  const pokemonCells = renderablePokemon.map((pkm, index) => {
    return (
      <div
        key={pkm.id + '_' + index}
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
        <PkImgFile
          nid={pkm.nid}
          title={pkm.name}
          shiny={showShiny === true}
          className={css.pkimg}
          variant="3d"
        />
        {pkm.form.isFemaleForm && <span className={'female-symbol ' + css.femaleIcon}>{'♀'}</span>}
        {pkm.form.isMaleForm && <span className={'male-symbol ' + css.maleIcon}>{'♂'}</span>}
      </div>
    )
  })

  const headerContent = (
    <div className={'text-center ' + css.docTop}>
      <h2 className="main-title-outlined ">
        <i className="icon-books" /> National Pokédex <small className={css.betaLabel} />
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
          including prefixes like <code>num:</code>, <code>name:</code>, <code>color:</code> and{' '}
          <code>type:</code>. If you type for example, just "ice" it will match everything,
          including "Jellicent". You can also enter different criteria, separated by space (in that
          case it will search using an OR condition).
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
                Showing {shownSpeciesCount} species
                {state.showForms ? `, and ${shownFormsCount} forms` : ', excluding forms'}
              </span>
            )}
            <Button
              className={css.btn}
              onClick={() => setState({ ...state, showForms: !state.showForms })}
            >
              {!state.showForms && (
                <span>
                  <i className="icon-eye" /> Show {shownFormsCount} Forms
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

  const loadMoreBtn = hasMorePokemon ? (
    <div className={css.loadMoreBtnCell}>
      <div className="text-center" ref={loadMoreRef}>
        <Button onClick={handleLoadMore}>Load More</Button>
      </div>
    </div>
  ) : null

  return (
    <div className={classNames(css.dexApp, className)}>
      {children ? children : headerContent}
      {useSearch && searchContainer}

      <div className={classes} {...rest}>
        <div className={css.grid}>
          {pokemonCells}
          {loadMoreBtn}
        </div>
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
