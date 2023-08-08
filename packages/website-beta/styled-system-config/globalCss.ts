import { CompositeGlobalStyleObject } from '@/styled-system-config/types'

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
  a: {
    color: 'blue.600',
    textDecoration: 'underline',
  },
  '@media (prefers-color-scheme: dark)': {
    html: {
      colorScheme: 'dark',
    },
  },
  'img, svg': {
    display: 'block',
    maxW: '100%',
    h: 'auto',
  },
  'svg.filled': {
    fill: 'currentColor',
  },
  'button svg, button img': {
    display: 'inline-block',
    margin: 0,
    verticalAlign: 'middle',
    pointerEvents: 'none',
  },
  '.unsupported-browser-overlay': {
    display: 'none !important',
    width: '1px !important',
    height: '1px !important',
    zIndex: '-1 !important',
    opacity: '0 !important',
    pointerEvents: 'none',
  },
}

export default globalCss
