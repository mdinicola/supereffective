import config from '@/config'
import InlineTextEditor from '@/lib/components/legacy/Input/InlineTextEditor'
import { classNameIf, classNames } from '@/lib/utils/legacyUtils'

import { tabIndexKeyDownHandler } from '../utils'
import styles from './PkBox.module.css'
import { PkBoxProps } from './pkBoxTypes'

// TODO remove tabindex usage (always be = 0) and replace it with a custom data- attribute.

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
              maxLength={config.limits.maxBoxTitleSize}
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
        onKeyDown={e => tabIndexKeyDownHandler(styles.pkBoxContent, 1, 1, clickHandler, e)}
      >
        {props.children}
      </div>
    </div>
  )
}
