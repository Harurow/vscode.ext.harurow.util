import {
    isValidIdentifier,
    words,
    toPascalWord
} from '../../utils'

const toPascalCase = (str: string) =>
    !isValidIdentifier(str)
        ? str
        : words(str)
           .map(toPascalWord)
           .join('')

export default toPascalCase
