import React from 'react'

import { getLocationHash } from '#/utils/legacyUtils'

export const useScrollToLocation = () => {
  const scrolledRef = React.useRef(false)
  let hash = getLocationHash()
  const hashRef = React.useRef(hash)

  React.useEffect(() => {
    if (!hash) {
      return
    }
    // We want to reset if the hash has changed
    if (hashRef.current !== hash) {
      hashRef.current = hash
      scrolledRef.current = false
    }

    // only attempt to scroll if we haven't yet (this could have just reset above if hash changed)
    //if (!scrolledRef.current) {
    const id = hash.replace('#', '')
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      })
      scrolledRef.current = true
    }
    //}
  })
}
