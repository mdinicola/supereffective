import { UserCredential } from '@firebase/auth'
import React, { ReactNode, useContext, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import { UserContext } from '@app/src/domains/legacy/users/state/UserContext'
import { useConditionalRedirect } from '@app/src/hooks/legacy/useConditionalRedirect'
import { LoadingBanner } from '@app/src/layouts/LegacyLayout/LoadingBanner'
import PageMeta from '@app/src/layouts/LegacyLayout/PageMeta'
import Button from '@app/src/primitives/legacy/Button/Button'
import { abs_url, SiteLink } from '@app/src/primitives/legacy/Link/Links'
import {
  createUserWithEmail,
  loginWithEmail,
  loginWithGithub,
  loginWithGoogle,
  loginWithTwitter,
} from '@app/src/services/legacy/datastore/Firebase'
import tracker from '@app/src/services/legacy/metrics/tracker'
import { debug } from '@app/src/utils/legacyUtils'

const Page = () => {
  const router = useRouter()
  const pageSrc = router.query.s
  const backRoute = router.query.back
  const PAGE_SRC_QR = 'qr'
  const conversionLeadTracked = useRef(false)
  const [formMessage, setFormMessage] = useState<ReactNode>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const appAuth = useContext(UserContext)

  const redirectRoute =
    (typeof backRoute === 'string' ? decodeURIComponent(backRoute) : null) || '/apps/livingdex'

  useConditionalRedirect(
    redirectRoute as string,
    {
      waitIf: appAuth.state.loading,
      redirectIf: !appAuth.state.loading && appAuth.state.user !== null,
      abortRedirectIf: !appAuth.state.loading && appAuth.state.user === null,
    },
    1000
  )

  if (appAuth.state.loading) {
    return <LoadingBanner />
  }

  const isTodayAndSameHour = (someDate: string | null | undefined): boolean => {
    if (!someDate) {
      return false
    }
    const subject = new Date(someDate)
    const today = new Date()
    return (
      subject.getHours() == today.getHours() &&
      subject.getDate() == today.getDate() &&
      subject.getMonth() == today.getMonth() &&
      subject.getFullYear() == today.getFullYear()
    )
  }

  /*
    signIn: Operation involving signing in a user.
    reauthenticate: Operation involving using a provider to reauthenticate an already signed-in user.
    link: Operation involving linking an additional provider to an already signed-in user.
   */
  const trackConversionLead = (user: UserCredential) => {
    if (conversionLeadTracked.current) {
      return
    }
    if (
      pageSrc === PAGE_SRC_QR &&
      user.operationType === 'signIn' &&
      isTodayAndSameHour(user.user.metadata.creationTime)
    ) {
      debug('QR conversion lead detected for new signup', user.user.metadata.creationTime)
      tracker.tshirtQrNewUSer()
      conversionLeadTracked.current = true
    }
  }

  const handleRegisterWithEmail = async () => {
    appAuth.loading()
    await createUserWithEmail(email, password)
      .then(user => {
        tracker.loggedIn(user.user.uid)
        trackConversionLead(user)
      })
      .catch(err => {
        setFormMessage(<div className="error">{err.message}</div>)
      })
  }

  const handleLoginWithEmail = async () => {
    appAuth.loading()
    await loginWithEmail(email, password)
      .then(user => {
        tracker.loggedIn(user.user.uid)
        trackConversionLead(user)
      })
      .catch(err => {
        setFormMessage(<div className="error">{err.message}</div>)
      })
  }
  const handleLoginWithGoogle = async () => {
    appAuth.loading()
    await loginWithGoogle()
      .then(user => {
        tracker.loggedIn(user.user.uid)
        trackConversionLead(user)
      })
      .catch(err => {
        setFormMessage(<div className="error">{err.message}</div>)
      })
  }
  const handleLoginWithTwitter = async () => {
    appAuth.loading()
    await loginWithTwitter()
      .then(user => {
        tracker.loggedIn(user.user.uid)
        trackConversionLead(user)
      })
      .catch(err => {
        setFormMessage(<div className="error">{err.message}</div>)
      })
  }
  const handleLoginWithGithub = async () => {
    appAuth.loading()
    await loginWithGithub()
      .then(user => {
        tracker.loggedIn(user.user.uid)
        trackConversionLead(user)
      })
      .catch(err => {
        setFormMessage(<div className="error">{err.message}</div>)
      })
  }

  const loginForm = (
    <div className={'page-container text-center bordered-container bg-white'}>
      <h2>
        <i className={'icon-user'} /> Sign In
      </h2>
      <p className={'inner-container bg-gr-white-pattern text-left'}>
        When you sign in, you'll be able to save your{' '}
        <b>
          <i className={'icon-pkg-box-home'}></i>Living Pokédex
        </b>{' '}
        progress and use all other upcoming features of the website.
      </p>
      <div className="formGroup">
        {/*<div className="formField">*/}
        {/*  <label>Email</label>*/}
        {/*  <input className="field" type="email" onChange={e => setEmail(e.target.value)} value={email}/>*/}
        {/*</div>*/}
        {/*<div className="formField">*/}
        {/*  <label>Password</label>*/}
        {/*  <input className="field" type="password" onChange={e => setPassword(e.target.value)}*/}
        {/*         value={password}/>*/}
        {/*</div>*/}
        {/*<div className="formMessage">Msg: {formMessage}</div>*/}
        {/*<div className="formButtons">*/}
        {/*  <Button onClick={handleLoginWithEmail}>Login</Button>*/}
        {/*</div>*/}
        {/*<div className="formButtons">*/}
        {/*  <Button onClick={handleRegisterWithEmail}><i className="icon-envelop"></i> Signup with Email</Button>*/}
        {/*</div>*/}
        <div className="formButtons">
          <Button onClick={handleLoginWithGoogle}>
            <i className="icon-user"></i> Sign In with Google
          </Button>
          <Button onClick={handleLoginWithTwitter}>
            <i className="icon-brand-twitter"></i> Sign In with Twitter
          </Button>
          <Button onClick={handleLoginWithGithub}>
            <i className="icon-brand-github"></i> Sign In with Github
          </Button>
        </div>
        <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>
          By signing in, you agree to our{' '}
          <SiteLink href={'/terms-and-conditions'}>
            <b>Terms and Conditions</b>
          </SiteLink>
        </p>
      </div>
    </div>
  )

  return (
    <div className={'page-container'}>
      <PageMeta
        metaTitle={'Sign In - Supereffective.gg'}
        metaDescription={''}
        robots={'noindex, nofollow'}
        canonicalUrl={abs_url('/login')}
        lang={'en'}
      />
      <article className={'page-authored-content'}>
        {appAuth.state.loading ? <LoadingBanner content={'Logging in...'} /> : loginForm}
      </article>
    </div>
  )
}

export default Page
