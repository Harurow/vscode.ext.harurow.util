import {
    hasChar,
    isUnderscore,
    isValidIdentifier,
    replaceIdentifiers,
    words,
} from '../../utils'


export const toPascalCase = (content: string) =>
    replaceIdentifiers(toPascalCaseIdentifier, content)

export const toPascalWord = (str: string) =>
    !hasChar(str)       ? str
    : isUnderscore(str) ? ''
    : str[0].toUpperCase() + str.slice(1).toLowerCase()

const toPascalCaseIdentifier = (str: string) =>
    words(str)
        .map(toPascalWord)
        .join('')
