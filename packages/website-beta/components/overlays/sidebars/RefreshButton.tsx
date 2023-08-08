'use client'

import { RefreshCwIcon } from 'lucide-react'

import Button from '@/components/primitives/Button'

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
