import { mapObject, __spreadValues } from '../helpers.mjs';
import { css } from '../css/index.mjs';

const fullwordsConfig = {
transform:(props) => __spreadValues({
  hyphens: "none",
  overflowWrap: "normal"
}, props)}

export const getFullwordsStyle = (styles = {}) => fullwordsConfig.transform(styles, { map: mapObject })

export const fullwords = (styles) => css(getFullwordsStyle(styles))
fullwords.raw = (styles) => styles