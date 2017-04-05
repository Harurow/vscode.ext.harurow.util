'use strict'

import * as vscode from 'vscode'
import * as commands from './commands'
//import * as strutil from './stringutil'
//import * as filter from './linefilter'
//import * as encoding from './encoding'
//import * as escape from './escape'
import * as num from './numbers'
import * as sel from './selection'
import * as rep from './replace'
import * as misc from './misc'

import * as next from './__/'

export const activate = (context: vscode.ExtensionContext) => {

    next.activate(context)

    context.subscriptions.push(



        commands.register('extension.num.numbers', {whole: num.numbers}),

        commands.register('extension.sel.string', {whole: sel.string}),
        commands.register('extension.sel.regex', {whole: sel.regex}),

        commands.register('extension.rep.leftsideRight', {replace: rep.leftsideRight}),

        commands.register('extension.trn.transGoogle', {foreach: misc.transGoogle}),
        commands.register('extension.trn.transMicrosoft', {foreach: misc.transMicrosoft}),
    )
}

export const deactivate = () => {
    next.deactivate()
}
