'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export const usePathChangeEvent = (onChange: (prev: string, current: string) => void) => {
  const pathname = usePathname()
  const savedPathNameRef = useRef(pathname)

  useEffect(() => {
    if (savedPathNameRef.current !== pathname) {
      onChange(savedPathNameRef.current, pathname)
      savedPathNameRef.current = pathname
    }
  }, [pathname, onChange])
}
