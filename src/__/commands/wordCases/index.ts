import toPascalCase from './toPascalCase'
import toCamelCase from './toCamelCase'
import toLowerSnakeCase from './toLowerSnakeCase'
import toUpperSnakeCase from './toUpperSnakeCase'
import * as cmd from '../../utils/commands'

export const toPascalCaseCommand = (command: string) => cmd.regReplace(command, toPascalCase)
export const toCamelCaseCommand = (command: string) => cmd.regReplace(command, toCamelCase)
export const toLowerSnakeCaseCommand = (command: string) => cmd.regReplace(command, toLowerSnakeCase)
export const toUpperSnakeCaseCommand = (command: string) => cmd.regReplace(command, toUpperSnakeCase)
