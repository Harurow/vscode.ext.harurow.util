'use strict'

import * as vscode from 'vscode'

interface RegisterCallback {
    replace?: (value: string) => string
    whole?: (value: vscode.TextEditor) => void
    foreach?: (value: string) => void
}

function onReplace(callback: (value: string) => string) {
    let editor = vscode.window.activeTextEditor
    if (!editor) {
        return
    }
    editor.edit((builder) => {
        editor.selections.forEach(i => {
            builder.replace(i, callback(editor.document.getText(i)))
        })
    })
}

function onWhole(callback: (editor: vscode.TextEditor) => void): void {
    let editor = vscode.window.activeTextEditor
    if (!editor) {
        return
    }
    callback(editor)
}

function onForEach(callback: (value: string)=> void): void {
    let editor = vscode.window.activeTextEditor
    if (!editor) {
        return
    }
    editor.selections.forEach(i => {
        callback(editor.document.getText(i))
    })
}

export function register(command: string, callback: RegisterCallback): vscode.Disposable {
    let innerCallback: (...args: any[]) => any

    if (callback.replace) {
        innerCallback = () => onReplace(callback.replace)
    } else if (callback.whole) {
        innerCallback = () => onWhole(callback.whole)
    } else if (callback.foreach) {
        innerCallback = () => onForEach(callback.foreach)
    }

    return vscode.commands.registerCommand(command, innerCallback)
}
