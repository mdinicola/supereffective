'use client'

import Button from '@/components/primitives/Button'
import { RefreshCwIcon } from 'lucide-react'

export function RefreshButton() {
  return (
    <Button
      title="Reload Page"
      color="transparent"
      onPress={() => {
        window.location.reload()
      }}
    >
      <RefreshCwIcon size={24} />
    </Button>
  )
}
