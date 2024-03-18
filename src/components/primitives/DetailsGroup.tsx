'use client'

import { useEffect, useRef } from 'react'

export default function DetailsGroup({ children, ...rest }: { children: React.ReactNode }): JSX.Element {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }
    const summaries = ref.current?.querySelectorAll('details > summary')
    if (!summaries) {
      return
    }
    function closeOpenedDetails() {
      for (const summary of summaries) {
        const detail = summary.parentNode as HTMLDetailsElement | null
        if (detail && detail !== ref.current?.parentNode) {
          detail.removeAttribute('open')
        }
      }
    }
    for (const summary of summaries) {
      summary.addEventListener('click', closeOpenedDetails)
    }

    return () => {
      for (const summary of summaries) {
        summary.removeEventListener('click', closeOpenedDetails)
      }
    }
  })

  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  )
}
