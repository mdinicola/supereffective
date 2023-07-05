import Link from 'next/link'

import DefaultLayout from '@/components/layouts/DefaultLayout'
import { css } from '@/styled-system/css'

export default function Page() {
  return (
    <DefaultLayout>
      <div className={css({ fontSize: '2xl', fontWeight: 'bold' })}>
        Hello 🐼!
        <ul>
          <li>
            <Link href="/ui">UI</Link>
          </li>
        </ul>
      </div>
    </DefaultLayout>
  )
}
