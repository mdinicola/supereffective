import type { AppProps } from 'next/app'

import { LivingDexProvider } from '@/features/livingdex/state/LivingDexContext'
import { LivingDexListProvider } from '@/features/livingdex/state/LivingDexListContext'
import { CompositeAuthProvider } from '@/lib/auth/state/AuthProvider'

import ErrorBoundary from './layouts/ErrorBoundary'
import PageSkeleton from './layouts/LegacyLayout/PageSkeleton'
import { PWAServiceWorker } from './layouts/LegacyLayout/PWAServiceWorker'
import { SimpleAnalytics } from './layouts/SimpleAnalytics'

function LegacyApp({ Component, pageProps }: AppProps | any) {
  return (
    <CompositeAuthProvider>
      <LivingDexListProvider>
        <LivingDexProvider>
          <ErrorBoundary>
            <PageSkeleton>
              <Component {...pageProps} />
            </PageSkeleton>
            <SimpleAnalytics />
            <PWAServiceWorker disabled />
          </ErrorBoundary>
        </LivingDexProvider>
      </LivingDexListProvider>
    </CompositeAuthProvider>
  )
}

export default LegacyApp
