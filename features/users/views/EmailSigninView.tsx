import { HTMLProps } from 'react'

import { Routes } from '@/config/routes'
import Button from '@/lib/components/legacy/Button/Button'
import { TextInput } from '@/lib/components/legacy/Input/TextInput'

type EmailSigninViewProps = {
  csrfToken: string | null
  email?: string | undefined
  buttonText?: string
} & HTMLProps<HTMLInputElement>

export default function EmailSigninView({
  csrfToken,
  email,
  buttonText = 'Sign In with Email',
  ...rest
}: EmailSigninViewProps) {
  const action = `${Routes.API.SignIn}`

  return (
    <form method="post" action={action}>
      <input name="csrfToken" type="hidden" defaultValue={csrfToken || undefined} />
      <TextInput
        type="email"
        id="email"
        required
        name="email"
        placeholder={'Email address'}
        defaultValue={email}
        {...rest}
      >
        <Button type="submit">{buttonText}</Button>
      </TextInput>
    </form>
  )
}
