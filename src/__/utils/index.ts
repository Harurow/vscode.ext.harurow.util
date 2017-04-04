import {
    regReplace,
    regForEach,
} from './commands'

import {
    showWarningIfHasNoSelection,
    showWarningIfHasNoInputAsync,
    getNormalizedLineSelection,
    getReplaceFunc,
    getForEachFunc,
} from './editor'

import {
    isValidStr,
    hasChar,
    isUnderscore,
    isValidIdentifier,
    words,
    lines,
    chars,
    strLen,
    CharInfo,
    codePoints,
    hex,
    SurrogatePair,
    surrogatePair,
} from './string'


export {
    regReplace,
    regForEach,

    showWarningIfHasNoSelection,
    showWarningIfHasNoInputAsync,
    getNormalizedLineSelection,
    getReplaceFunc,
    getForEachFunc,

    isValidStr,
    hasChar,
    isUnderscore,
    isValidIdentifier,
    words,
    lines,
    chars,
    strLen,
    CharInfo,
    codePoints,
    hex,
    SurrogatePair,
    surrogatePair,
}
