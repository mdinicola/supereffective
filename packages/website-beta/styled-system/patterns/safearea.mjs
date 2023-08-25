import { mapObject, __spreadValues, __objRest } from '../helpers.mjs';
import { css } from '../css/index.mjs';

const safeareaConfig = {
transform:(_a) => {
  var _b = _a, { p, pt, pr, pb, pl } = _b, rest = __objRest(_b, ["p", "pt", "pr", "pb", "pl"]);
  return __spreadValues({
    pt: `max(token(sizes.safeAreaInsetT), token(sizes.${p != null ? p : 3}))`,
    pr: `max(token(sizes.safeAreaInsetR), token(sizes.${p != null ? p : 3}))`,
    pb: `max(token(sizes.safeAreaInsetB), token(sizes.${p != null ? p : 3}))`,
    pl: `max(token(sizes.safeAreaInsetL), token(sizes.${p != null ? p : 3}))`
  }, rest);
}}

export const getSafeareaStyle = (styles = {}) => safeareaConfig.transform(styles, { map: mapObject })

export const safearea = (styles) => css(getSafeareaStyle(styles))
safearea.raw = getSafeareaStyle