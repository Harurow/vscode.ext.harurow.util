import {
    hasChar,
    isValidIdentifier,
    words,
    isUnderscore,
} from '../../utils'

export const toUpperSnakeCase = (str: string) =>
    !isValidIdentifier(str)
        ? str
        : words(str)
           .filter(s => !isUnderscore(s))
           .map(toUpperWord)
           .join('_')

const toUpperWord = (str: string) =>
    !hasChar(str)       ? str
    : isUnderscore(str) ? ''
    : str.toUpperCase()
