import Link from 'next/link'

import ConnectPatreonBtn from '@pkg/patreon/lib/components/ConnectPatreonBtn'

import config from '#/config'
import { classNameIf, classNames } from '#/utils/legacyUtils'

import styles from './Button.module.css'
import stylesCtrl from './Control.module.css'

export default function Button({ className, inverted, ...props }: any) {
  return (
    <button
      className={classNames(
        styles.btn,
        stylesCtrl.ctrl,
        classNameIf(inverted, stylesCtrl.inverted),
        className
      )}
      {...props}
    >
      {props.children}
    </button>
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

export function PatreonButton({ className }: any) {
  return (
    <ConnectPatreonBtn
      className={classNames(styles.btn, stylesCtrl.ctrl, className)}
      style={{ backgroundColor: '#ff424d', color: '#111', borderColor: '#141661' }}
      clientId={config.patreon.clientId}
      redirectUri={config.patreon.oauthRedirectUrl}
    />
  )
}
