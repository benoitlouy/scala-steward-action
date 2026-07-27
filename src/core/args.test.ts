import test from 'ava'
import {parseArgs} from './args.js'

test('`parseArgs` → returns empty array on empty input', t => {
  t.deepEqual(parseArgs(''), [])
})

test('`parseArgs` → returns empty array on whitespace-only input', t => {
  t.deepEqual(parseArgs('   '), [])
})

test('`parseArgs` → splits simple space-separated arguments', t => {
  t.deepEqual(parseArgs('--foo bar --baz'), ['--foo', 'bar', '--baz'])
})

test('`parseArgs` → collapses repeated whitespace', t => {
  t.deepEqual(parseArgs('--foo   bar'), ['--foo', 'bar'])
})

test('`parseArgs` → keeps double-quoted values containing spaces as a single token', t => {
  t.deepEqual(parseArgs('--git-author-name "My Name"'), ['--git-author-name', 'My Name'])
})

test('`parseArgs` → keeps single-quoted values containing spaces as a single token', t => {
  t.deepEqual(parseArgs("--git-author-name 'My Name'"), ['--git-author-name', 'My Name'])
})

test('`parseArgs` → strips quotes attached to a flag value', t => {
  t.deepEqual(parseArgs('--message="hello world"'), ['--message=hello world'])
})

test('`parseArgs` → handles multiple quoted arguments', t => {
  t.deepEqual(
    parseArgs('--a "first value" --b "second value"'),
    ['--a', 'first value', '--b', 'second value'],
  )
})
