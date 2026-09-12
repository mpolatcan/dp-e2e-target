import { test } from 'node:test'
import assert from 'node:assert/strict'
import { slugify, truncateWords } from '../src/slugify.mjs'

test('slugify lowercases and joins with dashes', () => {
  assert.equal(slugify('Hello World!'), 'hello-world')
})

test('truncateWords returns text unchanged when shorter than maxWords', () => {
  assert.equal(truncateWords('one two three', 5), 'one two three')
})

test('truncateWords truncates longer text and appends an ellipsis', () => {
  assert.equal(truncateWords('one two three four', 2), 'one two…')
})

test('truncateWords returns an empty string for maxWords of 0', () => {
  assert.equal(truncateWords('one two three', 0), '')
})
