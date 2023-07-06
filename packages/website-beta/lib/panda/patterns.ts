import { PatternConfig } from '@/styled-system/types/pattern'

const vscrollable: PatternConfig = {
  description: 'A vertically scrollable container, that blocks the x-axis scrollbar.',
  properties: {},
  blocklist: ['overflowY', 'overscrollBehavior', 'overflowX', 'maxW'],
  transform: props => ({
    overflowY: 'auto',
    overscrollBehavior: 'none',
    overflowX: 'hidden',
    maxW: '100%',
    ...props,
  }),
}

const fluentlayout: PatternConfig = {
  description: 'A flex container that fills the viewport height, and has a minimum width of 300px.',
  properties: {
    // gap: {
    //   type: 'token',
    //   value: 'sizes',
    //   property: 'gap',
    // },
  },
  blocklist: ['display', 'h', 'maxH', 'flexDirection', 'justifyContent', 'overflow', 'minW'],
  transform: props => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    h: '100dvh',
    maxH: '100dvh',
    minW: '300px',
    overflow: 'hidden',
    gap: 3,
    ...props,
  }),
}

const fullwords: PatternConfig = {
  description: 'A pattern that makes text wrap at word boundaries, without breaking word letters.',
  properties: {},
  blocklist: ['overflowWrap', 'hyphens'],
  transform: props => ({
    hyphens: 'none',
    overflowWrap: 'normal',
    ...props,
  }),
}

const patterns: Record<string, PatternConfig> = {
  vscrollable,
  fluentlayout,
  fullwords,
}

export default patterns
