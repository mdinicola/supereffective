import { classNameIf, classNames } from '@/lib/utils/legacyUtils'

import { tabIndexKeyDownHandler } from '../utils'
import styles from './PkBox.module.css'
import { PkBoxCellProps } from './pkBoxTypes'

export function PkBoxCell(props: PkBoxCellProps) {
  const classes = classNames(
    styles.pkBoxCell,
    props.className,
    classNameIf(props.revealPokemon, styles.reveal),
    classNameIf(!!props.pokemonData?.matchesFilter, styles.filterMatch)
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
        tabIndexKeyDownHandler(
          styles.pkBoxCell,
          props.viewMode === 'boxed' ? 6 : 1,
          1,
          clickHandler,
          e
        )
      }
      className={classes}
    >
      <div className={styles.pkBoxCellContent}>{props.children}</div>
    </div>
  )
}
