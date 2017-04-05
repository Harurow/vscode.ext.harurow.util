import {
    lines
} from '../../utils'

export const removeLineIfMatch = (pattern: string, content: string) =>
    removeLine(isMatch(pattern), content)

export const removeLineIfUnmatch = (pattern: string, content: string) =>
    removeLine(isUnmatch(pattern), content)

export const removeLineIfContains = (substr: string, content: string) =>
    removeLine(contains(substr), content)

export const removeLineIfNotContains = (substr: string, content: string) =>
    removeLine(notContains(substr), content)

export const isMatch = (pattern: string) =>
    (str: string) => (str != null) && RegExp(pattern).test(str)

export const isUnmatch = (pattern: string) =>
    (str: string) => (str != null) && !RegExp(pattern).test(str)

export const contains = (substr: string) =>
    (str: string) => (str != null) && str.indexOf(substr) !== -1

export const notContains = (substr: string) =>
    (str: string) => (str != null) && str.indexOf(substr) === -1

const removeLine = (condition: (line: string) => boolean, content: string) =>
    lines(content).filter(line => !condition(line))
              .join('\n')
