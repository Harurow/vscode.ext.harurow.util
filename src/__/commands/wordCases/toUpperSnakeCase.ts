import {
    isValidIdentifier,
    words,
    isUnderscore,
    toUpperWord,
} from '../../utils'

const toUpperSnakeCase = (str: string) =>
    !isValidIdentifier(str)
        ? str
        : words(str)
           .filter(s => !isUnderscore(s))
           .map(toUpperWord)
           .join('_')

export default toUpperSnakeCase
