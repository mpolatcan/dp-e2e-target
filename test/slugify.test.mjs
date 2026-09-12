import { test } from 'node:test'
import assert from 'node:assert/strict'
import { slugify, padTo } from '../src/slugify.mjs'

test('slugify lowercases and joins with dashes', () => {
  assert.equal(slugify('Hello World!'), 'hello-world')
})

test('padTo returns text unchanged when already at or above width', () => {
  assert.equal(padTo('hello', 5), 'hello')
  assert.equal(padTo('hello', 3), 'hello')
})

test('padTo pads below-width text with the default space fill', () => {
  assert.equal(padTo('hi', 5), 'hi   ')
})

test('padTo truncates a multi-character fill to hit the width exactly', () => {
  assert.equal(padTo('x', 4, 'ab'), 'xaba')
})

test('padTo returns text unchanged when fill is the empty string', () => {
  assert.equal(padTo('hi', 5, ''), 'hi')
})

test('padTo does not split a surrogate pair when truncating the fill', () => {
  // '😀' is one user-perceived character but two UTF-16 code units; the final
  // truncated copy of `fill` must keep it whole rather than emit half a pair.
  assert.equal(padTo('', 1, '😀b'), '😀')
})
