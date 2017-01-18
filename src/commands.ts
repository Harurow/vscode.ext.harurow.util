'use strict'

import * as vscode from 'vscode'

interface RegisterCallback {
    replace?: (value: string) => string
    whole?: (value: vscode.TextEditor) => void
    foreach?: (value: string) => void
}

export function register(command: string, callback: RegisterCallback): vscode.Disposable {
    let innerCallback: (...args: any[]) => any

    if (callback.replace) {
        innerCallback = () => {
            let editor = vscode.window.activeTextEditor
            if (editor) {
                editor.edit((builder) => {
                    editor.selections
                        .forEach(i => {
                            builder.replace(i, callback.replace(editor.document.getText(i)))
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
    } else if (callback.foreach) {
        innerCallback = () => {
            let editor = vscode.window.activeTextEditor
            if (editor) {
                editor.selections
                    .forEach(i => {
                        callback.foreach(editor.document.getText(i))
                    })
            }
        }
    }

    return vscode.commands.registerCommand(command, innerCallback)
}
