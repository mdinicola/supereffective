import Image from 'next/image'
import Link from 'next/link'

import logoFile from '@pkg/ui/assets/logo/logo.svg'

export function NavLogo(): React.ReactElement {
  return (
    <Link href={'/'} className="group flex no-underline align-middle items-center gap-3">
      <Image
        className="transform group-hover:scale-125 transition duration-300 inline-block"
        priority
        src={logoFile}
        height={32}
        width={32}
        alt="SuperEffective"
      />
      <h1 className="hidden font-extrabold text-xl tracking-tight md:inline-block text-black dark:text-white">
        SuperEffective.gg
      </h1>
    </Link>
  )
}
