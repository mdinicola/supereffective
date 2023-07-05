import DefaultLayout from '@/components/layouts/DefaultLayout'
import Button from '@/components/primitives/Button'
import { css } from '@/styled-system/css'

export default function Page() {
  return (
    <DefaultLayout menuTitle={'/ UI'}>
      <div>
        <h2 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>Buttons</h2>
        <h3 className={css({ fontSize: 'lg', fontWeight: 'bold', mt: 4 })}>Colors</h3>
        <div className={css({})}>
          <Button variant={{ color: 'black' }}>Inverted</Button>
          <Button variant={{ color: 'green' }}>Green</Button>
          <Button variant={{ color: 'blue' }}>Blue</Button>
          <Button variant={{ color: 'red' }}>Red</Button>
          <Button variant={{ color: 'yellow' }}>Yellow</Button>
          <Button variant={{ color: 'gold' }}>Gold</Button>
          <Button variant={{ color: 'orange' }}>Orange</Button>
          <Button variant={{ color: 'pink' }}>Pink</Button>
          <Button variant={{ color: 'purple' }}>Purple</Button>
          <Button variant={{ color: 'teal' }}>Teal</Button>
          <Button variant={{ color: 'brown' }}>Brown</Button>
          <h3 className={css({ fontSize: 'lg', fontWeight: 'bold', mt: 4 })}>Sizes</h3>
          <Button variant={{ size: 'sm' }}>sm</Button>
          <Button>md</Button>
          <Button variant={{ size: 'lg' }}>lg</Button>
          <Button variant={{ size: 'xl' }}>xl</Button>
        </div>
        <br />
        <h2 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>Inputs</h2>
      </div>
    </DefaultLayout>
  )
}
