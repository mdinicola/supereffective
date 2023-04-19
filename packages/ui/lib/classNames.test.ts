import { describe, expect, it } from 'vitest'

import { classNames } from './classNames'

describe('classNames', () => {
  it('should return empty string if no arguments passed', () => {
    expect(classNames()).toBe('')
  })
  it('should concatenate class names together', () => {
    expect(classNames('foo', 'bar', 'baz')).toBe('foo bar baz')
  })

  it('should handle conditional class names', () => {
    expect(classNames(['foo', true], ['bar', false], ['baz', true])).toBe('foo baz')
  })

  it('should handle if-else conditional class names', () => {
    expect(classNames('foo', ['qux', true, 'baz'])).toBe('foo qux')
    expect(classNames('foo', ['qux', false, 'baz'])).toBe('foo baz')
  })

  it('should handle undefined and null class names', () => {
    expect(classNames(undefined, null, 'foo', null)).toBe('foo')
  })

  it('should handle empty and whitespace-only class names', () => {
    expect(classNames('', ' ', 'foo', '   ', 'bar')).toBe('foo bar')
  })
})
