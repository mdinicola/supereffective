import React from 'react'

import Main from '@/components/layout/Main'
import Prose from '@/components/layout/Prose'
import { NavBar } from '@/components/navigation/NavBar'

export default function Home(): React.ReactElement {
  return (
    <>
      <NavBar />
      <Main>
        <Prose />
      </Main>
    </>
  )
}
