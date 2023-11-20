import { defineSemanticTokens } from '@pandacss/dev'

const blackColor = '#161616'
const whiteColor = '#f9f9f9'
const grayColor = '#929292'
const primaryColor = '#37AEA5'
const primaryLightestColor = '#F4FAF9'
// const secondaryColor = '#FFD700'
// const secondaryLightestColor = '#FFFDF5'

export const semanticColors = defineSemanticTokens.colors({
  cPrimarySoft: {
    // teal
    value: { _light: '#C6E5E1', _dark: '#C6E5E1' },
  },
  primary: {
    // teal
    value: { _light: primaryColor, _dark: primaryColor },
  },
  cPrimary: {
    // teal
    value: { _light: primaryColor, _dark: primaryColor },
  },
  cSecondary: {
    // gold
    value: { _light: '#FFD700', _dark: '#FFD700' },
  },
  cText: {
    value: { _light: blackColor, _dark: whiteColor },
  },
  cTextInverse: {
    value: { _light: whiteColor, _dark: blackColor },
  },
  cTextMuted: {
    value: { _light: grayColor, _dark: grayColor },
  },
  cBg: {
    value: { _light: whiteColor, _dark: blackColor },
  },
  cBgInverse: {
    value: { _light: blackColor, _dark: whiteColor },
  },
  cBgBoxBody: {
    value: { _light: primaryLightestColor, _dark: blackColor },
  },
  // cBgBoxHeader: {
  //   value: { _light: primaryColor, _dark: blackColor },
  // },
  cBoxBorder: {
    value: { _light: primaryColor, _dark: primaryColor },
  },
  // boxHeaderBg: {
  //   value: { _light: '#37AEA5', _dark: '#37AEA5' },
  // },
})
