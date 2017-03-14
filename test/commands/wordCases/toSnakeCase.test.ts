import * as assert from 'assert'
import * as vscode from 'vscode'

import toSnakeCase from '../../../src/__/commands/wordCases/toSnakeCase'

suite("commands/wordCases/toSnakeCase", () =>{
    test("toSnakeCase", () => {
        assert.equal(undefined, toSnakeCase(undefined))
        assert.equal(null, toSnakeCase(null))
        assert.equal("", toSnakeCase(""))
        assert.equal(" ", toSnakeCase(" "))
        assert.equal("0", toSnakeCase("0"))

        assert.equal("THIS_IS_SNAKE", toSnakeCase("ThisIsSnake"))
        assert.equal("THIS_IS_SNAKE", toSnakeCase("thisIsSnake"))
        assert.equal("THIS_IS_SNAKE", toSnakeCase("this_is_Snake"))
        assert.equal("THIS_IS_SNAKE", toSnakeCase("THIS_IS_Snake"))
    })
})
