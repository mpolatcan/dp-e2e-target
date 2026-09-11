import { test } from 'node:test'
import assert from 'node:assert/strict'
import { slugify, padTo } from '../src/slugify.mjs'

test('slugify lowercases and joins with dashes', () => {
  assert.equal(slugify('Hello World!'), 'hello-world')
})

test('padTo returns text unchanged when already at or above width', () => {
  assert.equal(padTo('abc', 3), 'abc')
  assert.equal(padTo('hello', 3), 'hello')
})

test('padTo appends the default space fill up to width', () => {
  assert.equal(padTo('ab', 5), 'ab   ')
})

test('padTo truncates the final copy of a multi-character fill', () => {
  assert.equal(padTo('ab', 7, 'xy'), 'abxyxyx')
})

test('padTo returns text unchanged for an empty fill', () => {
  assert.equal(padTo('ab', 5, ''), 'ab')
})

test('padTo counts code points and never splits a surrogate pair', () => {
  // '💥' is one code point (a surrogate pair); it must be added whole.
  assert.equal(padTo('a', 2, '💥x'), 'a💥')
  assert.equal([...padTo('a', 3, '💥')].length, 3)
})
