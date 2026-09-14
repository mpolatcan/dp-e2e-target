import { test } from 'node:test'
import assert from 'node:assert/strict'
import { slugify, truncateWords } from '../src/slugify.mjs'

test('slugify lowercases and joins with dashes', () => {
  assert.equal(slugify('Hello World!'), 'hello-world')
})

test('truncateWords returns text unchanged when it has fewer words than the limit', () => {
  assert.equal(truncateWords('hello world', 5), 'hello world')
})

test('truncateWords truncates longer text and appends an ellipsis', () => {
  assert.equal(truncateWords('one two three four five', 3), 'one two three…')
})

test('truncateWords returns an empty string when maxWords is 0', () => {
  assert.equal(truncateWords('one two three', 0), '')
})
