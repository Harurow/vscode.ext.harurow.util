import * as assert from 'assert'
import * as vscode from 'vscode'

import * as $ from '../../../src/__/commands/lineFilters/removeLine'

suite('commands/lineFilters/removeLine', () => {

    test('isMatch', () => {
        let isMatch = $.isMatch('[a-z]')

        assert.equal(false, isMatch(undefined))
        assert.equal(false, isMatch(null))
        assert.equal(false, isMatch(''))
        assert.equal(false, isMatch('0'))
        assert.equal(false, isMatch('09876'))
        assert.equal(false, isMatch('ABC'))
        assert.equal(true, isMatch('097abc'))
    })

    test('isMatch - 2', () => {
        let isMatch = $.isMatch('0')

        assert.equal(false, isMatch(undefined))
        assert.equal(false, isMatch(null))
        assert.equal(false, isMatch(''))
        assert.equal(true, isMatch('0'))
    })
    
    test('isNotMatch', () => {
        let isNotMatch = $.isUnmatch('[a-z]')

        assert.equal(false, isNotMatch(undefined))
        assert.equal(false, isNotMatch(null))
        assert.equal(true, isNotMatch(''))
        assert.equal(true, isNotMatch('0'))
        assert.equal(true, isNotMatch('09876'))
        assert.equal(true, isNotMatch('ABC'))
        assert.equal(false, isNotMatch('097abc'))
    })

    test('isNotMatch - 2', () => {
        let isNotMatch = $.isUnmatch('0')

        assert.equal(false, isNotMatch(undefined))
        assert.equal(false, isNotMatch(null))
        assert.equal(true, isNotMatch(''))
        assert.equal(false, isNotMatch('0'))
    })

    test('contains', () => {
        let contains = $.contains('abc')

        assert.equal(false, contains(undefined))
        assert.equal(false, contains(null))
        assert.equal(false, contains(''))
        assert.equal(false, contains('0'))
        assert.equal(false, contains('09876'))
        assert.equal(false, contains('ABC'))
        assert.equal(true, contains('097abc'))
    })

    test('contains - 2', () => {
        let contains = $.contains('0')

        assert.equal(false, contains(undefined))
        assert.equal(false, contains(null))
        assert.equal(false, contains(''))
        assert.equal(true, contains('0'))
    })

    test('notContains', () => {
        let notContains = $.notContains('abc')

        assert.equal(false, notContains(undefined))
        assert.equal(false, notContains(null))
        assert.equal(true, notContains(''))
        assert.equal(true, notContains('0'))
        assert.equal(true, notContains('09876'))
        assert.equal(true, notContains('ABC'))
        assert.equal(false, notContains('097abc'))
    })

    test('notContains - 2', () => {
        let notContains = $.notContains('0')

        assert.equal(false, notContains(undefined))
        assert.equal(false, notContains(null))
        assert.equal(true, notContains(''))
        assert.equal(false, notContains('0'))
    })

    test('removeLineIfMatch', () => {
        let content = 'abc\ndef\n987\nthis is line.'

        assert.equal('987', $.removeLineIfMatch(content, '[a-z]'))
        assert.equal(content, $.removeLineIfMatch(content, '[0-6]'))
        assert.equal('abc\ndef\n987', $.removeLineIfMatch(content, 'i'))
    })

    test('removeLineIfNotMatch', () => {
        let content = 'abc\ndef\n987\nthis is line.'

        assert.equal('abc\ndef\nthis is line.', $.removeLineIfUnmatch(content, '[a-z]'))
        assert.equal('', $.removeLineIfUnmatch(content, '[0-6]'))
        assert.equal('this is line.', $.removeLineIfUnmatch(content, 'i'))
    })

    test('removeLineIfContains', () => {
        let content = 'abc\ndef\n987\nthis is line.'

        assert.equal(content, $.removeLineIfContains(content, '[a-z]'))
        assert.equal('abc\n987', $.removeLineIfContains(content, 'e'))
        assert.equal('abc\ndef\n987', $.removeLineIfContains(content, 'i'))
    })

    test('removeLineIfNotContains', () => {
        let content = 'abc\ndef\n987\nthis is line.'

        assert.equal('', $.removeLineIfNotContains(content, '[a-z]'))
        assert.equal('def\nthis is line.', $.removeLineIfNotContains(content, 'e'))
        assert.equal('this is line.', $.removeLineIfNotContains(content, 'i'))
    })
})