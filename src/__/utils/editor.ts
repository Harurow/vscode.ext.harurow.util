import * as vscode from 'vscode'


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

const replace = (func: (str: string) => string) => {
    let editor = vscode.window.activeTextEditor
    if (editor) {
        editor.edit(eb => {

            editor.selections
                  .forEach(i => {
                      eb.replace(i, func(editor.document.getText(i)))
                  })
        })
    }
}