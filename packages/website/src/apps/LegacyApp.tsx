import type { AppProps } from 'next/app'

import { CompositeAuthProvider } from '@pkg/auth/lib/state/AuthProvider'

import { LivingDexProvider } from '#/features/livingdex/state/LivingDexContext'
import { LivingDexListProvider } from '#/features/livingdex/state/LivingDexListContext'
import PageSkeleton from '#/layouts/LegacyLayout/PageSkeleton'
import { SimpleAnalytics } from '#/layouts/SimpleAnalytics'

function LegacyApp({ Component, pageProps }: AppProps | any) {
  return (
    <>
      <CompositeAuthProvider>
        <LivingDexListProvider>
          <LivingDexProvider>
            <PageSkeleton>
              <Component {...pageProps} />
            </PageSkeleton>
          </LivingDexProvider>
        </LivingDexListProvider>
      </CompositeAuthProvider>
      <SimpleAnalytics />
    </>
  )
}

export default LegacyApp
