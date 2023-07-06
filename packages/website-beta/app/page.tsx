import DefaultLayout from '@/components/layouts/DefaultLayout'
import Button from '@/components/primitives/Button'
import { css } from '@/styled-system/css'
import { fullwords } from '@/styled-system/patterns'

export default function Page() {
  return (
    <DefaultLayout>
      <div
        className={css({
          display: 'flex',
          p: 4,
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          minH: '100%',
          bgImage: 'url(/images/bg/mj/bg1.png)',
          bgAttachment: 'fixed',
          bgSize: 'cover',
          bgRepeat: 'no-repeat',
          bgPosition: 'top center',
        })}
      >
        <h2
          className={fullwords({
            textAlign: 'left',
            fontSize: '3rem',
            lineHeight: '2.5rem',
            md: {
              fontSize: '4rem',
              lineHeight: '3.5rem',
            },
            fontWeight: '900',
            letterSpacing: '-0.025em',
            maxWidth: '80%',
            my: 12,
            // textShadow:
            //   '2px 2px 0 token(colors.neutral.950), -2px -2px 0 token(colors.neutral.950), 2px -2px 0 token(colors.neutral.950), -2px 2px 0 token(colors.neutral.950)',
            color: 'gray.900',
            // textShadow: '5px 5px rgba(0,0,0,0.5), 0 0 0.5rem rgba(255,255,255,0.5)',
            opacity: 1,
          })}
        >
          A great companion for your Pokémon journeys
        </h2>
        <div
          className={css({
            display: 'flex',
            gap: 3,
            flexDirection: 'column',
            md: {
              flexDirection: 'row',
            },
          })}
        >
          <Button href="/ui" variant={{ color: 'gold', size: 'xl' }}>
            Join Us
          </Button>
          <Button href="/ui" variant={{ color: 'black', size: 'xl' }}>
            PokéDex
          </Button>
        </div>
      </div>
      <p>Foo bar</p>
    </DefaultLayout>
  )
}
