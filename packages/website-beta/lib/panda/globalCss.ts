import { CompositeGlobalStyleObject } from '@/lib/panda/types'

const globalCss: CompositeGlobalStyleObject = {
  '*': {
    pos: 'relative',
    boxSizing: 'border-box',
  },
  'html, body': {
    color: 'gray.900',
    maxWidth: '100vw',
    overflowX: 'hidden',
    overscrollBehavior: 'none',
    bg: 'gray.900',
  },
  // '.standalone-mode .main-layout': {
  //   minH: '100vh!',
  //   '@media (orientation: landscape)': {
  //     flexDirection: 'row!',
  //     // px: 12,
  //   },
  // },
  // '.standalone-mode .main-header': {
  //   pt: '12!',
  //   '@media (orientation: landscape)': {
  //     pt: '4!',
  //     pl: '12!',
  //   },
  // },
  a: {
    color: 'blue.600',
    textDecoration: 'underline',
  },
  '@media (prefers-color-scheme: dark)': {
    html: {
      colorScheme: 'dark',
    },
  },
}

export default globalCss
