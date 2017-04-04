import toPascalCase from './toPascalCase'
import toCamelCase from './toCamelCase'
import toLowerSnakeCase from './toLowerSnakeCase'
import toUpperSnakeCase from './toUpperSnakeCase'
import {
    regReplace
} from '../../utils'

export {
    toPascalCase,
    toCamelCase,
    toLowerSnakeCase,
    toUpperSnakeCase,
}

export const toPascalCaseCommand = (command: string) => regReplace(command, toPascalCase)
export const toCamelCaseCommand = (command: string) => regReplace(command, toCamelCase)
export const toLowerSnakeCaseCommand = (command: string) => regReplace(command, toLowerSnakeCase)
export const toUpperSnakeCaseCommand = (command: string) => regReplace(command, toUpperSnakeCase)
