import { ComponentPropsWithoutRef, HTMLProps } from 'react'

import { Routes } from '@/v3/config/routes'
import Button from '@/v3/lib/components/Button'
import { TextInput } from '@/v3/lib/components/forms/TextInput'

type EmailSigninViewProps = {
  csrfToken: string | null
  email?: string | undefined
  buttonText?: string
} & ComponentPropsWithoutRef<'input'>

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
