'use strict'

import * as vscode from 'vscode'

export function leftsideRight(value: string) : string {
    return value.replace(/^([\t ]*)([a-zA-Z_][a-zA-Z0-9_.]+)([\t ]*[=:][\t ]*)([a-zA-Z_][a-zA-Z0-9_.]+)([\t ]*;?)$/gm, '$1$4$3$2$5')
}
