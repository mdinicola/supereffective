import { cn } from '@/lib/utils'
import Link from 'next/link'

import DiscordIcon from '@/assets/images/discord-icon.svg'
import GithubIcon from '@/assets/images/github-icon.svg'
import TwitterIcon from '@/assets/images/x-twitter-icon.svg'
import { DicesIcon, HeartHandshakeIcon } from 'lucide-react'

import LogoIcon from '@/assets/images/logo-text2.svg'
import cls from './HomepageView.module.scss'

export default function HomepageView() {
  return (
    <article className={cn(cls.base, 'fixed-fullpage-bg')} style={{ padding: '1rem' }}>
      <LogoIcon alt="Homepage" width={300} height={150} hidden />
      <h1 className="text-3xl font-bold">Welcome to SuperEffective 4.0</h1>
      Find us here:
      <ul>
        <li className={cn('flex flex-row gap-4 text-center')}>
          <Link href="/v4/about" title="GitHub">
            <GithubIcon data-filled width={16} height={16} />
          </Link>
          <Link href="/v4/about" title="Discord">
            <DiscordIcon data-filled width={16} height={16} />
          </Link>
          <Link href="/v4/about" title="Twitter">
            <TwitterIcon data-filled width={16} height={16} />
          </Link>
          <Link href="/v4/about" title="Patreon">
            <HeartHandshakeIcon width={16} height={16} />
          </Link>
        </li>
      </ul>
      <div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="rounded-xl border-2 border-accent bg-accent p-4 text-lg text-accent-950">
          Catch of the day:{' '}
          <span className="text-3xl font-bold">
            Sudowoodo{' '}
            <span style={{ textShadow: '1px 1px black, -1px 1px black, 1px -1px black, -1px -1px black' }}>✨</span>
          </span>
          <br />
          <button
            type="button"
            className="rounded-sm border border-primary-950 bg-accent-400 px-2 py-1 text-primary-950"
          >
            <DicesIcon className="inline-block" width={24} height={24} /> Random
          </button>
          <br />
          Shiny chain counter: <input type="number" step={1} defaultValue="16" />
          Game resets counter: <input type="number" step={1} defaultValue="3" />
        </div>
        <div className="rounded-xl border-2 border-teragreen bg-teragreen p-4 text-lg text-teragreen-950">
          Missing Pokémon in last game (Violet): <span className="text-3xl">31</span>
        </div>
        <div className="rounded-xl border-2 border-terablue bg-terablue p-4 text-lg text-terablue-950">
          Days until Pokémon Z-A launch countdown: <span className="text-3xl">278</span>
        </div>
        <div className="rounded-xl border-2 border-terapink bg-terapink p-4 text-lg text-terapink-950">
          Shiny chain counter: <input type="number" step={1} defaultValue="16" />
        </div>
      </div>
    </article>
  )
}
