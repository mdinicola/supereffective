import Link from 'next/link'

import { classNameIf, classNames } from '#/utils/legacyUtils'

import styles from './Button.module.css'
import stylesCtrl from './Control.module.css'

export default function Button({ className, inverted, ...props }: any) {
  return (
    <span
      className={classNames(
        styles.btn,
        stylesCtrl.ctrl,
        classNameIf(inverted, stylesCtrl.inverted),
        className
      )}
      {...props}
    >
      {props.children}
    </span>
  )
}

export function ButtonInternalLink({ href, inverted, className, ...props }: any) {
  return (
    <Link
      href={href}
      className={classNames(
        styles.btn,
        stylesCtrl.ctrl,
        classNameIf(inverted, stylesCtrl.inverted),
        className
      )}
      {...props}
    >
      {props.children}
    </Link>
  )
}

export function ButtonLink({ className, inverted, ...props }: any) {
  return (
    <a
      className={classNames(
        styles.btn,
        stylesCtrl.ctrl,
        classNameIf(inverted, stylesCtrl.inverted),
        className
      )}
      {...props}
    >
      {props.children}
    </a>
  )
}
