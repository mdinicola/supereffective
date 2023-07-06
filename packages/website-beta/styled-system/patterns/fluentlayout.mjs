import { mapObject, __spreadValues } from '../helpers.mjs';
import { css } from '../css/index.mjs';

const fluentlayoutConfig = {
transform:(props) => __spreadValues({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  h: "100dvh",
  maxH: "100dvh",
  minW: "300px",
  overflow: "hidden",
  gap: 3
}, props)}

export const getFluentlayoutStyle = (styles = {}) => fluentlayoutConfig.transform(styles, { map: mapObject })

export const fluentlayout = (styles) => css(getFluentlayoutStyle(styles))