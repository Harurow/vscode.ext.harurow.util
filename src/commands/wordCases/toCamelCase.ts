import {
    isValidIdentifier,
    replaceIdentifiers,
    words,
} from '../../utils'

import { toLowerWord } from './toLowerSnakeCase'
import { toPascalWord } from './toPascalCase'

export const toCamelCase = (content: string) =>
        replaceIdentifiers(toCamelCaseIdentifier, content)

const toCamelCaseIdentifier = (str: string) =>
    !isValidIdentifier(str)
        ? str
        : words(str)
           .map((v, i) => toCamelWord(v, i))
           .join('')

const toCamelWord = (value: string, index: number) =>
    index === 0
        ? toLowerWord(value)
        : toPascalWord(value)
