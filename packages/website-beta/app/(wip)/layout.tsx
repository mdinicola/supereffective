import '../globals-legacy.css'
import '../globals.css'

import FullCenter from '@/components/primitives/FullCenter'
import config from '@/lib/config'

export const metadata = config.rootMetadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <FullCenter>{children}</FullCenter>
}
