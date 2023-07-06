import { createElement, forwardRef } from 'react'
import { styled } from './factory.mjs';
import { getFullwordsStyle } from '../patterns/fullwords.mjs';

export const Fullwords = forwardRef(function Fullwords(props, ref) {
  const styleProps = getFullwordsStyle()
return createElement(styled.div, { ref, ...styleProps, ...props })
})    