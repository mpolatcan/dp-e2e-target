import { test } from 'node:test'
import assert from 'node:assert/strict'
import { slugify, truncate } from '../src/slugify.mjs'

test('slugify lowercases and joins with dashes', () => {
  assert.equal(slugify('Hello World!'), 'hello-world')
})

test('truncate returns a string no longer than max unchanged', () => {
  assert.equal(truncate('hello', 10), 'hello')
  assert.equal(truncate('hello', 5), 'hello')
})

test('truncate cuts a long string to exactly max characters with an ellipsis', () => {
  assert.equal(truncate('hello world', 8), 'hello w…')
  assert.equal([...truncate('hello world', 8)].length, 8)
})

test('truncate returns an empty string when max is below 1', () => {
  assert.equal(truncate('hello', 0), '')
  assert.equal(truncate('hello', -3), '')
})

test('truncate never splits a surrogate pair at the cut boundary', () => {
  const out = truncate('😀😀😀😀', 3)
  assert.equal(out, '😀😀…')
  assert.equal([...out].length, 3)
  const hasLoneSurrogate = /[\uD800-\uDFFF]/.test(out.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, ''))
  assert.equal(hasLoneSurrogate, false)
})
