import Link from 'next/link'

import ConnectPatreonBtn from '@pkg/patreon/lib/components/ConnectPatreonBtn'

import config from '#/config'
import { Routes } from '#/config/routes'
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
export function PatreonUnlinkButton({
  className,
  memberId,
}: {
  className?: string
  memberId: string | null
}) {
  return (
    <form
      method="POST"
      action={Routes.API.PatreonUnlink}
      onSubmit={(e: any) => {
        if (
          !window.confirm(
            'Are you sure you want to unlink your Patreon account? You will lose your Patreon rewards, but your existing data will remain intact.'
          )
        ) {
          e.preventDefault()
          return false
        }
      }}
    >
      <Button
        type="submit"
        name="patreonMemberId"
        value={memberId || ''}
        className={classNames(styles.btn, stylesCtrl.ctrl, className)}
        style={{ color: '#ff424d', background: '#fff', borderColor: '#ff424d', padding: '4px 8px' }}
      >
        Unlink Patreon account
      </Button>
    </form>
  )
}
