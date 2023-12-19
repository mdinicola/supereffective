import { HTMLProps } from 'react'

import { Routes } from '@/config/routes'
import Button from '@/lib/components/legacy/Button/Button'
import { TextInput } from '@/lib/components/legacy/Input/TextInput'

type EmailSigninViewProps = {
  csrfToken: string | null
  email?: string | undefined
  firebaseUserId?: string | undefined
  buttonText?: string
} & HTMLProps<HTMLInputElement>

export default function EmailSigninView({
  csrfToken,
  email,
  firebaseUserId,
  buttonText = 'Sign In with Email',
  ...rest
}: EmailSigninViewProps) {
  const action = `${Routes.API.SignIn}?firebaseUserId=${firebaseUserId || ''}`

  return (
    <form method="post" action={action}>
      <input name="csrfToken" type="hidden" defaultValue={csrfToken || undefined} />
      <input name="firebaseUserId" type="hidden" defaultValue={firebaseUserId || undefined} />
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
