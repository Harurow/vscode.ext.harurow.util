import { splitWords, enumWords, toPascalWord, toCamelWord, wordCallback, toUnderScore } from '../../utils/strings'

const casePattern = /([A-Z]+[a-z]*|[a-z]+|[0-9]+|_)/g
const snakePattern = /(_?[A-Z]+[a-z]*|_?[a-z]+|_)/g

const isUnderScore = (value: string) =>
    value === toUnderScore(value)

const toCamelOrTrim = (value: string) =>
    value === '_' ? '' : toCamelWord(value)

const toPascalOrTrim = (value: string) =>
    value === '_' ? '' : toPascalWord(value)

const toSnakeWord = (value: string, i: number) =>
    (i === 0) ? ('_' + value) : value

const convertCamelWord = (value: string, i: number) => {
    if (isUnderScore(value)) {
        return value
    } else if (i === 0) {
        return toCamelOrTrim(value)
    }
    return toPascalOrTrim(value)
}

export const toCamelCase = (value: string) =>
    splitWords(value)
        .map(convertCamelWord)
        .join()

export const toCamelCase2 = (value: string) =>
    enumWords(value, word =>
        isUnderScore(word)
            ? word
            : word.replace(casePattern, toCamelOrTrim))

export const toPascalCase = (value: string) =>
    enumWords(value, word =>
        isUnderScore(word)
            ? word
            : word.replace(casePattern, toPascalOrTrim))

export const toUpperSnake = (value: string) =>
    enumWords(value, (word, i) =>
        word.startsWith('_')
            ? word.toUpperCase()
            : toSnakeWord(word, i).toUpperCase())

export const toLowerSnake = (value: string) =>
    enumWords(value, (word, i) =>
        word.startsWith('_')
            ? word.toLowerCase()
            : toSnakeWord(word, i).toLowerCase())
