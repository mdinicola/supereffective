import React from 'react'

import Main from '@/components/layout/Main'
import Prose from '@/components/layout/Prose'
import Menu from '@/components/navigation/Menu'

export default function Home(): React.ReactElement {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <>
      <Menu />
      <Main>
        <Prose />
      </Main>
    </>
  )
}
