import { mapObject, __spreadValues } from '../helpers.mjs';
import { css } from '../css/index.mjs';

const vscrollableConfig = {
transform:(props) => __spreadValues({
  overflowY: "auto",
  overscrollBehavior: "none",
  overflowX: "hidden",
  maxW: "100%"
}, props)}

export const getVscrollableStyle = (styles = {}) => vscrollableConfig.transform(styles, { map: mapObject })

export const vscrollable = (styles) => css(getVscrollableStyle(styles))
vscrollable.raw = (styles) => styles