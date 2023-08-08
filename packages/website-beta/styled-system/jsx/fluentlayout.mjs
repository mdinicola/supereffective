import { createElement, forwardRef } from 'react'
import { styled } from './factory.mjs';
import { getFluentlayoutStyle } from '../patterns/fluentlayout.mjs';

export const Fluentlayout = /* @__PURE__ */ forwardRef(function Fluentlayout(props, ref) {
  const styleProps = getFluentlayoutStyle()
return createElement(styled.div, { ref, ...styleProps, ...props })
})