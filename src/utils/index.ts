import {
    regReplace,
    regForEach,
    regWhole,
} from './commands'

import {
    InputBoxOptionsEx,
    getTextEditorOrThrowIfNotExistsTextEditor,
    showWarningIfHasNoMultiCursorsAsync,
    showWarningIfHasNoSelectionAsync,
    showInputBoxAsync,
    getNormalizedLineSelection,
    getReplaceFunc,
    getForEachFunc,
    getWholeFunc,
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

import {
    throwIf,
} from './util'

export {
    regReplace,
    regForEach,
    regWhole,

    InputBoxOptionsEx,
    getTextEditorOrThrowIfNotExistsTextEditor,
    showWarningIfHasNoMultiCursorsAsync,
    showWarningIfHasNoSelectionAsync,
    showInputBoxAsync,
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

    throwIf,
}
