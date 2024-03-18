import { fetchImgAsDataUri } from '@/lib/fetch'
import { getAbsUrl, getPokeImgUrl } from '@/lib/urls'
import { cssVarsConfig } from '@/styles/variables.config'
import { pokemonIndex } from '@supeffective/dataset'
import { ImageResponse } from 'next/og'

import { isDevelopmentEnv } from '@/lib/env'
import { getImageColors } from '@/lib/image-processing'

// @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image

// Image metadata
export const alt = 'Pokémon'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
  const pkm = pokemonIndex.find((p) => p.id === params.slug)

  if (!pkm) {
    return new ImageResponse(<div>Not found</div>, { status: 404 })
  }

  // Font
  // const interSemiBold = fetch(new URL('./Inter-SemiBold.ttf', import.meta.url)).then((res) => res.arrayBuffer())
  const picDataUrl = await fetchImgAsDataUri(getPokeImgUrl(pkm.nid, '3d-stroke'), contentType)
  const ballDataUrl = await fetchImgAsDataUri(getAbsUrl('/assets/gui/bgs/patterns/pattern-ball10.png'), contentType)
  const iconDataUrl = await fetchImgAsDataUri(getAbsUrl('/assets/logo/icon.png'), contentType)
  const ballImgSize = { w: 444, h: 330 }

  if (!picDataUrl || !ballDataUrl || !iconDataUrl) {
    return new ImageResponse(<div>Not found</div>, { status: 404 })
  }

  const picColors = await getImageColors(picDataUrl)

  if (isDevelopmentEnv()) {
    console.log('pokemon/[slug]/opengraph-image', {
      pkm: pkm.id,
      avgColor: picColors.avg.hexa,
      domColor: picColors.dominant.hexa,
    })
  }

  // Don't use next/image here, as it's not supported in opengraph-image
  const primaryColor = cssVarsConfig.colors.primary

  // const pkmFull = await fetchPokemon(pkm.id, pkm.region, appConfig.assets.dataUrl)
  // const typesColors = [pkmFull.type1, pkmFull.type2]
  //   .filter((val): val is string => val !== null)
  //   .map((val) => pokemonTypesMap.get(val)?.color)
  //   .filter((val): val is string => val !== undefined)
  const typesColors = [
    cssVarsConfig.colors.neutral[950],
    picColors.dominant.hex,
    // picColors.avg.hex,
    // picColors.secondary.hex,
    // picColors.avg.hex,
  ]
  // const colorStops = [50, 50, 55] // diagonal split
  // const colorStops = [1, 50, 65, 75]
  const colorStops = [0, 60, 80]

  // if (typesColors.length < 2) {
  //   // typesColors.push(primaryColor[600])
  //   typesColors.push(cssVarsConfig.colors.neutral[900])
  // }

  const typesGradient = typesColors.map((color, i) => `${color} ${colorStops[i]}%`).join(', ')

  try {
    // For CSS compat. info, @see https://github.com/vercel/satori
    return new ImageResponse(
      <div
        style={{
          fontSize: 96,
          // fontFamily: 'sans-serif',
          backgroundColor: primaryColor[900],
          color: primaryColor[100],
          backgroundImage: `url(${ballDataUrl}), linear-gradient(to bottom right, ${typesGradient})`,
          backgroundRepeat: 'repeat, no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: `${ballImgSize.w * 2}px ${ballImgSize.h * 2}px, 100% 100%`,
          width: '100%',
          height: '100%',
          display: 'flex',
          padding: '40px',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <img
          src={iconDataUrl}
          alt=""
          width={300}
          height={300}
          style={{
            width: '125px',
            height: '125px',
            objectFit: 'contain',
            position: 'absolute',
            zIndex: '0',
            top: '20px',
            left: '20px',
            opacity: 0.8,
          }}
        />
        <img
          style={{
            position: 'absolute',
            zIndex: '0',
            bottom: '-20px',
            right: '-40px',
          }}
          width={600}
          height={600}
          src={picDataUrl}
          alt=""
        />
        <div style={{ zIndex: 123, maxWidth: '600px', fontWeight: 'bold', textShadow: '6px 6px black' }}>
          {pkm.name}
        </div>
      </div>,
      // ImageResponse options
      {
        // For convenience, we can re-use the exported opengraph-image
        // size config to also set the ImageResponse's width and height.
        ...size,
        // fonts: [
        //   {
        //     name: 'Inter',
        //     data: await interSemiBold,
        //     style: 'normal',
        //     weight: 400,
        //   },
        // ],
      },
    )
  } catch (error) {
    console.error(error)
    return new ImageResponse(<div>Internal Error</div>, { status: 500 })
  }
}
