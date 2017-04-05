'use strict'

import * as vscode from 'vscode'
import * as commands from './commands'
import * as num from './numbers'

import * as next from './__/'

export const activate = (context: vscode.ExtensionContext) => {

    next.activate(context)

    context.subscriptions.push(
        commands.register('extension.num.numbers', {whole: num.numbers}),
    )
}

export const deactivate = () => {
    next.deactivate()
}
