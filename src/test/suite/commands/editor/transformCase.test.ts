import * as assert from 'assert'
import '../../../../utils/string.extension'
import {
  transformToUpperCamel,
  transformToLowerCamel,
  transformToUpperSnake,
  transformToLowerSnake,
  transformToLowerChain,
  transformToUpperChain
} from '../../../../commands/editor/edit/transCase'

suite('transformCase Test Suite', () => {
  console.log('start transformCase tests.')

  test('transformToUpperCamel', () => {
    assert.equal(transformToUpperCamel(''), '')
    assert.equal(transformToUpperCamel('a'), 'A')
    assert.equal(transformToUpperCamel('a_b'), 'AB')
    assert.equal(transformToUpperCamel('a-b'), 'AB')
    assert.equal(transformToUpperCamel('aB'), 'AB')
    assert.equal(transformToUpperCamel('aBb'), 'ABb')
    assert.equal(transformToUpperCamel('aBbC'), 'ABbC')
    assert.equal(transformToUpperCamel('ThisIsUpperCamelCase'), 'ThisIsUpperCamelCase')
    assert.equal(transformToUpperCamel('thisIsLowerCamelCase'), 'ThisIsLowerCamelCase')
    assert.equal(transformToUpperCamel('this-is-lower-chain-case'), 'ThisIsLowerChainCase')
    assert.equal(transformToUpperCamel('THIS-IS-UPPER-CHAIN-CASE'), 'ThisIsUpperChainCase')
    assert.equal(transformToUpperCamel('this_is_lower_snake_case'), 'ThisIsLowerSnakeCase')
    assert.equal(transformToUpperCamel('THIS_IS_UPPER_SNAKE_CASE'), 'ThisIsUpperSnakeCase')
    assert.equal(transformToUpperCamel('DBStore'), 'DbStore')
    assert.equal(transformToUpperCamel('DB0store'), 'Db0Store')

    assert.equal(transformToUpperCamel('__db__'), '__Db__')
    assert.equal(transformToUpperCamel('private_'), 'Private_')
    assert.equal(transformToUpperCamel('_private'), '_Private')
  })

  test('transformToLowerCamel', () => {
    assert.equal(transformToLowerCamel(''), '')
    assert.equal(transformToLowerCamel('a'), 'a')
    assert.equal(transformToLowerCamel('a_b'), 'aB')
    assert.equal(transformToLowerCamel('a-b'), 'aB')
    assert.equal(transformToLowerCamel('aB'), 'aB')
    assert.equal(transformToLowerCamel('aBb'), 'aBb')
    assert.equal(transformToLowerCamel('aBbC'), 'aBbC')
    assert.equal(transformToLowerCamel('ThisIsUpperCamelCase'), 'thisIsUpperCamelCase')
    assert.equal(transformToLowerCamel('thisIsLowerCamelCase'), 'thisIsLowerCamelCase')
    assert.equal(transformToLowerCamel('this-is-lower-chain-case'), 'thisIsLowerChainCase')
    assert.equal(transformToLowerCamel('THIS-IS-UPPER-CHAIN-CASE'), 'thisIsUpperChainCase')
    assert.equal(transformToLowerCamel('this_is_lower_snake_case'), 'thisIsLowerSnakeCase')
    assert.equal(transformToLowerCamel('THIS_IS_UPPER_SNAKE_CASE'), 'thisIsUpperSnakeCase')
    assert.equal(transformToLowerCamel('DBStore'), 'dbStore')
    assert.equal(transformToLowerCamel('DB0store'), 'db0Store')

    assert.equal(transformToLowerCamel('__db__'), '__db__')
    assert.equal(transformToLowerCamel('private_'), 'private_')
    assert.equal(transformToLowerCamel('_private'), '_private')
  })

  test('transformToLowerCamel', () => {
    assert.equal(transformToLowerCamel(''), '')
    assert.equal(transformToLowerCamel('a'), 'a')
    assert.equal(transformToLowerCamel('a_b'), 'aB')
    assert.equal(transformToLowerCamel('a-b'), 'aB')
    assert.equal(transformToLowerCamel('aB'), 'aB')
    assert.equal(transformToLowerCamel('aBb'), 'aBb')
    assert.equal(transformToLowerCamel('aBbC'), 'aBbC')
    assert.equal(transformToLowerCamel('ThisIsUpperCamelCase'), 'thisIsUpperCamelCase')
    assert.equal(transformToLowerCamel('thisIsLowerCamelCase'), 'thisIsLowerCamelCase')
    assert.equal(transformToLowerCamel('this-is-lower-chain-case'), 'thisIsLowerChainCase')
    assert.equal(transformToLowerCamel('THIS-IS-UPPER-CHAIN-CASE'), 'thisIsUpperChainCase')
    assert.equal(transformToLowerCamel('this_is_lower_snake_case'), 'thisIsLowerSnakeCase')
    assert.equal(transformToLowerCamel('THIS_IS_UPPER_SNAKE_CASE'), 'thisIsUpperSnakeCase')
    assert.equal(transformToLowerCamel('DBStore'), 'dbStore')
    assert.equal(transformToLowerCamel('DB0store'), 'db0Store')

    assert.equal(transformToLowerCamel('__db__'), '__db__')
    assert.equal(transformToLowerCamel('private_'), 'private_')
    assert.equal(transformToLowerCamel('_private'), '_private')
  })

  test('transformToUpperSnake', () => {
    assert.equal(transformToUpperSnake(''), '')
    assert.equal(transformToUpperSnake('a'), 'A')
    assert.equal(transformToUpperSnake('a_b'), 'A_B')
    assert.equal(transformToUpperSnake('a-b'), 'A_B')
    assert.equal(transformToUpperSnake('aB'), 'A_B')
    assert.equal(transformToUpperSnake('aBb'), 'A_BB')
    assert.equal(transformToUpperSnake('aBbC'), 'A_BB_C')
    assert.equal(transformToUpperSnake('ThisIsUpperCamelCase'), 'THIS_IS_UPPER_CAMEL_CASE')
    assert.equal(transformToUpperSnake('thisIsLowerCamelCase'), 'THIS_IS_LOWER_CAMEL_CASE')
    assert.equal(transformToUpperSnake('this-is-lower-chain-case'), 'THIS_IS_LOWER_CHAIN_CASE')
    assert.equal(transformToUpperSnake('THIS-IS-UPPER-CHAIN-CASE'), 'THIS_IS_UPPER_CHAIN_CASE')
    assert.equal(transformToUpperSnake('this_is_lower_snake_case'), 'THIS_IS_LOWER_SNAKE_CASE')
    assert.equal(transformToUpperSnake('THIS_IS_UPPER_SNAKE_CASE'), 'THIS_IS_UPPER_SNAKE_CASE')
    assert.equal(transformToUpperSnake('DBStore'), 'DB_STORE')
    assert.equal(transformToUpperSnake('DB0store'), 'DB_0_STORE')

    assert.equal(transformToUpperSnake('__db__'), '__DB__')
    assert.equal(transformToUpperSnake('private_'), 'PRIVATE_')
    assert.equal(transformToUpperSnake('_private'), '_PRIVATE')
  })

  test('transformToLowerSnake', () => {
    assert.equal(transformToLowerSnake(''), '')
    assert.equal(transformToLowerSnake('a'), 'a')
    assert.equal(transformToLowerSnake('a_b'), 'a_b')
    assert.equal(transformToLowerSnake('a-b'), 'a_b')
    assert.equal(transformToLowerSnake('aB'), 'a_b')
    assert.equal(transformToLowerSnake('aBb'), 'a_bb')
    assert.equal(transformToLowerSnake('aBbC'), 'a_bb_c')
    assert.equal(transformToLowerSnake('ThisIsUpperCamelCase'), 'this_is_upper_camel_case')
    assert.equal(transformToLowerSnake('thisIsLowerCamelCase'), 'this_is_lower_camel_case')
    assert.equal(transformToLowerSnake('this-is-lower-chain-case'), 'this_is_lower_chain_case')
    assert.equal(transformToLowerSnake('THIS-IS-UPPER-CHAIN-CASE'), 'this_is_upper_chain_case')
    assert.equal(transformToLowerSnake('this_is_lower_snake_case'), 'this_is_lower_snake_case')
    assert.equal(transformToLowerSnake('THIS_IS_UPPER_SNAKE_CASE'), 'this_is_upper_snake_case')
    assert.equal(transformToLowerSnake('DBStore'), 'db_store')
    assert.equal(transformToLowerSnake('DB0store'), 'db_0_store')

    assert.equal(transformToLowerSnake('__db__'), '__db__')
    assert.equal(transformToLowerSnake('private_'), 'private_')
    assert.equal(transformToLowerSnake('_private'), '_private')
  })

  test('transformToUpperChain', () => {
    assert.equal(transformToUpperChain(''), '')
    assert.equal(transformToUpperChain('a'), 'A')
    assert.equal(transformToUpperChain('a-b'), 'A-B')
    assert.equal(transformToUpperChain('a-b'), 'A-B')
    assert.equal(transformToUpperChain('aB'), 'A-B')
    assert.equal(transformToUpperChain('aBb'), 'A-BB')
    assert.equal(transformToUpperChain('aBbC'), 'A-BB-C')
    assert.equal(transformToUpperChain('ThisIsUpperCamelCase'), 'THIS-IS-UPPER-CAMEL-CASE')
    assert.equal(transformToUpperChain('thisIsLowerCamelCase'), 'THIS-IS-LOWER-CAMEL-CASE')
    assert.equal(transformToUpperChain('this-is-lower-chain-case'), 'THIS-IS-LOWER-CHAIN-CASE')
    assert.equal(transformToUpperChain('THIS-IS-UPPER-CHAIN-CASE'), 'THIS-IS-UPPER-CHAIN-CASE')
    assert.equal(transformToUpperChain('this-is-lower-snake-case'), 'THIS-IS-LOWER-SNAKE-CASE')
    assert.equal(transformToUpperChain('THIS-IS-UPPER-SNAKE-CASE'), 'THIS-IS-UPPER-SNAKE-CASE')
    assert.equal(transformToUpperChain('DBStore'), 'DB-STORE')
    assert.equal(transformToUpperChain('DB0store'), 'DB-0-STORE')

    assert.equal(transformToUpperChain('__db__'), '__DB__')
    assert.equal(transformToUpperChain('private_'), 'PRIVATE_')
    assert.equal(transformToUpperChain('_private'), '_PRIVATE')
  })

  test('transformToLowerChain', () => {
    assert.equal(transformToLowerChain(''), '')
    assert.equal(transformToLowerChain('a'), 'a')
    assert.equal(transformToLowerChain('a-b'), 'a-b')
    assert.equal(transformToLowerChain('a-b'), 'a-b')
    assert.equal(transformToLowerChain('aB'), 'a-b')
    assert.equal(transformToLowerChain('aBb'), 'a-bb')
    assert.equal(transformToLowerChain('aBbC'), 'a-bb-c')
    assert.equal(transformToLowerChain('ThisIsUpperCamelCase'), 'this-is-upper-camel-case')
    assert.equal(transformToLowerChain('thisIsLowerCamelCase'), 'this-is-lower-camel-case')
    assert.equal(transformToLowerChain('this-is-lower-chain-case'), 'this-is-lower-chain-case')
    assert.equal(transformToLowerChain('THIS-IS-UPPER-CHAIN-CASE'), 'this-is-upper-chain-case')
    assert.equal(transformToLowerChain('this-is-lower-snake-case'), 'this-is-lower-snake-case')
    assert.equal(transformToLowerChain('THIS-IS-UPPER-SNAKE-CASE'), 'this-is-upper-snake-case')
    assert.equal(transformToLowerChain('DBStore'), 'db-store')
    assert.equal(transformToLowerChain('DB0store'), 'db-0-store')

    assert.equal(transformToLowerChain('__db__'), '__db__')
    assert.equal(transformToLowerChain('private_'), 'private_')
    assert.equal(transformToLowerChain('_private'), '_private')
  })
})
