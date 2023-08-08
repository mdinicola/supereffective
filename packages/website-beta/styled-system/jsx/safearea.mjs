import { createElement, forwardRef } from 'react'
import { styled } from './factory.mjs';
import { getSafeareaStyle } from '../patterns/safearea.mjs';

export const Safearea = /* @__PURE__ */ forwardRef(function Safearea(props, ref) {
  const styleProps = getSafeareaStyle()
return createElement(styled.div, { ref, ...styleProps, ...props })
})