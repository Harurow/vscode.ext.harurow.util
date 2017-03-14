import * as $ from '../../utils/string'

const toUpperSnakeCase = (str: string) =>
    !$.isValidIdentifier(str)
        ? str
        : $.words(str)
           .filter(s => !$.isUnderscore(s))
           .map($.toUpperWord)
           .join('_')

export default toUpperSnakeCase
