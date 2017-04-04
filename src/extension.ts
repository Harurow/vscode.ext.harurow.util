'use strict'

import * as vscode from 'vscode'
import * as commands from './commands'
//import * as strutil from './stringutil'
//import * as filter from './linefilter'
//import * as encoding from './encoding'
import * as escape from './escape'
import * as num from './numbers'
import * as sel from './selection'
import * as rep from './replace'
import * as misc from './misc'

import * as next from './__/'

export const activate = (context: vscode.ExtensionContext) => {
    console.log('"harurow-util" is now active')

    next.activate(context)

    context.subscriptions.push(


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

export const deactivate = () => {
    console.log('"harurow-util" is now deactive')
    next.deactivate()
}
