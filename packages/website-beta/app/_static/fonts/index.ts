import localFont from 'next/font/local'

export const monaSans = localFont({
  src: './Mona-Sans/Mona-Sans.woff2',
  fallback: [
    'Open Sans',
    'Ubuntu',
    'Fira Sans',
    // basics:
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Helvetica Neue',
    'sans-serif',
  ],
})

export const hubotSans = localFont({
  src: './Hubot-Sans/Hubot-Sans.woff2',
  fallback: [
    'Roboto',
    'Droid Sans',
    // basics:
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Helvetica Neue',
    'sans-serif',
  ],
})
