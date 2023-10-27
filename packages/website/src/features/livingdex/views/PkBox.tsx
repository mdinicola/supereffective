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
import PkImgFile from '#/features/livingdex/views/PkImgFile'
import Button from '#/primitives/legacy/Button/Button'
import InlineTextEditor from '#/primitives/legacy/Input/InlineTextEditor'
import { TextInput } from '#/primitives/legacy/Input/TextInput'
import { classNameIf, classNames } from '#/utils/legacyUtils'

import styles from './PkBox.module.css'

export type SelectMode = 'all' | 'box' | 'cell'
export type ViewMode = 'boxed' | 'listed'
export type MarkType = 'catch' | 'shiny' | 'alpha' | 'gmax' | 'ability' | 'gender'

// TODO remove tabindex usage (always be = 0) and replace it with a custom data- attribute.

export const gmaxixePid = (pid: string, isGmax: boolean): string => {
  if (!getPokemonEntry(pid).form.hasGmax) {
    return pid
  }
  return isGmax ? pid.replace(/-f$/g, '') + '-gmax' : pid
}

interface PkBoxProps {
  boxIndex: number
  boxData: DexBox
  children: any[]
  tabIndex?: number | undefined
  title: string
  isOverflowing?: boolean
  className?: string
  onClick?: (boxIndex: number, boxData: DexBox) => void
  editable: boolean
  onBoxTitleEdit?: (boxIndex: number, newTitle: string) => void
  selectMode: SelectMode
  viewMode: ViewMode
  shiny: boolean
}

export interface PkBoxCellProps {
  boxIndex: number
  pokemonIndex: number
  pokemonData: NullableDexPokemon
  children?: any
  tabIndex?: number | undefined
  title?: string
  image?: any
  caption?: any
  className?: string
  revealPokemon: boolean
  onClick?: (boxIndex: number, pokemonIndex: number, pokemonData: NullableDexPokemon) => void
  selectMode: SelectMode
  viewMode: ViewMode
}

export interface PkBoxGroupProps {
  dex: LoadedDex
  selectMode: SelectMode
  showNonShiny: boolean
  shinyAfterRegular: boolean
  showShiny: boolean
  viewMode: ViewMode
  usePixelIcons: boolean
  revealPokemon: boolean
  onBoxClick?: (boxIndex: number, boxData: DexBox) => void
  onPokemonClick?: (boxIndex: number, pokemonIndex: number, pokemonData: NullableDexPokemon) => void
  editable: boolean
  onBoxTitleEdit?: (boxIndex: number, newTitle: string) => void
  markTypes: MarkType[]
  perPage: number
}

export interface PkBoxGroupFilterProps {
  onFilter: (filter: PkFilter) => void
}

export interface PkBoxGroupState {
  filter: PkFilter | null
}

const keyDownHandler = (
  classSelector: string,
  verticalOffset = 1,
  horizontalOffset = 1,
  clickHandler: () => void,
  e: any
) => {
  const elemsWithTabindex = document.querySelectorAll(`.${classSelector}[tabindex]`)
  // sort by tabindex
  const spaceKey = 32
  const enterKey = 13
  const upKey = 38
  const downKey = 40
  const leftKey = 37
  const rightKey = 39
  const tabKey = 9
  const escKey = 27

  if (e.keyCode === spaceKey || e.keyCode === enterKey) {
    clickHandler()
    e.preventDefault()
    return false
  }

  if (e.keyCode === escKey && e.target.blur) {
    e.target.blur()
    e.preventDefault()
    return false
  }

  if (
    e.keyCode === tabKey ||
    e.keyCode === upKey ||
    e.keyCode === downKey ||
    e.keyCode === leftKey ||
    e.keyCode === rightKey
  ) {
    const currentIndex = e.target.tabIndex
    if (!currentIndex) return false
    let newIndex = -1

    if (e.keyCode === upKey) {
      newIndex = currentIndex - verticalOffset
    } else if (e.keyCode === downKey) {
      newIndex = currentIndex + verticalOffset
    } else if (e.keyCode === leftKey) {
      newIndex = currentIndex - horizontalOffset
    } else if (e.keyCode === rightKey || e.keyCode === tabKey) {
      newIndex = currentIndex + horizontalOffset
    }

    const nextElement = Array.from<HTMLElement | any>(elemsWithTabindex).find(
      (elem: HTMLElement | any) => elem?.tabIndex === newIndex
    )

    // if focus function exists
    if (nextElement && nextElement.focus) {
      nextElement.focus()
    }
    e.preventDefault()
    return false
  }
}

