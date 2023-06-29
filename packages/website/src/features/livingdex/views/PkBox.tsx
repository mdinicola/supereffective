import { ReactElement, useState } from 'react'

import {
  DexBox,
  LoadedDex,
  NullableDexPokemon,
} from '@pkg/database/repositories/living-dexes/legacy/types'
import { getPokemonEntry } from '@pkg/database/repositories/pokemon'

import legacyConfig from '#/config/legacyConfig'
import PkImgFile from '#/features/livingdex/views/PkImgFile'
import Button from '#/primitives/legacy/Button/Button'
import InlineTextEditor from '#/primitives/legacy/Input/InlineTextEditor'
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

interface PkBoxGroupProps {
  dex: LoadedDex
  selectMode: SelectMode
  showNonShiny: boolean
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
        <div className={styles.pkBoxHeaderTitle}>
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
    classNameIf(props.revealPokemon, styles.reveal)
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

export function PkBoxGroup(props: PkBoxGroupProps) {
  let initialPerPage = props.perPage || 1

  if (props.viewMode === 'listed' || props.dex.boxes.length <= 2) {
    initialPerPage = Math.max(initialPerPage * initialPerPage, 100)
  }

  const [perPage, setPerPage] = useState(initialPerPage)

  const { dex, usePixelIcons } = props
  let boxElements: ReactElement[] = []
  let shinyBoxElements: ReactElement[] = []
  const initialTabIndex = 1

  dex.boxes.forEach((box, boxIndex) => {
    let boxCells: any[] = []
    const boxTabIndex = props.selectMode === 'box' ? initialTabIndex + boxIndex : undefined

    box.pokemon.forEach((cellPkm, cellIndex) => {
      let cellTabIndex: number | undefined =
        initialTabIndex +
        dex.boxes.length +
        boxIndex * legacyConfig.limits.maxPokemonPerBox +
        cellIndex

      if (props.selectMode === 'box') {
        cellTabIndex = undefined
      }

      if (cellPkm === null) {
        //  || (cellPkm.shiny && cellPkm.shinyBase)
        boxCells.push(
          <PkBoxEmptyCell
            boxIndex={boxIndex}
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
          boxIndex={boxIndex}
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

    ;(box.shiny ? shinyBoxElements : boxElements).push(
      <PkBox
        boxIndex={boxIndex}
        key={boxIndex + `${box.shiny ? '-shiny' : '-regular'}`}
        boxData={box}
        // editable={props.editable}
        editable={false} // disabled for now
        shiny={box.shiny}
        onBoxTitleEdit={props.onBoxTitleEdit}
        viewMode={props.viewMode}
        selectMode={props.selectMode}
        tabIndex={boxTabIndex}
        title={box.title || `[Box ${boxIndex + 1}]`}
        onClick={props.onBoxClick}
      >
        {boxCells}
      </PkBox>
    )
  })

  const totalBoxCount = props.showShiny ? shinyBoxElements.length : boxElements.length
  const pagedBoxElements = (props.showShiny ? shinyBoxElements : boxElements).slice(0, perPage)
  const hasMoreBoxes = perPage < totalBoxCount

  const handleLoadMore = (): void => {
    setPerPage(Math.min(perPage + initialPerPage, totalBoxCount))
  }

  // const handleLoadAll = (): void => {
  //   setPerPage(totalBoxCount)
  // }

  const loadMoreBtn = hasMoreBoxes ? (
    <div key="load-more-btn" className={styles.loadMoreBtnCell}>
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
              {loadMoreBtn}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
