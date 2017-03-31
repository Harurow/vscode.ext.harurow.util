'use strict'

import * as vscode from 'vscode'
import * as commands from './commands'
//import * as strutil from './stringutil'
import * as filter from './linefilter'
import * as encoding from './encoding'
import * as escape from './escape'
import * as num from './numbers'
import * as sel from './selection'
import * as rep from './replace'
import * as misc from './misc'

import * as next from './__/'

export function activate(context: vscode.ExtensionContext) {
    console.log('"harurow-util" is now active')

    next.activate(context)

    context.subscriptions.push(




        // commands.register('extension.str.toPascalCase', {replace: strutil.toPascalCase}),
        // commands.register('extension.str.toCamelCase', {replace: strutil.toCamelCase}),
        // commands.register('extension.str.toUpperSnakeCase', {replace: strutil.toUpperSnakeCase}),
        // commands.register('extension.str.toLowerSnakeCase', {replace: strutil.toLowerSnakeCase}),

        commands.register('extension.flt.removeMatched', {whole: filter.removeMatched}),
        commands.register('extension.flt.removeUnmatched', {whole: filter.removeUnmatched}),
        commands.register('extension.flt.removeContains', {whole: filter.removeContains}),
        commands.register('extension.flt.removeNotContains', {whole: filter.removeNotContains}),

        commands.register('extension.enc.rfc3986ShiftJis', {replace: encoding.toRfc3986ShiftJis}),
        commands.register('extension.enc.rfc3986EucJp', {replace: encoding.toRfc3986EucJp}),
        commands.register('extension.enc.rfc3986Utf8', {replace: encoding.toRfc3986Utf8}),
        commands.register('extension.enc.rfc1866ShiftJis', {replace: encoding.toRfc1866ShiftJis}),
        commands.register('extension.enc.rfc1866EucJp', {replace: encoding.toRfc1866EucJp}),
        commands.register('extension.enc.rfc1866Utf8', {replace: encoding.toRfc1866Utf8}),

        commands.register('extension.dec.rfc3986ShiftJis', {replace: encoding.fromRfc3986ShiftJis}),
        commands.register('extension.dec.rfc3986EucJp', {replace: encoding.fromRfc3986EucJp}),
        commands.register('extension.dec.rfc3986Utf8', {replace: encoding.fromRfc3986Utf8}),

        commands.register('extension.esc.toHtml', {replace: escape.toHtml}),
        commands.register('extension.esc.toHtmlAll', {replace: escape.toHtmlAll}),
        commands.register('extension.esc.toUnicode', {replace: escape.toUnicode}),
        commands.register('extension.esc.toUnicodeAll', {replace: escape.toUnicodeAll}),
        commands.register('extension.esc.fromHtmlAll', {replace: escape.fromHtmlAll}),
        commands.register('extension.esc.fromUnicode', {replace: escape.fromUnicode}),

        commands.register('extension.num.numbers', {whole: num.numbers}),

        commands.register('extension.sel.string', {whole: sel.string}),
        commands.register('extension.sel.regex', {whole: sel.regex}),

        commands.register('extension.rep.leftsideRight', {replace: rep.leftsideRight}),

        commands.register('extension.trn.transGoogle', {foreach: misc.transGoogle}),
        commands.register('extension.trn.transMicrosoft', {foreach: misc.transMicrosoft}),
    )
}

export function deactivate() {
    console.log('"harurow-util" is now deactive')
    next.deactivate()
}
