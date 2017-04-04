import {
    hasChar,
    isValidIdentifier,
    words,
    isUnderscore,
} from '../../utils'

const toUpperWord = (str: string) =>
    !hasChar(str)       ? str
    : isUnderscore(str) ? ''
    : str.toUpperCase()

const toUpperSnakeCase = (str: string) =>
    !isValidIdentifier(str)
        ? str
        : words(str)
           .filter(s => !isUnderscore(s))
           .map(toUpperWord)
           .join('_')

export default toUpperSnakeCase
