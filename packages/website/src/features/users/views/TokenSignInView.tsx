import { HTMLProps } from 'react'

import { getFullUrl } from '@pkg/utils/lib/nextjs/urls'

import { Routes } from '#/config/routes'
import Button from '#/primitives/legacy/Button/Button'
import { TextInput } from '#/primitives/legacy/Input/TextInput'

type EmailSigninViewProps = {
  csrfToken: string | null
  buttonText?: string
} & HTMLProps<HTMLInputElement>

export default function TokenSignInView({
  csrfToken,
  buttonText = 'Sign In with Email and Token',
  ...rest
}: EmailSigninViewProps) {
  const loginUrl = getFullUrl(Routes.Login)

  return (
    <form
      method="get"
      action={Routes.API.SignInCallback}
      encType="application/x-www-form-urlencoded"
    >
      <input name="callbackUrl" type="hidden" defaultValue={loginUrl} />
      <input name="csrfToken" type="hidden" defaultValue={csrfToken || undefined} />
      <TextInput
        type="email"
        id="email"
        required
        name="email"
        placeholder={'Email address'}
        {...rest}
      />

      <TextInput
        type="text"
        id="token"
        required
        name="token"
        placeholder={'Verification token'}
        {...rest}
      />
      <Button type="submit">{buttonText}</Button>
    </form>
  )
}
