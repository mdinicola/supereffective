import Head from 'next/head'

const baseurl = '/supereffective-assets/images/spritesheets/pokemon'
const version = '202301-2'

const PkSpriteStyles = () => {
  return (
    <>
      <Head>
        <link rel="preload" as="image" href={`${baseurl}/spritesheet.webp?v=${version}`} />
        <link rel="preload" as="image" href={`${baseurl}/spritesheet-shiny.webp?v=${version}`} />
        <link rel="stylesheet" href={`${baseurl}/spritesheet.css?v=${version}`} />
      </Head>
    </>
  )
}

export default PkSpriteStyles
