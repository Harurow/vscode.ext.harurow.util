import * as $ from '../../utils/string'

export const isMatch = (pattern: string) =>
    (str: string) => (str != null) && RegExp(pattern).test(str)

export const isNotMatch = (pattern: string) =>
    (str: string) => (str != null) && !RegExp(pattern).test(str)

export const contains = (substr: string) =>
    (str: string) => (str != null) && str.indexOf(substr) !== -1

export const notContains = (substr: string) =>
    (str: string) => (str != null) && str.indexOf(substr) === -1

const removeLine = (str: string, condition: (line: string) => boolean) =>
    $.lines(str)
     .filter(line => !condition(line))
     .join('\n')

export const removeLineIfMatch = (str: string, pattern: string) =>
    removeLine(str, isMatch(pattern))

export const removeLineIfNotMatch = (str: string, pattern: string) =>
    removeLine(str, isNotMatch(pattern))

export const removeLineIfContains = (str: string, substr: string) =>
    removeLine(str, contains(substr))

export const removeLineIfNotContains = (str: string, substr: string) =>
    removeLine(str, notContains(substr))

