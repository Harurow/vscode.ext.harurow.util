import * as assert from 'assert'
import * as vscode from 'vscode'

import * as strutl from '../src/StringUtil'

suite("StringUtil Tests", () => {

    test("toUpperCaseWhenFirstChar", () => {
        assert.equal("Aabb", strutl.toUpperCaseWhenFirstChar("AaBb"))
        assert.equal("Aabb", strutl.toUpperCaseWhenFirstChar("AABB"))
        assert.equal("A", strutl.toUpperCaseWhenFirstChar("a"))
        assert.equal("1", strutl.toUpperCaseWhenFirstChar("1"))
        assert.equal("", strutl.toUpperCaseWhenFirstChar(""))
    })

    test("toUpperCaseFirstChar", () => {
        assert.equal("AaBb", strutl.toUpperCaseFirstChar("AaBb"))
        assert.equal("AABB", strutl.toUpperCaseFirstChar("AABB"))
        assert.equal("Aabb", strutl.toUpperCaseFirstChar("aabb"))
        assert.equal("AaBB", strutl.toUpperCaseFirstChar("aaBB"))
        assert.equal("A", strutl.toUpperCaseFirstChar("a"))
        assert.equal("1", strutl.toUpperCaseFirstChar("1"))
        assert.equal("", strutl.toUpperCaseFirstChar(""))
    })

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

    test("toUpperSnakeCase", () => {
        assert.equal("HELLO_WORLD10", strutl.toUpperSnakeCase("Hello_World10"))
        assert.equal("HELLO_WORLD_10", strutl.toUpperSnakeCase("Hello_World_10"))
        assert.equal("HELLO_WORLD10", strutl.toUpperSnakeCase("hello_world10"))
        assert.equal("HELLO_WORLD_10", strutl.toUpperSnakeCase("hello_world_10"))
        assert.equal("HELLO__WORLD__10", strutl.toUpperSnakeCase("hello__world__10"))
        assert.equal("HELLO_WORLD10", strutl.toUpperSnakeCase("HELLO_WORLD10"))
        assert.equal("HELLO_WORLD_10", strutl.toUpperSnakeCase("HELLO_WORLD_10"))
        assert.equal("HELLO_WORLD10", strutl.toUpperSnakeCase("HELLO_WORLD10"))
        assert.equal("HELLO_WORLD_10", strutl.toUpperSnakeCase("HELLO_WORLD_10"))
        assert.equal("__HELLO__WORLD__10", strutl.toUpperSnakeCase("__HELLO__WORLD__10"))
        assert.equal("HELLO_WORLD_10_GOOD_BYE", strutl.toUpperSnakeCase("hello_world_10_good_bye"))
        assert.equal("HELLO_WORLD10_GOOD_BYE", strutl.toUpperSnakeCase("hello_world10good_bye"))
        assert.equal("HELLO_WORLD_10_GOOD_BYE", strutl.toUpperSnakeCase("HELLO_WORLD_10_GOOD_BYE"))
        assert.equal("HELLO_WORLD10_GOOD_BYE", strutl.toUpperSnakeCase("HELLO_WORLD10GOOD_BYE"))
        
        assert.equal("HELLO_WORLD10", strutl.toUpperSnakeCase("HelloWorld10"))
        assert.equal("HELLO_WORLD_10", strutl.toUpperSnakeCase("HelloWorld_10"))
        assert.equal("HELLO_WORLD10", strutl.toUpperSnakeCase("helloWorld10"))
        assert.equal("HELLO_WORLD_10", strutl.toUpperSnakeCase("helloWorld_10"))

        assert.equal("_", strutl.toUpperSnakeCase("_"))
        assert.equal("__", strutl.toUpperSnakeCase("__"))

        assert.equal("HELLO_WORLD   WORLD  HELLO_WORLD 10 _",
                strutl.toUpperSnakeCase("hello_world   world  HelloWorld 10 _"))
    })
    
    test("toLowerSnakeCase", () => {
        assert.equal("hello_world10", strutl.toLowerSnakeCase("Hello_World10"))
        assert.equal("hello_world_10", strutl.toLowerSnakeCase("Hello_World_10"))
        assert.equal("hello_world10", strutl.toLowerSnakeCase("hello_world10"))
        assert.equal("hello_world_10", strutl.toLowerSnakeCase("hello_world_10"))
        assert.equal("hello__world__10", strutl.toLowerSnakeCase("hello__world__10"))
        assert.equal("hello_world10", strutl.toLowerSnakeCase("HELLO_WORLD10"))
        assert.equal("hello_world_10", strutl.toLowerSnakeCase("HELLO_WORLD_10"))
        assert.equal("hello_world10", strutl.toLowerSnakeCase("HELLO_WORLD10"))
        assert.equal("hello_world_10", strutl.toLowerSnakeCase("HELLO_WORLD_10"))
        assert.equal("__hello__world__10", strutl.toLowerSnakeCase("__HELLO__WORLD__10"))
        assert.equal("hello_world_10_good_bye", strutl.toLowerSnakeCase("hello_world_10_good_bye"))
        assert.equal("hello_world10_good_bye", strutl.toLowerSnakeCase("hello_world10good_bye"))
        assert.equal("hello_world_10_good_bye", strutl.toLowerSnakeCase("HELLO_WORLD_10_GOOD_BYE"))
        assert.equal("hello_world10_good_bye", strutl.toLowerSnakeCase("HELLO_WORLD10GOOD_BYE"))
        
        assert.equal("hello_world10", strutl.toLowerSnakeCase("HelloWorld10"))
        assert.equal("hello_world_10", strutl.toLowerSnakeCase("HelloWorld_10"))
        assert.equal("hello_world10", strutl.toLowerSnakeCase("helloWorld10"))
        assert.equal("hello_world_10", strutl.toLowerSnakeCase("helloWorld_10"))

        assert.equal("_", strutl.toLowerSnakeCase("_"))
        assert.equal("__", strutl.toLowerSnakeCase("__"))

        assert.equal("hello_world   world  hello_world 10 _",
                strutl.toLowerSnakeCase("hello_world   world  HelloWorld 10 _"))
    })
})
