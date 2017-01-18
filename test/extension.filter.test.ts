import * as assert from 'assert'
import * as vscode from 'vscode'

import * as filter from '../src/linefilter'

suite("Fileter Tests", () => {

    test("removeMatchedLine", () => {
        assert.equal("aabb", filter.removeMatchedLine("abc", "aabb"))
        assert.equal("", filter.removeMatchedLine("abc", ""))
        assert.equal("", filter.removeMatchedLine("abc", "abcb"))
        assert.equal("", filter.removeMatchedLine("abc", "aabc"))
        assert.equal("bcc", filter.removeMatchedLine("abc", "bcc"))

        assert.equal("aaa\nddd", filter.removeMatchedLine("abc", "aaa\naabcc\nddd"))
        assert.equal("aaa\nddd", filter.removeMatchedLine("abc", "aabcc\naaa\nddd"))
        assert.equal("aaa\nddd\n", filter.removeMatchedLine("abc", "aaa\nddd\naabcc"))

        assert.equal("aaa\n", filter.removeMatchedLine("[d|c]", "aaa\nddd\naabcc"))
        assert.equal("ddd\naabcc", filter.removeMatchedLine("a{3}", "aaa\nddd\naabcc"))
    })

    test("removeUnmatchedLine", () => {
        assert.equal("", filter.removeUnmatchedLine("abc", "aabb"))
        assert.equal("", filter.removeUnmatchedLine("abc", ""))
        assert.equal("abcb", filter.removeUnmatchedLine("abc", "abcb"))
        assert.equal("aabc", filter.removeUnmatchedLine("abc", "aabc"))
        assert.equal("", filter.removeUnmatchedLine("abc", "bcc"))

        assert.equal("aabcc\n", filter.removeUnmatchedLine("abc", "aaa\naabcc\nddd"))
        assert.equal("aabcc\n", filter.removeUnmatchedLine("abc", "aabcc\naaa\nddd"))
        assert.equal("aabcc", filter.removeUnmatchedLine("abc", "aaa\nddd\naabcc"))
    })
    
    test("removeContainsLine", () => {
        assert.equal("aabb", filter.removeContainsLine("abc", "aabb"))
        assert.equal("", filter.removeContainsLine("abc", ""))
        assert.equal("", filter.removeContainsLine("abc", "abcb"))
        assert.equal("", filter.removeContainsLine("abc", "aabc"))
        assert.equal("bcc", filter.removeContainsLine("abc", "bcc"))

        assert.equal("aaa\nddd", filter.removeContainsLine("abc", "aaa\naabcc\nddd"))
        assert.equal("aaa\nddd", filter.removeContainsLine("abc", "aabcc\naaa\nddd"))
        assert.equal("aaa\nddd\n", filter.removeContainsLine("abc", "aaa\nddd\naabcc"))
    })

    test("removeNotContainsLine", () => {
        assert.equal("", filter.removeNotContainsLine("abc", "aabb"))
        assert.equal("", filter.removeNotContainsLine("abc", ""))
        assert.equal("abcb", filter.removeNotContainsLine("abc", "abcb"))
        assert.equal("aabc", filter.removeNotContainsLine("abc", "aabc"))
        assert.equal("", filter.removeNotContainsLine("abc", "bcc"))

        assert.equal("aabcc\n", filter.removeNotContainsLine("abc", "aaa\naabcc\nddd"))
        assert.equal("aabcc\n", filter.removeNotContainsLine("abc", "aabcc\naaa\nddd"))
        assert.equal("aabcc", filter.removeNotContainsLine("abc", "aaa\nddd\naabcc"))
    })
})
