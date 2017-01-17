'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export function regCommand(command: string, callback: (value: string) => string) : vscode.Disposable {
    return vscode.commands.registerCommand(command, () => {
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.edit((builder) => {
                editor.selections
                      .forEach((value, index, array) => {
                          builder.replace(value, callback(editor.document.getText(value)));
                      });
            });
        }
    })
}

export function regCommand2(command: string, callback: (editor: vscode.TextEditor) => void) : vscode.Disposable {
    return vscode.commands.registerCommand(command, () => {
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            callback(editor);
        }
    });
}
