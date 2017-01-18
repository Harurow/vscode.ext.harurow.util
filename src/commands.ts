'use strict'

import * as vscode from 'vscode'

interface RegisterCallback {
    replace?: (value: string) => string
    whole?: (value: vscode.TextEditor) => void
}

export function register(command: string, callback: RegisterCallback) : vscode.Disposable {
    let innerCallback : (...args: any[]) => any

    if (callback.replace) {
        innerCallback = () => {
            let editor = vscode.window.activeTextEditor
            if (editor) {
                editor.edit((builder) => {
                    editor.selections
                          .forEach((value, index, array) => {
                              builder.replace(value, callback.replace(editor.document.getText(value)))
                          })
                })
            }
        }
    } else if (callback.whole) {
        innerCallback = () => {
            let editor = vscode.window.activeTextEditor
            if (editor) {
                callback.whole(editor)
            }
        }
    }

    return vscode.commands.registerCommand(command, innerCallback)
}
