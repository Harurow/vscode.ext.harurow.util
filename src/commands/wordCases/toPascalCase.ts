import {
    hasChar,
    isUnderscore,
    isValidIdentifier,
    words,
} from '../../utils'

export const toPascalWord = (str: string) =>
    !hasChar(str)       ? str
    : isUnderscore(str) ? ''
    : str[0].toUpperCase() + str.slice(1).toLowerCase()

export const toPascalCase = (str: string) =>
    !isValidIdentifier(str)
        ? str
        : words(str)
           .map(toPascalWord)
           .join('')
