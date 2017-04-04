import {
    hasChar,
    isValidIdentifier,
    words,
    isUnderscore,
} from '../../utils'

export const toLowerWord = (str: string) =>
    !hasChar(str)       ? str
    : isUnderscore(str) ? ''
    : str.toLowerCase()

const toLowerSnakeCase = (str: string) =>
    !isValidIdentifier(str)
        ? str
        : words(str)
           .filter(s => !isUnderscore(s))
           .map(toLowerWord)
           .join('_')

export default toLowerSnakeCase
