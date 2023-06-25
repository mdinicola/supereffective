import Head from 'next/head'

const baseurl =
  'https://itsjavi.com/supereffective-assets/assets/images/spritesheets/pokemon/home3d-icon/regular'
const version = '20230625-0'

const PkSpriteStyles = () => {
  return (
    <>
      <Head>
        <link rel="preload" as="image" href={`${baseurl}/spritesheet-shadow.webp?v=${version}`} />
        <link rel="preload" as="image" href={`${baseurl}/spritesheet.webp?v=${version}`} />
        <link rel="preload" as="image" href={`${baseurl}/spritesheet-shiny.webp?v=${version}`} />
        <link rel="stylesheet" href={`${baseurl}/spritesheet.css?v=${version}`} />
      </Head>
    </>
  )
}

export default PkSpriteStyles
