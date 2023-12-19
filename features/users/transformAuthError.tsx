import React from 'react'

export function transformAuthError(err: Error | any): React.ReactNode {
  console.warn('Auth failed', { err })

  const errStr = err.code + err.message + err.toString()
  if (errStr.includes('auth/account-exists-with-different-credential')) {
    const _email = err.customData?.email ? `: "${err.customData.email}"` : ''
    const _providers = err.customData?._tokenResponse?.verifiedProvider
    const _provider = Array.isArray(_providers) && _providers.length > 0 ? _providers[0] : null
    return (
      <p>
        ⚠ This account already exists with a different provider.
        <br />
        <br />
        It seems you already have an account using the same email address{_email}, but with a
        different auth provider:{' '}
        <code style={{ background: '#d7d7d7', color: '#000' }}>{_provider}</code>.
        <br />
        <br />
        Please sign in with that provider instead.
      </p>
    )
  }
  if (errStr.includes('auth/invalid-credential')) {
    return 'Invalid credential. Please reload the page and try again.'
  }
  if (errStr.includes('auth/user-disabled')) {
    return 'This account has been disabled.'
  }
  return err.message
}
