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

const safearea: PatternConfig = {
  description:
    'A pattern that adds padding to the top, right, bottom and left, to account for safe area insets.',
  properties: {},
  blocklist: [
    'padding',
    'paddingX',
    'paddingY',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    'paddingBlock',
    'paddingInline',
    'paddingInlineStart',
    'paddingInlineEnd',
    'paddingBlockStart',
    'paddingBlockEnd',
    'paddingEnd',
    'paddingStart',
    'px',
    'py',
  ],
  transform: ({ p, pt, pr, pb, pl, ...rest }) => ({
    pt: `max(token(sizes.safeAreaInsetT), token(sizes.${p ?? 3}))`,
    pr: `max(token(sizes.safeAreaInsetR), token(sizes.${p ?? 3}))`,
    pb: `max(token(sizes.safeAreaInsetB), token(sizes.${p ?? 3}))`,
    pl: `max(token(sizes.safeAreaInsetL), token(sizes.${p ?? 3}))`,
    ...rest,
  }),
}

const fluentlayout: PatternConfig = {
  description: 'A flex container that fills the viewport height, and has a minimum width of 300px.',
  properties: {},
  blocklist: ['display', 'h', 'maxH', 'flexDirection', 'justifyContent', 'overflow', 'minW'],
  transform: props => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    h: '100dvh',
    maxH: '100dvh',
    _standalone: {
      h: '100vh',
      maxH: '100vh',
    },
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
  safearea,
  fullwords,
}

export default patterns
