import {
    regReplace
} from '../../utils/commands'

import {
    escapeHtml,
    escapeHtmlAll,
    unescapeHtml
} from './html'

import {
    escapeUnicode,
    escapeUnicodeAll,
    unescapeUnicode,
} from './unicode'

export const escapeHtmlCommand = (command: string) => regReplace(command, escapeHtml)
export const escapeHtmlAllCommand = (command: string) => regReplace(command, escapeHtmlAll)
export const unescapeHtmlCommand = (command: string) => regReplace(command, unescapeHtml)

export const escapeUnicodeCommand = (command: string) => regReplace(command, escapeUnicode)
export const escapeUnicodeAllCommand = (command: string) => regReplace(command, escapeUnicodeAll)
export const unescapeUnicodeCommand = (command: string) => regReplace(command, unescapeUnicode)
