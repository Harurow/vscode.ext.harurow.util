import * as assert from 'assert'
import * as vscode from 'vscode'

import toLowerSnakeCase from '../../../src/__/commands/wordCases/toLowerSnakeCase'

suite("commands/wordCases/toLowerSnakeCase", () =>{
    test("toLowerSnakeCase", () => {
        assert.equal(undefined, toLowerSnakeCase(undefined))
        assert.equal(null, toLowerSnakeCase(null))
        assert.equal("", toLowerSnakeCase(""))
        assert.equal(" ", toLowerSnakeCase(" "))
        assert.equal("0", toLowerSnakeCase("0"))

        assert.equal("this_is_snake", toLowerSnakeCase("ThisIsSnake"))
        assert.equal("this_is_snake", toLowerSnakeCase("thisIsSnake"))
        assert.equal("this_is_snake", toLowerSnakeCase("this_is_Snake"))
        assert.equal("this_is_snake", toLowerSnakeCase("THIS_IS_Snake"))
    })
})
