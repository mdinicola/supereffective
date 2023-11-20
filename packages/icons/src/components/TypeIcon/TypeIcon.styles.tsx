import { pokemonTypes } from '@supeffective/dataset'

import { cva } from '@/stylesystem/css'

export const typeIconGlyphRecipe = cva({
  base: {
    position: 'relative',
    display: 'block',
    aspectRatio: 1,
    margin: '0 auto',
    fill: 'currentcolor',
    // "color" doesnt work on svg elements, use "fill" instead
  },
  variants: {
    typeId: Object.fromEntries(pokemonTypes.map(t => [t.id, {}])),
    filled: {
      true: {
        fill: '#fff',
      },
    },
    colored: {
      true: {},
    },
    rounded: {
      true: {
        transform: 'scale(0.9)',
      },
    },
    terastal: {
      true: {
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        aspectRatio: 1,
        transform: 'scale(0.7)',
        zIndex: 1,
      },
    },
    size: {
      xs: {},
      sm: {},
      md: {},
      lg: {},
      xl: {},
    },
  },
  defaultVariants: {
    typeId: 'normal',
    filled: false,
    colored: false,
    rounded: false,
    terastal: false,
  },
  compoundVariants: [
    // Tera, but not filled or colored
    {
      filled: false,
      colored: false,
      terastal: true,
      css: {
        fill: '#fff',
      },
    },
    // Tera and colored, but not filled
    {
      filled: false,
      colored: true,
      terastal: true,
      css: {
        fill: '#fff',
      },
    },
    // Filled and colored, but not tera
    {
      filled: true,
      colored: true,
      terastal: false,
      css: {
        fill: '#fff',
      },
    },
    // make it smaller on xs and sm
    {
      size: 'xs',
      terastal: false,
      filled: true,
      css: {
        transform: 'scale(0.75)',
      },
    },
    {
      size: 'sm',
      terastal: false,
      filled: true,
      css: {
        transform: 'scale(0.85)',
      },
    },
    // position it correctly on tera
    {
      size: 'xs',
      terastal: true,
      css: {
        top: '0',
      },
    },
    {
      size: 'sm',
      terastal: true,
      css: {
        top: '0',
      },
    },
    {
      size: 'md',
      terastal: true,
      css: {
        top: '1px',
      },
    },
    {
      size: 'lg',
      terastal: true,
      css: {
        top: '2px',
      },
    },
    {
      size: 'xl',
      terastal: true,
      css: {
        top: '2px',
      },
    },
  ],
})

export const typeTeraIconBgRecipe = cva({
  base: {
    position: 'absolute',
    display: 'block',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    aspectRatio: 1,
    fill: 'currentcolor',
  },
  variants: {
    typeId: Object.fromEntries(pokemonTypes.map(t => [t.id, {}])),
    filled: {
      true: {},
    },
    colored: {
      true: {},
    },
    rounded: {
      true: {},
    },
    terastal: {
      true: {},
    },
    size: {
      xs: { top: '0' },
      sm: { top: '0px' },
      md: { top: '1px' },
      lg: { top: '2px' },
      xl: { top: '2px' },
    },
  },
  defaultVariants: {
    typeId: 'normal',
    filled: false,
    colored: false,
    rounded: false,
    terastal: false,
  },
})

const typeIconCompoundVariantsByType: any = pokemonTypes.flatMap(t => [
  // Filled and colored
  {
    typeId: t.id,
    filled: true,
    colored: true,
    css: {
      backgroundColor: `type-${t.id}`,
    },
  },
  // Colored, but not filled
  {
    typeId: t.id,
    filled: false,
    colored: true,
    terastal: false,
    css: { color: `type-${t.id}` },
  },
  // Tera and colored
  {
    typeId: t.id,
    terastal: true,
    colored: true,
    css: {
      color: `type-${t.id}`,
    },
  },
])

const typeIconCompoundVariants = [
  // Filled but not colored
  { filled: true, colored: false, css: { color: 'currentColor' } },

  // Tera but not colored
  { terastal: true, colored: false, css: { color: 'currentColor' } },

  {
    terastal: true,
    size: 'xs',
    css: { padding: '1px 0 0 0', width: '1rem', height: '1rem' },
  },
  {
    terastal: true,
    size: 'sm',
    css: { padding: '2px 0 0 0', width: '1.5rem', height: '1.5rem' },
  },
  {
    terastal: true,
    size: 'md',
    css: { padding: '2px 0 0 0', width: '2rem', height: '2rem' },
  },
  {
    terastal: true,
    size: 'lg',
    css: { padding: '4px 0 0 0', width: '3rem', height: '3rem' },
  },
  {
    terastal: true,
    size: 'xl',
    css: { padding: '4px 0 0 0', width: '4rem', height: '4rem' },
  },
  {
    terastal: false,
    filled: false,
    css: { paddingInline: '0' },
  },
].concat(typeIconCompoundVariantsByType)

export const typeIconRecipe = cva({
  base: {
    position: 'relative',
    display: 'inline-block',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: '0.25rem',
    userSelect: 'none',
    aspectRatio: 1,
    padding: '0.25rem',
    color: 'currentColor',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  variants: {
    typeId: Object.fromEntries(pokemonTypes.map(t => [t.id, {}])),
    filled: {
      true: {
        backgroundColor: 'currentColor',
      },
    },
    colored: {
      true: {},
    },
    rounded: {
      true: {
        backgroundColor: 'currentColor',
        borderRadius: '100%',
      },
    },
    terastal: {
      true: {
        padding: '0',
        transform: 'scale(1.25)',
        aspectRatioMin: 'unset',
        verticalAlign: 'top',
      },
    },
    size: {
      xs: { width: '1rem', height: '1rem', lineHeight: '1', padding: '1px' },
      sm: { width: '1.5rem', height: '1.5rem', lineHeight: '1', padding: '2px' },
      md: { width: '2rem', height: '2rem', lineHeight: '3rem', padding: '2px' },
      lg: { width: '3rem', height: '3rem', lineHeight: '4rem', padding: '4px' },
      xl: { width: '4rem', height: '4rem', lineHeight: '8rem', padding: '4px' },
    },
  },
  defaultVariants: {
    typeId: 'normal',
    filled: false,
    colored: false,
    rounded: false,
    terastal: false,
    size: 'sm',
  },
  compoundVariants: typeIconCompoundVariants as any,
})
