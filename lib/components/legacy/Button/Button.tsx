import Link from 'next/link'

import { classNameIf, classNames } from '@/lib/utils/legacyUtils'

import styles from './Button.module.css'
import stylesCtrl from './Control.module.css'

export default function Button({ className, inverted, outlined, ...props }: any) {
  return (
    <button
      className={classNames(
        styles.btn,
        stylesCtrl.ctrl,
        classNameIf(inverted, stylesCtrl.inverted),
        classNameIf(outlined, stylesCtrl.outlined),
        className
      )}
      {...props}
    >
      {props.children}
    </button>
  )
}

export function ButtonInternalLink({ href, inverted, outlined, className, ...props }: any) {
  return (
    <Link
      href={href}
      className={classNames(
        styles.btn,
        stylesCtrl.ctrl,
        classNameIf(inverted, stylesCtrl.inverted),
        classNameIf(outlined, stylesCtrl.outlined),
        className
      )}
      {...props}
    >
      {props.children}
    </Link>
  )
}

export function ButtonLink({ className, outlined, inverted, ...props }: any) {
  return (
    <a
      className={classNames(
        styles.btn,
        stylesCtrl.ctrl,
        classNameIf(inverted, stylesCtrl.inverted),
        classNameIf(outlined, stylesCtrl.outlined),
        className
      )}
      {...props}
    >
      {props.children}
    </a>
  )
}
