import { LivingDexProvider } from '@/features/livingdex/state/LivingDexContext'
import { LivingDexListProvider } from '@/features/livingdex/state/LivingDexListContext'
import { CompositeAuthProvider } from '@/lib/auth/state/AuthProvider'

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <CompositeAuthProvider>
      <LivingDexListProvider>
        <LivingDexProvider>{children}</LivingDexProvider>
      </LivingDexListProvider>
    </CompositeAuthProvider>
  )
}

export default AppProviders
