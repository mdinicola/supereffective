import React, { useEffect, useState } from 'react'
import stylesCtrl from './Control.module.css'
import styles from './Toggle.module.css'

interface ToggleProps {
  disabled?: boolean
  defaultChecked?: boolean
  className?: string
  onChange?: Function
  onLabel?: string
  offLabel?: string
}

export default function Toggle(props: ToggleProps) {
  const [toggle, setToggle] = useState(false)
  const { defaultChecked, onChange, disabled, className, onLabel, offLabel } = props

  useEffect(() => {
    if (defaultChecked) {
      setToggle(defaultChecked)
    }
  }, [defaultChecked])

  const triggerToggle = () => {
    if (disabled) {
      return
    }

    setToggle(!toggle)

    if (typeof onChange === 'function') {
      onChange(!toggle)
    }
  }

  let _onLabel = onLabel || 'ON'
  let _offLabel = offLabel || 'OFF'

  const toggleClasses = styles.toggle + ' ' + (toggle ? styles.checked : styles.unchecked)
  const disabledClasses = ' ' + (disabled ? stylesCtrl.disabled : '')

  return (
    <div onClick={triggerToggle} className={toggleClasses}>
      <div className={styles.toggleContainer + ' ' + stylesCtrl.ctrl + disabledClasses}>
        <div className={styles.toggleLabel + ' ' + (toggle ? styles.toggleOn : styles.toggleOff)}>
          {toggle ? _onLabel : _offLabel}
        </div>
      </div>
      <div className={styles.toggleCircle} />
      <input type="checkbox" defaultChecked={toggle} className={styles.toggleInput} />
    </div>
  )
}
