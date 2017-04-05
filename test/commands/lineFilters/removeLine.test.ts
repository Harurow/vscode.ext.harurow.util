import * as assert from 'assert'
import * as vscode from 'vscode'

import {
    contains,
    notContains,
    isMatch,
    isUnmatch,
    removeLineIfContains,
    removeLineIfNotContains,
    removeLineIfMatch,
    removeLineIfUnmatch,
} from '../../../src/commands/lineFilters/removeLine'

suite('commands/lineFilters/removeLine', () => {

    test('isMatch', () => {
        let _ = isMatch('[a-z]')

        assert.equal(false, _(undefined))
        assert.equal(false, _(null))
        assert.equal(false, _(''))
        assert.equal(false, _('0'))
        assert.equal(false, _('09876'))
        assert.equal(false, _('ABC'))
        assert.equal(true, _('097abc'))
    })

    test('isMatch - 2', () => {
        let _ = isMatch('0')

        assert.equal(false, _(undefined))
        assert.equal(false, _(null))
        assert.equal(false, _(''))
        assert.equal(true, _('0'))
    })

    test('isNotMatch', () => {
        let _ = isUnmatch('[a-z]')

        assert.equal(false, _(undefined))
        assert.equal(false, _(null))
        assert.equal(true, _(''))
        assert.equal(true, _('0'))
        assert.equal(true, _('09876'))
        assert.equal(true, _('ABC'))
        assert.equal(false, _('097abc'))
    })

    test('isNotMatch - 2', () => {
        let _ = isUnmatch('0')

        assert.equal(false, _(undefined))
        assert.equal(false, _(null))
        assert.equal(true, _(''))
        assert.equal(false, _('0'))
    })

    test('contains', () => {
        let _ = contains('abc')

        assert.equal(false, _(undefined))
        assert.equal(false, _(null))
        assert.equal(false, _(''))
        assert.equal(false, _('0'))
        assert.equal(false, _('09876'))
        assert.equal(false, _('ABC'))
        assert.equal(true, _('097abc'))
    })

    test('contains - 2', () => {
        let _ = contains('0')

        assert.equal(false, _(undefined))
        assert.equal(false, _(null))
        assert.equal(false, _(''))
        assert.equal(true, _('0'))
    })

    test('notContains', () => {
        let _ = notContains('abc')

        assert.equal(false, _(undefined))
        assert.equal(false, _(null))
        assert.equal(true, _(''))
        assert.equal(true, _('0'))
        assert.equal(true, _('09876'))
        assert.equal(true, _('ABC'))
        assert.equal(false, _('097abc'))
    })

    test('notContains - 2', () => {
        let _ = notContains('0')

        assert.equal(false, _(undefined))
        assert.equal(false, _(null))
        assert.equal(true, _(''))
        assert.equal(false, _('0'))
    })

    test('removeLineIfMatch', () => {
        let content = 'abc\ndef\n987\nthis is line.'

        assert.equal('987', removeLineIfMatch('[a-z]', content))
        assert.equal(content, removeLineIfMatch('[0-6]', content))
        assert.equal('abc\ndef\n987', removeLineIfMatch('i', content))
    })

    test('removeLineIfNotMatch', () => {
        let content = 'abc\ndef\n987\nthis is line.'

        assert.equal('abc\ndef\nthis is line.', removeLineIfUnmatch('[a-z]', content))
        assert.equal('', removeLineIfUnmatch('[0-6]', content))
        assert.equal('this is line.', removeLineIfUnmatch('i', content))
    })

    test('removeLineIfContains', () => {
        let content = 'abc\ndef\n987\nthis is line.'

        assert.equal(content, removeLineIfContains('[a-z]', content))
        assert.equal('abc\n987', removeLineIfContains('e', content))
        assert.equal('abc\ndef\n987', removeLineIfContains('i', content))
    })

    test('removeLineIfNotContains', () => {
        let content = 'abc\ndef\n987\nthis is line.'

        assert.equal('', removeLineIfNotContains('[a-z]', content))
        assert.equal('def\nthis is line.', removeLineIfNotContains('e', content))
        assert.equal('this is line.', removeLineIfNotContains('i', content))
    })

    test('removeLineIfMatch', () => {
        assert.equal('aabb', removeLineIfMatch('abc', 'aabb'))
        assert.equal('', removeLineIfMatch('abc', ''))
        assert.equal('', removeLineIfMatch('abc', 'abcb'))
        assert.equal('', removeLineIfMatch('abc', 'aabc'))
        assert.equal('bcc', removeLineIfMatch('abc', 'bcc'))

        assert.equal('aaa\nddd', removeLineIfMatch('abc', 'aaa\naabcc\nddd'))
        assert.equal('aaa\nddd', removeLineIfMatch('abc', 'aabcc\naaa\nddd'))
        assert.equal('aaa\nddd', removeLineIfMatch('abc', 'aaa\nddd\naabcc'))

        assert.equal('aaa', removeLineIfMatch('[d|c]', 'aaa\nddd\naabcc'))
        assert.equal('ddd\naabcc', removeLineIfMatch('a{3}', 'aaa\nddd\naabcc'))

        assert.equal('ABC\nddd', removeLineIfMatch('abc', 'ABC\nddd\naabcc'))
    })

    test('removeLineIfUnmatch', () => {
        assert.equal('', removeLineIfUnmatch('abc', 'aabb'))
        assert.equal('', removeLineIfUnmatch('abc', ''))
        assert.equal('abcb', removeLineIfUnmatch('abc', 'abcb'))
        assert.equal('aabc', removeLineIfUnmatch('abc', 'aabc'))
        assert.equal('', removeLineIfUnmatch('abc', 'bcc'))

        assert.equal('aabcc', removeLineIfUnmatch('abc', 'aaa\naabcc\nddd'))
        assert.equal('aabcc', removeLineIfUnmatch('abc', 'aabcc\naaa\nddd'))
        assert.equal('aabcc', removeLineIfUnmatch('abc', 'aaa\nddd\naabcc'))
    })

    test('removeLineIfContains', () => {
        assert.equal('aabb', removeLineIfContains('abc', 'aabb'))
        assert.equal('', removeLineIfContains('abc', ''))
        assert.equal('', removeLineIfContains('abc', 'abcb'))
        assert.equal('', removeLineIfContains('abc', 'aabc'))
        assert.equal('bcc', removeLineIfContains('abc', 'bcc'))

        assert.equal('aaa\nddd', removeLineIfContains('abc', 'aaa\naabcc\nddd'))
        assert.equal('aaa\nddd', removeLineIfContains('abc', 'aabcc\naaa\nddd'))
        assert.equal('aaa\nddd', removeLineIfContains('abc', 'aaa\nddd\naabcc'))

        assert.equal('ABC\nddd', removeLineIfContains('abc', 'ABC\nddd\naabcc'))
    })

    test('removeLineIfNotContains', () => {
        assert.equal('', removeLineIfNotContains('abc', 'aabb'))
        assert.equal('', removeLineIfNotContains('abc', ''))
        assert.equal('abcb', removeLineIfNotContains('abc', 'abcb'))
        assert.equal('aabc', removeLineIfNotContains('abc', 'aabc'))
        assert.equal('', removeLineIfNotContains('abc', 'bcc'))

        assert.equal('aabcc', removeLineIfNotContains('abc', 'aaa\naabcc\nddd'))
        assert.equal('aabcc', removeLineIfNotContains('abc', 'aabcc\naaa\nddd'))
        assert.equal('aabcc', removeLineIfNotContains('abc', 'aaa\nddd\naabcc'))
    })
})
