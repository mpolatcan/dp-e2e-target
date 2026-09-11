import { test } from 'node:test'
import assert from 'node:assert/strict'
import { slugify, wordWrap } from '../src/slugify.mjs'

test('slugify lowercases and joins with dashes', () => {
  assert.equal(slugify('Hello World!'), 'hello-world')
})

test('wordWrap keeps text shorter than width on one line', () => {
  assert.deepEqual(wordWrap('hello world', 20), ['hello world'])
})

test('wordWrap wraps text across several lines without exceeding width', () => {
  assert.deepEqual(wordWrap('alpha beta gamma delta', 11), ['alpha beta', 'gamma delta'])
})

test('wordWrap gives a single word longer than width its own unbroken line', () => {
  assert.deepEqual(wordWrap('supercalifragilistic tiny', 5), ['supercalifragilistic', 'tiny'])
})

test('wordWrap produces no lines for empty input', () => {
  assert.deepEqual(wordWrap('', 10), [])
})
