import * as assert from 'assert'
import * as vscode from 'vscode'

import * as strutl from '../../../src/commands/caseConverters/index'

suite("commands.caseConverters Tests", () => {

    test("toPascalCase", () => {
        assert.equal("HelloWorld10", strutl.toPascalCase("Hello_World10"))
        assert.equal("HelloWorld10", strutl.toPascalCase("Hello_World_10"))
        assert.equal("HelloWorld10", strutl.toPascalCase("hello_world10"))
        assert.equal("HelloWorld10", strutl.toPascalCase("hello_world_10"))
        assert.equal("HelloWorld10", strutl.toPascalCase("hello__world__10"))
        assert.equal("HelloWorld10", strutl.toPascalCase("HELLO_WORLD10"))
        assert.equal("HelloWorld10", strutl.toPascalCase("HELLO_WORLD_10"))
        assert.equal("HelloWorld10", strutl.toPascalCase("HELLO_WORLD10"))
        assert.equal("HelloWorld10", strutl.toPascalCase("HELLO_WORLD_10"))
        assert.equal("HelloWorld10", strutl.toPascalCase("__HELLO__WORLD__10"))
        assert.equal("HelloWorld10GoodBye", strutl.toPascalCase("hello_world_10_good_bye"))
        assert.equal("HelloWorld10GoodBye", strutl.toPascalCase("hello_world10good_bye"))
        assert.equal("HelloWorld10GoodBye", strutl.toPascalCase("HELLO_WORLD_10_GOOD_BYE"))
        assert.equal("HelloWorld10GoodBye", strutl.toPascalCase("HELLO_WORLD10GOOD_BYE"))
        
        assert.equal("HelloWorld10", strutl.toPascalCase("HelloWorld10"))
        assert.equal("Helloworld10", strutl.toPascalCase("Helloworld_10"))
        assert.equal("HelloWorld10", strutl.toPascalCase("helloWorld10"))
        assert.equal("HelloWorld10", strutl.toPascalCase("helloWorld_10"))

        assert.equal("_", strutl.toPascalCase("_"))
        assert.equal("__", strutl.toPascalCase("__"))

        assert.equal("HelloWorld   World  HelloWorld 10 _",
                strutl.toPascalCase("hello_world   world  HelloWorld 10 _"))
    })

    test("toCamelCase", () => {
        assert.equal("helloWorld10", strutl.toCamelCase("Hello_World10"))
        assert.equal("helloWorld10", strutl.toCamelCase("Hello_World_10"))
        assert.equal("helloWorld10", strutl.toCamelCase("hello_world10"))
        assert.equal("helloWorld10", strutl.toCamelCase("hello_world_10"))
        assert.equal("helloWorld10", strutl.toCamelCase("hello__world__10"))
        assert.equal("helloWorld10", strutl.toCamelCase("HELLO_WORLD10"))
        assert.equal("helloWorld10", strutl.toCamelCase("HELLO_WORLD_10"))
        assert.equal("helloWorld10", strutl.toCamelCase("HELLO_WORLD10"))
        assert.equal("helloWorld10", strutl.toCamelCase("HELLO_WORLD_10"))
        assert.equal("helloWorld10", strutl.toCamelCase("__HELLO__WORLD__10"))
        assert.equal("helloWorld10GoodBye", strutl.toCamelCase("hello_world_10_good_bye"))
        assert.equal("helloWorld10GoodBye", strutl.toCamelCase("hello_world10good_bye"))
        assert.equal("helloWorld10GoodBye", strutl.toCamelCase("HELLO_WORLD_10_GOOD_BYE"))
        assert.equal("helloWorld10GoodBye", strutl.toCamelCase("HELLO_WORLD10GOOD_BYE"))
        
        assert.equal("helloWorld10", strutl.toCamelCase("HelloWorld10"))
        assert.equal("helloworld10", strutl.toCamelCase("Helloworld_10"))
        assert.equal("helloWorld10", strutl.toCamelCase("helloWorld10"))
        assert.equal("helloWorld10", strutl.toCamelCase("helloWorld_10"))

        assert.equal("_", strutl.toCamelCase("_"))
        assert.equal("__", strutl.toCamelCase("__"))

        assert.equal("helloWorld   world  helloWorld 10 _",
                strutl.toCamelCase("hello_world   world  HelloWorld 10 _"))
    })

    test("toUpperSnake", () => {
        assert.equal("HELLO_WORLD10", strutl.toUpperSnake("Hello_World10"))
        assert.equal("HELLO_WORLD_10", strutl.toUpperSnake("Hello_World_10"))
        assert.equal("HELLO_WORLD10", strutl.toUpperSnake("hello_world10"))
        assert.equal("HELLO_WORLD_10", strutl.toUpperSnake("hello_world_10"))
        assert.equal("HELLO__WORLD__10", strutl.toUpperSnake("hello__world__10"))
        assert.equal("HELLO_WORLD10", strutl.toUpperSnake("HELLO_WORLD10"))
        assert.equal("HELLO_WORLD_10", strutl.toUpperSnake("HELLO_WORLD_10"))
        assert.equal("HELLO_WORLD10", strutl.toUpperSnake("HELLO_WORLD10"))
        assert.equal("HELLO_WORLD_10", strutl.toUpperSnake("HELLO_WORLD_10"))
        assert.equal("__HELLO__WORLD__10", strutl.toUpperSnake("__HELLO__WORLD__10"))
        assert.equal("HELLO_WORLD_10_GOOD_BYE", strutl.toUpperSnake("hello_world_10_good_bye"))
        assert.equal("HELLO_WORLD10_GOOD_BYE", strutl.toUpperSnake("hello_world10good_bye"))
        assert.equal("HELLO_WORLD_10_GOOD_BYE", strutl.toUpperSnake("HELLO_WORLD_10_GOOD_BYE"))
        assert.equal("HELLO_WORLD10_GOOD_BYE", strutl.toUpperSnake("HELLO_WORLD10GOOD_BYE"))
        
        assert.equal("HELLO_WORLD10", strutl.toUpperSnake("HelloWorld10"))
        assert.equal("HELLO_WORLD_10", strutl.toUpperSnake("HelloWorld_10"))
        assert.equal("HELLO_WORLD10", strutl.toUpperSnake("helloWorld10"))
        assert.equal("HELLO_WORLD_10", strutl.toUpperSnake("helloWorld_10"))

        assert.equal("_", strutl.toUpperSnake("_"))
        assert.equal("__", strutl.toUpperSnake("__"))

        assert.equal("HELLO_WORLD   WORLD  HELLO_WORLD 10 _",
                strutl.toUpperSnake("hello_world   world  HelloWorld 10 _"))
    })
    
    test("toLowerSnake", () => {
        assert.equal("hello_world10", strutl.toLowerSnake("Hello_World10"))
        assert.equal("hello_world_10", strutl.toLowerSnake("Hello_World_10"))
        assert.equal("hello_world10", strutl.toLowerSnake("hello_world10"))
        assert.equal("hello_world_10", strutl.toLowerSnake("hello_world_10"))
        assert.equal("hello__world__10", strutl.toLowerSnake("hello__world__10"))
        assert.equal("hello_world10", strutl.toLowerSnake("HELLO_WORLD10"))
        assert.equal("hello_world_10", strutl.toLowerSnake("HELLO_WORLD_10"))
        assert.equal("hello_world10", strutl.toLowerSnake("HELLO_WORLD10"))
        assert.equal("hello_world_10", strutl.toLowerSnake("HELLO_WORLD_10"))
        assert.equal("__hello__world__10", strutl.toLowerSnake("__HELLO__WORLD__10"))
        assert.equal("hello_world_10_good_bye", strutl.toLowerSnake("hello_world_10_good_bye"))
        assert.equal("hello_world10_good_bye", strutl.toLowerSnake("hello_world10good_bye"))
        assert.equal("hello_world_10_good_bye", strutl.toLowerSnake("HELLO_WORLD_10_GOOD_BYE"))
        assert.equal("hello_world10_good_bye", strutl.toLowerSnake("HELLO_WORLD10GOOD_BYE"))
        
        assert.equal("hello_world10", strutl.toLowerSnake("HelloWorld10"))
        assert.equal("hello_world_10", strutl.toLowerSnake("HelloWorld_10"))
        assert.equal("hello_world10", strutl.toLowerSnake("helloWorld10"))
        assert.equal("hello_world_10", strutl.toLowerSnake("helloWorld_10"))

        assert.equal("_", strutl.toLowerSnake("_"))
        assert.equal("__", strutl.toLowerSnake("__"))

        assert.equal("hello_world   world  hello_world 10 _",
                strutl.toLowerSnake("hello_world   world  HelloWorld 10 _"))
    })
})
