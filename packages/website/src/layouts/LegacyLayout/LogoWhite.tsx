import Image from 'next/image'
import Link from 'next/link'

import config from '#/config'

export interface LogoWhiteProps {
  opacity: number

  [key: string]: any
}

export const LogoWhite = ({ opacity, ...props }: LogoWhiteProps) => {
  return (
    <div className="logoContainer" {...props}>
      <Link href="/">
        <Image src="/assets/logo/logo-white.png" width="48" height="48" alt="logo" />
        <br />
        <span className="title typo-compact">{config.texts.siteName}</span>
      </Link>
      <style jsx>{`
        .logoContainer {
          color: rgba(255, 255, 255, ${opacity});
          font-weight: bold;
          font-size: 1.4rem;
          padding-bottom: 0.33rem;
          border: none;
          margin: 0.9rem 0 0 0;
          text-align: center;
          display: inline-block;
          vertical-align: middle;
        }

        .logoContainer a {
          display: block;
          text-decoration: none;
          vertical-align: middle;
        }

        .logoContainer img {
          opacity: ${opacity};
          width: 48px;
          height: 48px;
          aspect-ratio: 1;
          display: inline-block;
          vertical-align: middle;
          margin-bottom: 2px;
        }

        .logoContainer .title {
          vertical-align: middle;
          display: inline-block;
          color: rgba(255, 255, 255, ${opacity});
        }
      `}</style>
    </div>
  )
}