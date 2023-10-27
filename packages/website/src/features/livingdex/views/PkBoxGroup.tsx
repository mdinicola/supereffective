import { ReactElement, useEffect, useRef, useState } from 'react'

import { getGameSetByGameId } from '@pkg/database/repositories/game-sets'
import { createBoxTitle } from '@pkg/database/repositories/living-dexes/legacy/presets/createBoxTitle'
import {
  DexBox,
  DexPokemonList,
  LoadedDex,
  NullableDexPokemon,
  PkFilter,
} from '@pkg/database/repositories/living-dexes/legacy/types'
import { getPokemonEntry } from '@pkg/database/repositories/pokemon'
import { slugify } from '@pkg/utils/lib/primitives/strings'

import legacyConfig from '#/config/legacyConfig'
import Button from '#/primitives/legacy/Button/Button'
import { classNames } from '#/utils/legacyUtils'

import { PkBox } from './PkBox'
import styles from './PkBox.module.css'
import { PkBoxCell } from './PkBoxCell'
import { PkBoxEmptyCell } from './PkBoxEmptyCell'
import { PkBoxGroupFilter } from './PkBoxGroupFilter'
import { PkBoxGroupProps, PkBoxGroupState } from './pkBoxTypes'
import PkImgFile from './PkImgFile'

// Goes through a box and marks individual pokemon that match the given filter
function modifyFilteredBox(box: DexBox, unfilteredIndex: number, filter: PkFilter): DexBox {
  const updatedPokemon: DexPokemonList = box.pokemon.map(currentPokemon => {
    const matchesFilter = pokemonMatcher(filter, currentPokemon)
    return currentPokemon ? { ...currentPokemon, matchesFilter } : null
  })

  return { ...box, unfilteredIndex, pokemon: updatedPokemon }
}

// Reduces the list of boxes down to only those that contains a match
function boxReducer(
  filter: PkFilter,
  boxList: DexBox[],
  currentBox: DexBox,
  unfilteredIndex: number
): DexBox[] {
  const { pokemon } = currentBox

  // Look for a match within the box
  const foundMatch = !!pokemon.find(pokemonMatcher.bind(null, filter))

  // If there was a match, mark the matching pokemon and add it to the list
  return foundMatch ? [...boxList, modifyFilteredBox(currentBox, unfilteredIndex, filter)] : boxList
}

// Normalizes strings to be compared for filtering
function normalizeFilterData(string: string): string {
  return slugify(string.trim()).replace(/-/g, '')
}

// Compares a pokemon to a filter and indicates whether there is a match
function pokemonMatcher(filter: PkFilter, currentPokemon: NullableDexPokemon): boolean {
  if (!currentPokemon) {
    return false
  }

  const { attribute = 'pid', query } = filter
  const pokemonAttribute = currentPokemon[attribute] ?? ''
  const pokemonAttributeSlug = normalizeFilterData(pokemonAttribute)
  const querySlug = normalizeFilterData(query)

  return pokemonAttributeSlug.includes(querySlug)
}

// Reduces the boxes within the dex to only those that contain a pokemon matching the query
function createFilteredDex(dex: LoadedDex, filter: PkFilter): LoadedDex {
  const { boxes } = dex

  const filteredBoxes = boxes.reduce(boxReducer.bind(null, filter), [])
  return { ...dex, boxes: filteredBoxes }
}

