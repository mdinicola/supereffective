import type { AppProps } from 'next/app'

import { LivingDexProvider } from '@app/src/domains/legacy/livingdex/state/LivingDexContext'
import { UserProvider } from '@app/src/domains/legacy/users/state/UserContext'
import PageSkeleton from '@app/src/layouts/LegacyLayout/PageSkeleton'

function LegacyApp({ Component, pageProps }: AppProps | any) {
  return (
    <UserProvider>
      <LivingDexProvider>
        <PageSkeleton>
          <Component {...pageProps} />
        </PageSkeleton>
      </LivingDexProvider>
    </UserProvider>
  )
}

export default LegacyApp
