import { cva } from '@/stylesystem/css'

export const gameLabelRecipe = cva({
  base: {
    position: 'relative',
    display: 'inline-block',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    userSelect: 'none',
    cursor: 'default',
    textAlign: 'center',
    verticalAlign: 'middle',
    background: '#333',
    border: '2px solid #555',
    color: '#fff',
    padding: '2px 4px',
    fontStyle: 'normal',
    fontSize: '16px',
    lineHeight: '1',
    textShadow: '1px 1px #111',
    textTransform: 'uppercase',
    fontFamily:
      'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
  },
  variants: {
    gameId: {
      // Gen 1
      rby: {
        background: 'linear-gradient(to right, #ff0000 33%, #0000ff 33%, #0000ff 66%, #ffff37 66%)',
      },
      rb: { background: 'linear-gradient(to right, #ff0000 50%, #0000ff 50%)' },
      'rb-r': { background: '#ff0000' },
      'rb-b': { background: '#0000ff' },
      y: { background: '#ffff37', color: '#000', textShadow: '1px 1px #fff' },
      // Gen 2
      gsc: {
        background: 'linear-gradient(to right, #ffb702 33%, #85939f 33%, #85939f 66%, #a38eff 66%)',
      },
      gs: { background: 'linear-gradient(to right, #ffb702 50%, #85939f 50%)' },
      'gs-g': { background: '#ffb702' },
      'gs-s': { background: '#85939f' },
      c: { background: '#a38eff' },
      // Gen 3
      rse: {
        background: 'linear-gradient(to right, #ff0000 0%, #0000ff 50%, #5aab3c 100%)',
      },
      rs: { background: 'linear-gradient(to right, #ff0000 50%, #0000ff 50%)' },
      'rs-r': { background: '#ff0000' },
      'rs-s': { background: '#0000ff' },
      e: { background: '#5aab3c' },
      // Gen 1 GBA Remakes
      frlg: {
        background: 'linear-gradient(to right, #ff6a00 50%, #5aab3c 50%)',
      },
      'frlg-fr': { background: '#ff6a00' },
      'frlg-lg': { background: '#5aab3c' },
      // Gen 4
      dppt: {
        background: 'linear-gradient(to right, #7ab6f6 33%, #de9ad9 33%, #de9ad9 66%, #ead6b8 66%)',
      },
      dp: { background: 'linear-gradient(to right, #7ab6f6 50%, #de9ad9 50%)' },
      'dp-d': { background: '#7ab6f6' },
      'dp-p': { background: '#de9ad9' },
      pt: {
        background: 'linear-gradient(to right, #ead6b8 0%, #838383 100%);',
        color: '#000',
        textShadow: '1px 1px #fff',
      },
      // Gen 2 DS Remakes
      hgss: {
        background: 'linear-gradient(to right, #ffb702 0%, #85939f 100%)',
      },
      'hgss-hg': { background: '#ffb702' },
      'hgss-ss': { background: '#85939f' },
      // Gen 5
      bwb2w2: {
        background: 'linear-gradient(to right, #000 50%, #f4f4f4 50%)',
      },
      bw: {
        background: 'linear-gradient(to right, #000 50%, #f4f4f4 50%)',
      },
      b2w2: {
        background: 'linear-gradient(to right, #000 0%, #f4f4f4 100%)',
      },
      'bw-b': { background: '#000' },
      'bw-w': { background: '#f4f4f4', color: '#000', textShadow: '1px 1px #fff' },
      'b2w2-b2': { background: '#000' },
      'b2w2-w2': { background: '#f4f4f4', color: '#000', textShadow: '1px 1px #fff' },
      // Gen 6
      xy: {
        background: 'linear-gradient(to right, #365ea6 50%, #d22f4b 50%)',
      },
      'xy-x': { background: '#365ea6' },
      'xy-y': { background: '#d22f4b' },
      // Gen 3 3DS Remakes
      oras: {
        background: 'linear-gradient(to right, #ff0000 0%, #0000ff 100%)',
      },
      'oras-or': { background: '#ff0000' },
      'oras-as': { background: '#0000ff' },
      // HOME and GO
      go: {
        background: 'linear-gradient(to right, #00c4ff 0%, #0066ff 70%)',
      },
      home: { background: 'linear-gradient(to right, #6fc209 10%, #07c9bc 100%)' },
      // Gen 7
      smusum: {
        background: 'linear-gradient(to right, #ff8000 0%, #5e00ff 100%)',
      },
      sm: { background: 'linear-gradient(to right, #ff8000 50%, #5e00ff 50%)' },
      'sm-s': { background: '#ff8000' },
      'sm-m': { background: '#5e00ff' },
      usum: {
        background: 'linear-gradient(to right, #ff8000 0%, #5e00ff 100%)',
      },
      'usum-us': { background: '#ff8000' },
      'usum-um': { background: '#5e00ff' },
      // Gen 8
      swsh: {
        background: 'linear-gradient(to right, #32b1c7 50%, #d22f86 50%)',
      },
      'swsh-sw': { background: '#32b1c7' },
      'swsh-sh': { background: '#d22f86' },
      'swsh-armor': {
        background: 'linear-gradient(to bottom, #FEF100 50%, #1FB171 50%)',
      },
      'swsh-tundra': {
        background: 'linear-gradient(to top, #FEF100 50%, #1FB171 50%)',
      },
      // Gen 1 SW Remakes (Let's Go)
      lgpe: {
        background: 'linear-gradient(to right, #ffd500 50%, #986734 50%)',
      },
      'lgpe-lgp': { background: '#ffd500' },
      'lgpe-lge': { background: '#986734' },
      // Gen 4 SW Remakes & Legends
      bdsp: {
        background: 'linear-gradient(to right, #7ab6f6 0%, #de9ad9 100%);',
      },
      'bdsp-bd': { background: '#7ab6f6' },
      'bdsp-sp': { background: '#de9ad9' },
      la: {
        background: 'linear-gradient(to right, #ffffff 10%, #ffc70e 100%)',
        color: '#000',
        textShadow: '1px 1px #fff',
      },
      // Gen 9
      sv: {
        background: 'linear-gradient(to right, #f84830 50%, #b05eff 50%)',
      },
      'sv-s': { background: '#f84830' },
      'sv-v': { background: '#b05eff' },
      'sv-mask': {
        background: 'linear-gradient(to bottom, #399C9D 50%, #7CC9EB 50%)',
      },
      'sv-disc': {
        background: 'linear-gradient(to top, #399C9D 50%, #7CC9EB 50%)',
      },
      // Gen 10
      // ...
    },
    colored: {
      false: {
        background: '#333',
        border: '2px solid #555',
        color: '#fff',
        textShadow: '1px 1px #111',
      },
    },
    rounded: {
      true: {
        borderRadius: '0.5rem',
      },
    },
    size: {
      xs: { fontSize: '11px', padding: '2px 4px' },
      sm: { fontSize: '14px', padding: '4px 6px' },
      md: { fontSize: '16px', padding: '6px 8px' },
      lg: { fontSize: '18px', padding: '8px 10px' },
      xl: { fontSize: '22px', padding: '10px 12px' },
    },
  },
  defaultVariants: {
    gameId: 'rb',
    colored: false,
    rounded: false,
    size: 'sm',
  },
  // compoundVariants: [],
})
