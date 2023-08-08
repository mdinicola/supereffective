import DefaultLayout from '@/components/layouts/PrimaryLayout'
import config from '@/lib/config'
import { css } from '@/styled-system/css'
import { Center } from '@/styled-system/jsx'

const metadata = config.rootMetadata
metadata.robots = 'noindex, nofollow'

export { metadata }

export default function NotFound() {
  return (
    <DefaultLayout>
      <title>Not Found | example.com</title>
      <Center className={css({ fontSize: 'xl', height: '100%' })}>Error: Page Not Found</Center>
    </DefaultLayout>
  )
}
