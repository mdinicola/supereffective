import { createElement, forwardRef } from 'react'
import { styled } from './factory.mjs';
import { getVscrollableStyle } from '../patterns/vscrollable.mjs';

export const Vscrollable = forwardRef(function Vscrollable(props, ref) {
  const styleProps = getVscrollableStyle()
return createElement(styled.div, { ref, ...styleProps, ...props })
})    