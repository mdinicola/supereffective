import Image from 'next/image'
import useBackgroundTheme from '#/hooks/legacy/useBackgroundTheme'
import PageMeta from '#/layouts/LegacyLayout/PageMeta'
import { abs_url } from '#/primitives/legacy/Link/Links'

const Page = () => {
  useBackgroundTheme('teal-pattern')

  return (
    <div className={'page-container'} style={{ maxWidth: 'none' }}>
      <PageMeta
        metaTitle={'Thank you! - Supereffective.gg'}
        metaDescription={''}
        robots={'noindex,nofollow'}
        canonicalUrl={abs_url('/donate')}
        lang={'en'}
      />
      <div className="page-container">
        <div className="bordered-container inner-container bg-white text-center">
          <p>
            <Image src={'/assets/shaymin.png'} width={195} height={166} alt="shaymin" />
          </p>
          <h1>Thank You!</h1>
          <p className="text-justify">
            Dear trainer,
            <br />
            Thank you for your donation ❤️ ! I really appreciate it and it keeps this site and my
            motivation running.
            <br /> <br />
            I am currently working on ideas about how donors can get extra bonuses in the future, so
            stay tuned!
            <br /> <br />
            <cite>F. Javier Aguilar - webmaster and developer.</cite>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page
