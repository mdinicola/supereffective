import { HTMLProps } from 'react'

import { classNames } from '@/lib/utils/legacyUtils'

import styles from './TextInput.module.css'

export function TextInput({
  className,
  children,
  ...props
}: HTMLProps<HTMLInputElement> & { children?: React.ReactNode }) {
  return (
    <div className={styles.Root}>
      <input className={classNames(styles.Input, className)} {...props} />
      {children}
    </div>
  )
}
