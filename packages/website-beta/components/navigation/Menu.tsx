import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@pkg/ui/lib/classNames'

import logoFile from '../../assets/logo/logo.svg'
import classes from './Menu.module.css'

// {/*<img className="block lg:hidden h-8 w-auto" src="/vercel.svg" alt="Logo" />*/}
// {/*<img className="hidden lg:block h-8 w-auto" src="/vercel.svg" alt="Logo" />*/}

const Menu = () => {
  const _logo = (
    <Link href={'/'} className="flex no-underline align-middle items-center gap-3">
      <Image
        className="transform hover:scale-125 transition duration-300 inline-block"
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

  const _nav = (
    <nav className="flex">
      <div className={classes.flexRight}>
        <Link href="#" className={cn(classes.navLink, classes.active)}>
          Pokédex
        </Link>
        <Link href="#" className={cn(classes.navLink)}>
          Dex Tracker
        </Link>
        <Link href="#" className={cn(classes.navLink)}>
          Sign In
        </Link>
      </div>

      <div className={classes.flexRightXs}>
        <Link href="#" className={cn(classes.navLink)}>
          Sign In
        </Link>
      </div>
    </nav>
  )

  return (
    <div className={classes.root}>
      <div className={classes.wr}>
        <div className={classes.navFlex}>
          <div className="flex">
            <div className={classes.flexLeft}>{_logo}</div>
          </div>
          <div className="flex">{_nav}</div>
        </div>
      </div>
    </div>
  )
}

export default Menu
