import Head from 'next/head'

const baseurl =
  'https://itsjavi.com/supereffective-assets/assets/images/spritesheets/pokemon/home3d-icon'
const version = '20230625-0'

const PkSpriteStyles = () => {
  return (
    <>
      <Head>
        <link
          rel="preload"
          as="image"
          href={`${baseurl}/regular/spritesheet-shadow.webp?v=${version}`}
        />
        <link rel="preload" as="image" href={`${baseurl}/regular/spritesheet.webp?v=${version}`} />
        <link rel="preload" as="image" href={`${baseurl}/shiny/spritesheet.webp?v=${version}`} />
        <link rel="stylesheet" href={`${baseurl}/regular/spritesheet.css?v=${version}`} />
      </Head>
    </>
  )
}

export default PkSpriteStyles
