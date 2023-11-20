import type { Conditions } from '@pandacss/types'

export const conditionTokens: Conditions = {
  placeholder: '&:is([data-placeholder])',
  intersecting: ':where([data-intersecting="true"]) &',
  intersecting_self: '&:is([data-intersecting="true"])',
  pressed_self: '&[data-pressing="press"]',
  pressed: ':where([data-pressing="press"]) &',
  longpressed_self: '&:is([data-pressing="longpress"])',
  longpressed: ':where([data-pressing="longpress"]) &',
  pressed_end_self: '&:is([data-press-end])',
  pressed_end: ':where([data-press-end) &',
  state_loading: '&:is([data-state="loading"])',
  state_loaded: '&:is([data-state="loaded"])',
  state_error: '&:is([data-state="error"])',
  state_idle: '&:is([data-state="idle"])',
  light: '&[data-theme="light"], [data-theme="light"] &',
  dark: '&[data-theme="dark"], [data-theme="dark"] &',
}
