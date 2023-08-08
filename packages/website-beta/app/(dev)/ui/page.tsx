import Button from '@/components/primitives/Button'
import TextAreaField from '@/components/primitives/TextAreaField'
import TextField from '@/components/primitives/TextField'
import { css } from '@/styled-system/css'

export default function Page() {
  return (
    <div className={css({ p: 3 })}>
      <h2 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>Buttons</h2>
      <h3 className={css({ fontSize: 'lg', fontWeight: 'bold', mt: 4 })}>Colors</h3>
      <div className={css({})}>
        <Button color="black">Inverted</Button>
        <Button color="green">Green</Button>
        <Button color="blue">Blue</Button>
        <Button color="red">Red</Button>
        <Button color="yellow">Yellow</Button>
        <Button color="gold">Gold</Button>
        <Button color="orange">Orange</Button>
        <Button color="pink">Pink</Button>
        <Button color="purple">Purple</Button>
        <Button color="teal">Teal</Button>
        <Button color="brown">Brown</Button>
        <h3 className={css({ fontSize: 'lg', fontWeight: 'bold', mt: 4 })}>Sizes</h3>
        <Button size="sm">sm</Button>
        <Button>md</Button>
        <Button size="lg">lg</Button>
        <Button size="xl">xl</Button>
      </div>
      <br />
      <h2 className={css({ fontSize: '2xl', fontWeight: 'bold', mb: 4 })}>Inputs</h2>
      <div className={css({ display: 'flex', gap: 6, flexDir: 'column' })}>
        <TextField
          value="Hello world"
          label="Example input"
          description="This is an example description"
          errorMessage="This is an error"
        />
        <TextAreaField
          value="Hello world"
          label="Example textarea"
          description="This is an example description"
          errorMessage="This is an error"
        />
      </div>
    </div>
  )
}
