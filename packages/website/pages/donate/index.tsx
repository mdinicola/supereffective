import PageMeta from '#/features/pages/components/PageMeta'
import { ButtonLink } from '#/primitives/legacy/Button/Button'
import { abs_url } from '#/primitives/legacy/Link/Links'

const Page = () => {
  return (
    <div className={'page-container'} style={{ maxWidth: 'none' }}>
      <PageMeta
        metaTitle={'Donate - Supereffective.gg'}
        metaDescription={''}
        robots={'noindex,nofollow'}
        canonicalUrl={abs_url('/donate')}
        lang={'en'}
      />
      <div className="page-container">
        <div className="bordered-container inner-container bg-white text-center">
          <h1>Supporting this site</h1>
          <p className="text-justify">
            You can help support the development and hosting costs of this website by making a
            donation.
            <br /> <br />
            Your donation will not only help me to continue developing this website, it will also
            help me understand that people care about what I do and it will help me to stay
            motivated and continue to improve this website and deliver new great features.
            <br /> <br />
            Thank you, at least for considering it ❤️.
            <br /> <br />
            <cite>— F. Javier Aguilar - Webmaster and Developer.</cite>
          </p>
          <br />
          <p className="text-center">
            <ButtonLink
              href="https://www.patreon.com/supereffective"
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: '#FF424D', color: '#181818' }}
            >
              <i className="icon-pkg-mark-heart" title="Donate" style={{ color: '#181818' }} />{' '}
              Become a Patron
            </ButtonLink>

            <ButtonLink
              href="https://www.paypal.com/donate/?hosted_button_id=ZJX6VGBGTB8G4"
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: '#FFC43A', color: '#141661', borderColor: '#141661' }}
            >
              <i className="icon-pkg-mark-heart" title="Donate" style={{ color: '#141661' }} />{' '}
              Donate with Paypal
            </ButtonLink>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page
