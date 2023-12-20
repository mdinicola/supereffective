import { useSession } from '@/lib/auth/hooks/useSession'
import { LoadingBanner } from '@/lib/components/layout/panels/LoadingBanner'

export function OAuthButtonsView(): JSX.Element {
  const auth = useSession()

  if (auth.isLoading()) {
    return <LoadingBanner />
  }

  return (
    <>
      <hr />
      <br />
      <div
        className="text-center"
        style={{ background: 'var(--color-teal-4)', padding: '1rem', borderRadius: '1rem' }}
      >
        <div className="formGroup">
          <h6 style={{ fontSize: '0.8rem' }}>
            If you previously signed in via Github, Twitter or Github:
          </h6>
          <div style={{ fontStyle: 'italic', fontSize: '0.9rem', padding: '1rem 2rem' }}>
            As of May 29th, 2023 OAuth Sign In via external providers is no longer possible. <br />
            To login or create a new account, just use the new Sign In via Email. <br /> <br />
            You can find an import tool in the Living Dex section to import your old dex data.{' '}
            <br />
          </div>
          {/* <div className="formButtons">
            <ButtonLink
              href={config.links.legacy_account_recovery_form}
              target="_blank"
              rel="nofollow norefer"
              inverted
            >
              <i className="icon-email"></i> Recover old account dex data
            </ButtonLink>
          </div> */}
        </div>
      </div>
    </>
  )
}
