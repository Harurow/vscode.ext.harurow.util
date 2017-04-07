import {
    regReplace,
    regWhole,
} from './commands'

import {
    InputBoxOptionsEx,
    getTextEditorOrThrowIfNotExistsTextEditor,
    showWarningIfHasNoMultiCursors,
    showWarningIfHasNoSelection,
    showInputBox,
    getNormalizedLineSelection,
    getReplaceFunc,
    getWholeFunc,
} from './editor'

import {
    isValidStr,
    hasChar,
    isUnderscore,
    isValidIdentifier,
    replaceIdentifiers,
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
    regWhole,

    InputBoxOptionsEx,
    getTextEditorOrThrowIfNotExistsTextEditor,
    showWarningIfHasNoMultiCursors,
    showWarningIfHasNoSelection,
    showInputBox,
    getNormalizedLineSelection,
    getReplaceFunc,

    isValidStr,
    hasChar,
    isUnderscore,
    isValidIdentifier,
    replaceIdentifiers,
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