export function PkBoxGroup(props: PkBoxGroupProps) {
  let initialPerPage = props.perPage || 1
  const loadMoreRef = useRef(null)
  const [state, setState] = useState<PkBoxGroupState>({
    filter: null,
  })

  const filteredDex = state.filter ? createFilteredDex(props.dex, state.filter) : props.dex

  if (props.viewMode === 'listed' || filteredDex.boxes.length <= 2) {
    initialPerPage = 10
  }

  const [perPage, setPerPage] = useState(initialPerPage)

  const handleLoadMore = (): void => {
    setPerPage(Math.min(perPage + initialPerPage, totalBoxCount))
    // setIsIntersecting(false)
  }

  // Sets the new filter state
  const handleBoxFilter = (filter: PkFilter): void => {
    setState({ filter })
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
      { rootMargin: '100px' }
    )
    observer.observe(loadMoreRef.current)
    return () => observer.disconnect()
  }, [perPage])

  const { usePixelIcons } = props
  let boxElements: ReactElement[] = []
  let shinyBoxElements: ReactElement[] = []
  const initialTabIndex = 1

  filteredDex.boxes.forEach((box, boxIndex) => {
    let boxCells: any[] = []
    const unfilteredBoxIndex = box.unfilteredIndex || boxIndex
    const boxTabIndex = props.selectMode === 'box' ? initialTabIndex + boxIndex : undefined

    box.pokemon.forEach((cellPkm, cellIndex) => {
      let cellTabIndex: number | undefined =
        initialTabIndex +
        filteredDex.boxes.length +
        boxIndex * legacyConfig.limits.maxPokemonPerBox +
        cellIndex

      if (props.selectMode === 'box') {
        cellTabIndex = undefined
      }

      if (cellPkm === null) {
        //  || (cellPkm.shiny && cellPkm.shinyBase)
        boxCells.push(
          <PkBoxEmptyCell
            boxIndex={unfilteredBoxIndex}
            pokemonIndex={cellIndex}
            tabIndex={cellTabIndex}
            pokemonData={cellPkm}
            revealPokemon={props.revealPokemon}
            viewMode={props.viewMode}
            selectMode={props.selectMode}
            usePixelIcons={usePixelIcons}
            key={`placeholder-${boxIndex}-${cellIndex}`}
          />
        )
        return
      }

      let slug = cellPkm.pid
      let pkmEntry = getPokemonEntry(slug)
      let title = pkmEntry.name
      let isSpecialAbilityPkm = false
      let isHiddenAbilityPkm = false // TODO support in future

      if (slug.includes('--')) {
        isSpecialAbilityPkm = true
      }

      let classes = classNames(
        'pkBox-cell',
        cellPkm.caught ? styles.caught : styles.uncaught,
        cellPkm.shiny ? styles.shiny : '',
        cellPkm.shinyLocked ? styles.shinyLocked : '',
        cellPkm.shinyBase !== null ? styles.hasShinyBase : ''
      )

      if (pkmEntry.form.isGmax) {
        title += ' Gigantamax'
      }

      if (cellPkm.shiny && cellPkm.shinyBase) {
        title += ', same color as ' + getPokemonEntry(cellPkm.shinyBase).name
      }

      if (cellPkm.shiny && cellPkm.shinyLocked) {
        title += ' (Shiny Not Available)'
      }

      boxCells.push(
        <PkBoxCell
          boxIndex={unfilteredBoxIndex}
          pokemonIndex={cellIndex}
          tabIndex={cellTabIndex}
          pokemonData={cellPkm}
          key={`${slug}-${boxIndex}-${cellIndex}`}
          viewMode={props.viewMode}
          selectMode={props.selectMode}
          revealPokemon={props.revealPokemon}
          onClick={props.onPokemonClick}
          className={classes}
        >
          <PkImgFile
            nid={cellPkm.nid}
            title={title}
            shiny={cellPkm.shiny}
            variant={usePixelIcons ? 'pixelart' : '3d'}
          />
          <span className={styles.pkBoxCellLabel}>{title}</span>
          {props.markTypes.includes('catch') && (
            <>
              <i
                className={[styles.ballIcon, styles.ballIconCaught, 'icon-pkg-pokeball'].join(' ')}
              >
                <i className={[styles.subIcon, 'icon-pkg-pokeball-outlined'].join(' ')} />
              </i>
              <i
                className={[
                  styles.ballIcon,
                  styles.ballIconUncaught,
                  'icon-pkg-pokeball-outlined',
                ].join(' ')}
              />
            </>
          )}
          {cellPkm.shiny && props.markTypes.includes('shiny') && (
            <i className={styles.shinyIcon + ' icon-pkg-shiny'} />
          )}
          {cellPkm.gmax && props.markTypes.includes('gmax') && (
            <i className={styles.gmaxIcon + ' icon-pkg-dynamax'} />
          )}
          {cellPkm.alpha && props.markTypes.includes('alpha') && (
            <i className={styles.alphaIcon + ' icon-pkg-wild'} />
          )}
          {isSpecialAbilityPkm && props.markTypes.includes('ability') && (
            <i className={styles.abilityIcon}>SA</i>
          )}
          {isHiddenAbilityPkm && props.markTypes.includes('ability') && (
            <i className={styles.abilityIcon}>HA</i>
          )}
        </PkBoxCell>
      )
    })

    if (props.viewMode === 'listed') {
      ;(box.shiny ? shinyBoxElements : boxElements).push(...boxCells)
      return
    }

    const nextIdx = (box.shiny ? shinyBoxElements : boxElements).length + 1
    const boxTitle = createBoxTitle(props.dex.gameSetId, box.title, nextIdx)
    const isOverflowing = nextIdx > getGameSetByGameId(props.dex.gameId).storage.boxes

    ;(box.shiny ? shinyBoxElements : boxElements).push(
      <PkBox
        boxIndex={boxIndex}
        key={boxIndex + `${box.shiny ? '-shiny' : '-regular'}`}
        boxData={box}
        // editable={props.editable}
        editable={false} // disabled for now
        shiny={box.shiny}
        isOverflowing={isOverflowing}
        onBoxTitleEdit={props.onBoxTitleEdit}
        viewMode={props.viewMode}
        selectMode={props.selectMode}
        tabIndex={boxTabIndex}
        // title={box.title || `[Box ${boxIndex + 1}]`}
        title={boxTitle}
        onClick={props.onBoxClick}
      >
        {boxCells}
      </PkBox>
    )
  })

  const totalBoxCount = props.showShiny ? shinyBoxElements.length : boxElements.length
  const pagedBoxElements = (props.showShiny ? shinyBoxElements : boxElements).slice(0, perPage)
  const hasMoreBoxes = perPage < totalBoxCount

  // const handleLoadAll = (): void => {
  //   setPerPage(totalBoxCount)
  // }

  const loadMoreBtn = hasMoreBoxes ? (
    <div key="load-more-btn" className={styles.loadMoreBtnCell} ref={loadMoreRef}>
      <div className="text-center">
        <Button onClick={handleLoadMore}>Load More</Button>
        {/* <Button onClick={handleLoadAll}>Load All</Button> */}
      </div>
    </div>
  ) : null

  const classes = classNames(
    styles.pkBoxGroup,
    styles[props.selectMode + 'SelectMode'],
    styles[props.viewMode + 'ViewMode'],
    props.editable ? styles.editable : styles.nonEditable
  )
  return (
    <div className={'pkBoxGroupWr'}>
      {props.showNonShiny && (
        <div className={'pkBoxGroupWr pkBoxGroupWr-regular'}>
          {
            <div className={'text-center pkBoxGroupWr-separator'}>
              <div
                id={'nonshiny'}
                className={styles.separatorTitle + ' pkBoxGroupWr-separator-title'}
              >
                <i className={'icon-pkg-pokeball-outlined'} /> Pokémon{' '}
                <i className={'icon-pkg-pokeball-outlined'} />
              </div>
            </div>
          }
          <PkBoxGroupFilter onChange={handleBoxFilter} />
          <div className={classes}>
            <div
              className={[styles.pkBoxGroupContent, 'pkBoxCount-' + pagedBoxElements.length].join(
                ' '
              )}
            >
              {pagedBoxElements}
              {loadMoreBtn}
            </div>
          </div>
        </div>
      )}
      {props.showShiny && pagedBoxElements.length > 0 && (
        <div className={'pkBoxGroupWr pkBoxGroupWr-shiny'}>
          {
            <div className={'text-center pkBoxGroupWr-separator'}>
              <div id={'shiny'} className={styles.separatorTitle + ' pkBoxGroupWr-separator-title'}>
                <i className={'icon-pkg-shiny'} /> Shiny Pokémon <i className={'icon-pkg-shiny'} />
              </div>
            </div>
          }
          <div className={classes}>
            <div
              className={[styles.pkBoxGroupContent, 'pkBoxCount-' + pagedBoxElements.length].join(
                ' '
              )}
            >
              {pagedBoxElements}
            </div>
          </div>
          {loadMoreBtn}
        </div>
      )}
    </div>
  )
}
