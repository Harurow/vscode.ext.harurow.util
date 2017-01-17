'use strict'

import * as vscode from 'vscode'
import * as util from './util'
import * as strutil from './stringutil';
import * as filter from './filter'
import * as encoding from './encoding'
import * as escape from './escape'
import * as misc from './misc'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "harurow-util" is now active!')

    context.subscriptions.push(
        util.regCommand('extension.str.toPascalCase', strutil.toPascalCase),
        util.regCommand('extension.str.toCamelCase', strutil.toCamelCase),
        util.regCommand('extension.str.toUpperSnakeCase', strutil.toUpperSnakeCase),
        util.regCommand('extension.str.toLowerSnakeCase', strutil.toLowerSnakeCase),

        util.regCommand2('extension.flt.removeMatched', filter.removeMatched),
        util.regCommand2('extension.flt.removeUnmatched', filter.removeUnmatched),
        util.regCommand2('extension.flt.removeContains', filter.removeContains),
        util.regCommand2('extension.flt.removeNotContains', filter.removeNotContains),

        util.regCommand('extension.enc.rfc3986ShiftJis', encoding.toRfc3986ShiftJis),
        util.regCommand('extension.enc.rfc3986EucJp', encoding.toRfc3986EucJp),
        util.regCommand('extension.enc.rfc3986Utf8', encoding.toRfc3986Utf8),
        util.regCommand('extension.enc.rfc1866ShiftJis', encoding.toRfc1866ShiftJis),
        util.regCommand('extension.enc.rfc1866EucJp', encoding.toRfc1866EucJp),
        util.regCommand('extension.enc.rfc1866Utf8', encoding.toRfc1866Utf8),

        util.regCommand('extension.dec.rfc3986ShiftJis', encoding.fromRfc3986ShiftJis),
        util.regCommand('extension.dec.rfc3986EucJp', encoding.fromRfc3986EucJp),
        util.regCommand('extension.dec.rfc3986Utf8', encoding.fromRfc3986Utf8),
        util.regCommand('extension.dec.rfc1866ShiftJis', encoding.fromRfc1866ShiftJis),
        util.regCommand('extension.dec.rfc1866EucJp', encoding.fromRfc1866EucJp),
        util.regCommand('extension.dec.rfc1866Utf8', encoding.fromRfc1866Utf8),

        util.regCommand('extension.trn.transGoogle', misc.transGoogle),
        util.regCommand('extension.trn.transMicrosoft', misc.transMicrosoft),

        util.regCommand('extension.esc.toHtml', escape.toHtml),
        util.regCommand('extension.esc.toHtmlLite', escape.toHtmlLite),
        util.regCommand('extension.esc.toHtmlAll', escape.toHtmlAll),
    )
}

// this method is called when your extension is deactivated
export function deactivate() {
}
