import { test } from 'node:test'
import assert from 'node:assert/strict'
import { slugify, titleCase } from '../src/slugify.mjs'

test('slugify lowercases and joins with dashes', () => {
  assert.equal(slugify('Hello World!'), 'hello-world')
})

test('titleCase capitalizes each word of a sentence', () => {
  assert.equal(titleCase('the quick brown fox'), 'The Quick Brown Fox')
})

test('titleCase lowercases the rest of an already-uppercase input', () => {
  assert.equal(titleCase('HELLO WORLD'), 'Hello World')
})

test('titleCase returns an empty string for empty input', () => {
  assert.equal(titleCase(''), '')
})
