import {
    regReplace
} from '../../utils/commands'

import {
    escapeHtml,
    escapeHtmlAll,
    unescapeHtml
} from './html'

export const escapeHtmlCommand = (command: string) => regReplace(command, escapeHtml)
export const escapeHtmlAllCommand = (command: string) => regReplace(command, escapeHtmlAll)
export const unescapeHtmlCommand = (command: string) => regReplace(command, unescapeHtml)
