import type { AppProps } from 'next/app'
import { LivingDexProvider } from '#/features/legacy/livingdex/state/LivingDexContext'
import { UserProvider } from '#/features/legacy/users/state/UserContext'
import PageSkeleton from '#/layouts/LegacyLayout/PageSkeleton'

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
