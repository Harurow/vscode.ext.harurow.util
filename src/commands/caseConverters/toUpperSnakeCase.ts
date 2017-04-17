import {
    hasChar,
    isValidIdentifier,
    replaceIdentifiers,
    words,
    isUnderscore,
} from '../../utils'

export const toUpperSnakeCase = (content: string) =>
    replaceIdentifiers(toUpperSnakeCaseIdentifier, content)

const toUpperSnakeCaseIdentifier = (str: string) =>
    words(str)
        .filter(s => !isUnderscore(s))
        .map(toUpperWord)
        .join('_')

const toUpperWord = (str: string) =>
    str.toUpperCase()
