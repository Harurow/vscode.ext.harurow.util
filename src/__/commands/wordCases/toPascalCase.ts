import * as $ from '../../utils/string'

const toPascalCase = (str: string) =>
    !$.isValidIdentifier(str)
        ? str
        : $.words(str)
           .map($.toPascalWord)
           .join('')

export default toPascalCase
