import * as $ from '../../utils/string'

const toCamelWord = (value: string, index: number) =>
    index == 0
        ? $.toLowerWord(value)
        : $.toPascalWord(value)

const toCamelCase = (str: string) =>
    !$.isValidIdentifier(str)
        ? str
        : $.words(str)
           .map((v, i) => toCamelWord(v, i))
           .join('')

export default toCamelCase
