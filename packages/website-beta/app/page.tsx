import { PokeImg } from '@/components/pkm/imgs/PokeImg'
import Button from '@/components/primitives/Button'
import { css } from '@/styled-system/css'
import { fullwords } from '@/styled-system/patterns'

export default function Page() {
  return (
    <div
      className={css({
        display: 'flex',
        p: 4,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        minH: '100%',
        bgImage: 'url(/images/bg/mj/bg1.png)',
        // bgAttachment: 'fixed',
        bgSize: 'cover',
        bgRepeat: 'no-repeat',
        bgPosition: 'top center',
      })}
    >
      <h2
        className={fullwords({
          textAlign: 'left',
          fontSize: '2.5rem',
          lineHeight: '2rem',
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
        The best companion for your Pokémon games
      </h2>
      <nav
        className={css({
          display: 'flex',
          gap: 3,
          flexDirection: 'column',
          md: {
            flexDirection: 'row',
          },
        })}
        role="navigation"
      >
        <Button href="#" size="xl">
          Join Us
        </Button>
        <Button href="/pokedex" color="black" size="xl">
          PokéDex
        </Button>
        <Button href="/livingdex" color="gold" size="xl">
          LivingDex
        </Button>
      </nav>
      <div
        className={css({
          display: 'block',
          gap: 0,
          width: '60vw',
          flexDirection: 'row',
          textAlign: 'center',
        })}
      >
        {/* <PokeImg nid="0906" width={128} height={128} variant="home2d-icon" />
          <PokeImg nid="0909" width={128} height={128} variant="home2d-icon" />
          <PokeImg nid="0912" width={128} height={128} variant="home2d-icon" /> */}
        <PokeImg nid="0025" variant="home2d-icon" />
      </div>
    </div>
  )
}