export function PkBox(props: PkBoxProps) {
  const classes = classNames(
    styles.pkBox,
    styles.pkBoxShiny,
    props.className,
    'pkBox',
    classNameIf(props.shiny, 'pkBox-shiny')
  )

  const clickHandler = () => {
    if (props.onClick) {
      props.onClick(props.boxIndex, props.boxData)
    }
  }

  return (
    <div className={classes}>
      <header className={styles.pkBoxHeader + ' pkBoxHeader'}>
        <div
          className={
            styles.pkBoxHeaderTitle + ' ' + (props.isOverflowing ? styles.overflowingBox : '')
          }
        >
          {!props.editable && props.title}
          {props.editable && (
            <InlineTextEditor
              maxLength={legacyConfig.limits.maxBoxTitleSize}
              className={styles.pkBoxHeaderTitleEditor}
              afterEdit={(value: string) => {
                if (props.onBoxTitleEdit) {
                  props.onBoxTitleEdit(props.boxIndex, value)
                }
              }}
            >
              {props.title.slice(0, 15)}
            </InlineTextEditor>
          )}
          {props.shiny && <i className={'icon-pkg-shiny'} />}
        </div>
      </header>
      <div
        className={styles.pkBoxContent}
        tabIndex={props.tabIndex}
        onClick={clickHandler}
        onKeyDown={e => keyDownHandler(styles.pkBoxContent, 1, 1, clickHandler, e)}
      >
        {props.children}
      </div>
    </div>
  )
}

export function PkBoxCell(props: PkBoxCellProps) {
  const classes = classNames(
    styles.pkBoxCell,
    props.className,
    classNameIf(props.revealPokemon, styles.reveal),
    classNameIf(!!props.pokemonData?.matchesFilter, 'filterMatch')
  )

  const clickHandler = () => {
    if (props.onClick) {
      props.onClick(props.boxIndex, props.pokemonIndex, props.pokemonData)
    }
  }

  return (
    <div
      title={props.title}
      tabIndex={props.tabIndex}
      onClick={clickHandler}
      onKeyDown={e =>
        keyDownHandler(styles.pkBoxCell, props.viewMode === 'boxed' ? 6 : 1, 1, clickHandler, e)
      }
      className={classes}
    >
      <div className={styles.pkBoxCellContent}>{props.children}</div>
    </div>
  )
}

export function PkBoxEmptyCell(props: PkBoxCellProps & { usePixelIcons: boolean }) {
  return (
    <PkBoxCell {...{ ...props, className: styles.pkBoxEmptyCell }}>
      <PkImgFile nid="placeholder" variant="3d" />
    </PkBoxCell>
  )
}

// A simple debounce. Probably not a good spot for this but I didn't know where else to put it
function debounce(fn: Function, delay: number): Function {
  let timer: ReturnType<typeof setTimeout>
  return (filter: PkFilter) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(fn.bind(null, filter), delay)
  }
}

// This is the actual filter component
export function PkBoxGroupFilter(props: PkBoxGroupFilterProps) {
  const FILTER_DEBOUNCE = 300 //milliseconds
  const ATTRIBUTE_MAP = {
    pid: 'name',
    nid: 'number',
  }
  const { onFilter } = props
  const attribute = 'pid' // hard coding this for now but could be dynamic later

  // Debounce our callback that was passed in so we don't call it more than we have to
  const debouncedFilter = debounce(onFilter, FILTER_DEBOUNCE)

  // wrap our debounced callback in a function that extracts the actual useful value out of the event
  // and turns it into a filter object
  const handleFilterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filter: PkFilter = {
      query: e.target.value.toLowerCase(),
      attribute,
    }

    debouncedFilter(filter)
  }

  return (
    <div className={'pkBoxGroupFilter'}>
      <form>
        <TextInput
          type="text"
          name="filter"
          placeholder={`Type in a pokémon's ${ATTRIBUTE_MAP[attribute]}`}
          onChange={handleFilterInput}
        />
      </form>
    </div>
  )
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
    return foundMatch
      ? [...boxList, modifyFilteredBox(currentBox, unfilteredIndex, filter)]
      : boxList
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
          <PkBoxGroupFilter onFilter={handleBoxFilter} />
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
