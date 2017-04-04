import {
    isValidIdentifier,
    words,
    isUnderscore,
    toLowerWord,
} from '../../utils'

const toLowerSnakeCase = (str: string) =>
    !isValidIdentifier(str)
        ? str
        : words(str)
           .filter(s => !isUnderscore(s))
           .map(toLowerWord)
           .join('_')

export default toLowerSnakeCase
