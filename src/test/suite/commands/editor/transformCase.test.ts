import * as assert from 'assert'
import '../../../../utils/string.extension'
import {
  transformToUpperCamel,
  transformToLowerCamel,
  transformToUpperSnake,
  transformToLowerSnake,
  transformToLowerChain,
  transformToUpperChain,
} from '../../../../commands/editor/edit/transCase'

suite('transformCase Test Suite', () => {
  console.log('start transformCase tests.')

  test('transformToUpperCamel', () => {
    assert.strictEqual(transformToUpperCamel(''), '')
    assert.strictEqual(transformToUpperCamel('a'), 'A')
    assert.strictEqual(transformToUpperCamel('a_b'), 'AB')
    assert.strictEqual(transformToUpperCamel('a-b'), 'AB')
    assert.strictEqual(transformToUpperCamel('aB'), 'AB')
    assert.strictEqual(transformToUpperCamel('aBb'), 'ABb')
    assert.strictEqual(transformToUpperCamel('aBbC'), 'ABbC')
    assert.strictEqual(transformToUpperCamel('ThisIsUpperCamelCase'), 'ThisIsUpperCamelCase')
    assert.strictEqual(transformToUpperCamel('thisIsLowerCamelCase'), 'ThisIsLowerCamelCase')
    assert.strictEqual(transformToUpperCamel('this-is-lower-chain-case'), 'ThisIsLowerChainCase')
    assert.strictEqual(transformToUpperCamel('THIS-IS-UPPER-CHAIN-CASE'), 'ThisIsUpperChainCase')
    assert.strictEqual(transformToUpperCamel('this_is_lower_snake_case'), 'ThisIsLowerSnakeCase')
    assert.strictEqual(transformToUpperCamel('THIS_IS_UPPER_SNAKE_CASE'), 'ThisIsUpperSnakeCase')
    assert.strictEqual(transformToUpperCamel('DBStore'), 'DbStore')
    assert.strictEqual(transformToUpperCamel('DB0store'), 'Db0Store')

    assert.strictEqual(transformToUpperCamel('__db__'), '__Db__')
    assert.strictEqual(transformToUpperCamel('private_'), 'Private_')
    assert.strictEqual(transformToUpperCamel('_private'), '_Private')
  })

  test('transformToLowerCamel', () => {
    assert.strictEqual(transformToLowerCamel(''), '')
    assert.strictEqual(transformToLowerCamel('a'), 'a')
    assert.strictEqual(transformToLowerCamel('a_b'), 'aB')
    assert.strictEqual(transformToLowerCamel('a-b'), 'aB')
    assert.strictEqual(transformToLowerCamel('aB'), 'aB')
    assert.strictEqual(transformToLowerCamel('aBb'), 'aBb')
    assert.strictEqual(transformToLowerCamel('aBbC'), 'aBbC')
    assert.strictEqual(transformToLowerCamel('ThisIsUpperCamelCase'), 'thisIsUpperCamelCase')
    assert.strictEqual(transformToLowerCamel('thisIsLowerCamelCase'), 'thisIsLowerCamelCase')
    assert.strictEqual(transformToLowerCamel('this-is-lower-chain-case'), 'thisIsLowerChainCase')
    assert.strictEqual(transformToLowerCamel('THIS-IS-UPPER-CHAIN-CASE'), 'thisIsUpperChainCase')
    assert.strictEqual(transformToLowerCamel('this_is_lower_snake_case'), 'thisIsLowerSnakeCase')
    assert.strictEqual(transformToLowerCamel('THIS_IS_UPPER_SNAKE_CASE'), 'thisIsUpperSnakeCase')
    assert.strictEqual(transformToLowerCamel('DBStore'), 'dbStore')
    assert.strictEqual(transformToLowerCamel('DB0store'), 'db0Store')

    assert.strictEqual(transformToLowerCamel('__db__'), '__db__')
    assert.strictEqual(transformToLowerCamel('private_'), 'private_')
    assert.strictEqual(transformToLowerCamel('_private'), '_private')
  })

  test('transformToLowerCamel', () => {
    assert.strictEqual(transformToLowerCamel(''), '')
    assert.strictEqual(transformToLowerCamel('a'), 'a')
    assert.strictEqual(transformToLowerCamel('a_b'), 'aB')
    assert.strictEqual(transformToLowerCamel('a-b'), 'aB')
    assert.strictEqual(transformToLowerCamel('aB'), 'aB')
    assert.strictEqual(transformToLowerCamel('aBb'), 'aBb')
    assert.strictEqual(transformToLowerCamel('aBbC'), 'aBbC')
    assert.strictEqual(transformToLowerCamel('ThisIsUpperCamelCase'), 'thisIsUpperCamelCase')
    assert.strictEqual(transformToLowerCamel('thisIsLowerCamelCase'), 'thisIsLowerCamelCase')
    assert.strictEqual(transformToLowerCamel('this-is-lower-chain-case'), 'thisIsLowerChainCase')
    assert.strictEqual(transformToLowerCamel('THIS-IS-UPPER-CHAIN-CASE'), 'thisIsUpperChainCase')
    assert.strictEqual(transformToLowerCamel('this_is_lower_snake_case'), 'thisIsLowerSnakeCase')
    assert.strictEqual(transformToLowerCamel('THIS_IS_UPPER_SNAKE_CASE'), 'thisIsUpperSnakeCase')
    assert.strictEqual(transformToLowerCamel('DBStore'), 'dbStore')
    assert.strictEqual(transformToLowerCamel('DB0store'), 'db0Store')

    assert.strictEqual(transformToLowerCamel('__db__'), '__db__')
    assert.strictEqual(transformToLowerCamel('private_'), 'private_')
    assert.strictEqual(transformToLowerCamel('_private'), '_private')
  })

  test('transformToUpperSnake', () => {
    assert.strictEqual(transformToUpperSnake(''), '')
    assert.strictEqual(transformToUpperSnake('a'), 'A')
    assert.strictEqual(transformToUpperSnake('a_b'), 'A_B')
    assert.strictEqual(transformToUpperSnake('a-b'), 'A_B')
    assert.strictEqual(transformToUpperSnake('aB'), 'A_B')
    assert.strictEqual(transformToUpperSnake('aBb'), 'A_BB')
    assert.strictEqual(transformToUpperSnake('aBbC'), 'A_BB_C')
    assert.strictEqual(transformToUpperSnake('ThisIsUpperCamelCase'), 'THIS_IS_UPPER_CAMEL_CASE')
    assert.strictEqual(transformToUpperSnake('thisIsLowerCamelCase'), 'THIS_IS_LOWER_CAMEL_CASE')
    assert.strictEqual(transformToUpperSnake('this-is-lower-chain-case'), 'THIS_IS_LOWER_CHAIN_CASE')
    assert.strictEqual(transformToUpperSnake('THIS-IS-UPPER-CHAIN-CASE'), 'THIS_IS_UPPER_CHAIN_CASE')
    assert.strictEqual(transformToUpperSnake('this_is_lower_snake_case'), 'THIS_IS_LOWER_SNAKE_CASE')
    assert.strictEqual(transformToUpperSnake('THIS_IS_UPPER_SNAKE_CASE'), 'THIS_IS_UPPER_SNAKE_CASE')
    assert.strictEqual(transformToUpperSnake('DBStore'), 'DB_STORE')
    assert.strictEqual(transformToUpperSnake('DB0store'), 'DB_0_STORE')

    assert.strictEqual(transformToUpperSnake('__db__'), '__DB__')
    assert.strictEqual(transformToUpperSnake('private_'), 'PRIVATE_')
    assert.strictEqual(transformToUpperSnake('_private'), '_PRIVATE')
  })

  test('transformToLowerSnake', () => {
    assert.strictEqual(transformToLowerSnake(''), '')
    assert.strictEqual(transformToLowerSnake('a'), 'a')
    assert.strictEqual(transformToLowerSnake('a_b'), 'a_b')
    assert.strictEqual(transformToLowerSnake('a-b'), 'a_b')
    assert.strictEqual(transformToLowerSnake('aB'), 'a_b')
    assert.strictEqual(transformToLowerSnake('aBb'), 'a_bb')
    assert.strictEqual(transformToLowerSnake('aBbC'), 'a_bb_c')
    assert.strictEqual(transformToLowerSnake('ThisIsUpperCamelCase'), 'this_is_upper_camel_case')
    assert.strictEqual(transformToLowerSnake('thisIsLowerCamelCase'), 'this_is_lower_camel_case')
    assert.strictEqual(transformToLowerSnake('this-is-lower-chain-case'), 'this_is_lower_chain_case')
    assert.strictEqual(transformToLowerSnake('THIS-IS-UPPER-CHAIN-CASE'), 'this_is_upper_chain_case')
    assert.strictEqual(transformToLowerSnake('this_is_lower_snake_case'), 'this_is_lower_snake_case')
    assert.strictEqual(transformToLowerSnake('THIS_IS_UPPER_SNAKE_CASE'), 'this_is_upper_snake_case')
    assert.strictEqual(transformToLowerSnake('DBStore'), 'db_store')
    assert.strictEqual(transformToLowerSnake('DB0store'), 'db_0_store')

    assert.strictEqual(transformToLowerSnake('__db__'), '__db__')
    assert.strictEqual(transformToLowerSnake('private_'), 'private_')
    assert.strictEqual(transformToLowerSnake('_private'), '_private')
  })

  test('transformToUpperChain', () => {
    assert.strictEqual(transformToUpperChain(''), '')
    assert.strictEqual(transformToUpperChain('a'), 'A')
    assert.strictEqual(transformToUpperChain('a-b'), 'A-B')
    assert.strictEqual(transformToUpperChain('a-b'), 'A-B')
    assert.strictEqual(transformToUpperChain('aB'), 'A-B')
    assert.strictEqual(transformToUpperChain('aBb'), 'A-BB')
    assert.strictEqual(transformToUpperChain('aBbC'), 'A-BB-C')
    assert.strictEqual(transformToUpperChain('ThisIsUpperCamelCase'), 'THIS-IS-UPPER-CAMEL-CASE')
    assert.strictEqual(transformToUpperChain('thisIsLowerCamelCase'), 'THIS-IS-LOWER-CAMEL-CASE')
    assert.strictEqual(transformToUpperChain('this-is-lower-chain-case'), 'THIS-IS-LOWER-CHAIN-CASE')
    assert.strictEqual(transformToUpperChain('THIS-IS-UPPER-CHAIN-CASE'), 'THIS-IS-UPPER-CHAIN-CASE')
    assert.strictEqual(transformToUpperChain('this-is-lower-snake-case'), 'THIS-IS-LOWER-SNAKE-CASE')
    assert.strictEqual(transformToUpperChain('THIS-IS-UPPER-SNAKE-CASE'), 'THIS-IS-UPPER-SNAKE-CASE')
    assert.strictEqual(transformToUpperChain('DBStore'), 'DB-STORE')
    assert.strictEqual(transformToUpperChain('DB0store'), 'DB-0-STORE')

    assert.strictEqual(transformToUpperChain('__db__'), '__DB__')
    assert.strictEqual(transformToUpperChain('private_'), 'PRIVATE_')
    assert.strictEqual(transformToUpperChain('_private'), '_PRIVATE')
  })

  test('transformToLowerChain', () => {
    assert.strictEqual(transformToLowerChain(''), '')
    assert.strictEqual(transformToLowerChain('a'), 'a')
    assert.strictEqual(transformToLowerChain('a-b'), 'a-b')
    assert.strictEqual(transformToLowerChain('a-b'), 'a-b')
    assert.strictEqual(transformToLowerChain('aB'), 'a-b')
    assert.strictEqual(transformToLowerChain('aBb'), 'a-bb')
    assert.strictEqual(transformToLowerChain('aBbC'), 'a-bb-c')
    assert.strictEqual(transformToLowerChain('ThisIsUpperCamelCase'), 'this-is-upper-camel-case')
    assert.strictEqual(transformToLowerChain('thisIsLowerCamelCase'), 'this-is-lower-camel-case')
    assert.strictEqual(transformToLowerChain('this-is-lower-chain-case'), 'this-is-lower-chain-case')
    assert.strictEqual(transformToLowerChain('THIS-IS-UPPER-CHAIN-CASE'), 'this-is-upper-chain-case')
    assert.strictEqual(transformToLowerChain('this-is-lower-snake-case'), 'this-is-lower-snake-case')
    assert.strictEqual(transformToLowerChain('THIS-IS-UPPER-SNAKE-CASE'), 'this-is-upper-snake-case')
    assert.strictEqual(transformToLowerChain('DBStore'), 'db-store')
    assert.strictEqual(transformToLowerChain('DB0store'), 'db-0-store')

    assert.strictEqual(transformToLowerChain('__db__'), '__db__')
    assert.strictEqual(transformToLowerChain('private_'), 'private_')
    assert.strictEqual(transformToLowerChain('_private'), '_private')
  })
})
