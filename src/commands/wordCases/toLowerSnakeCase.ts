import {
    hasChar,
    isValidIdentifier,
    replaceIdentifiers,
    words,
    isUnderscore,
} from '../../utils'

export const toLowerSnakeCase = (content: string) =>
    replaceIdentifiers(toLowerSnakeCaseIdentifier, content)

export const toLowerWord = (str: string) =>
    !hasChar(str)       ? str
    : isUnderscore(str) ? ''
    : str.toLowerCase()

const toLowerSnakeCaseIdentifier = (str: string) =>
    !isValidIdentifier(str)
        ? str
        : words(str)
           .filter(s => !isUnderscore(s))
           .map(toLowerWord)
           .join('_')
