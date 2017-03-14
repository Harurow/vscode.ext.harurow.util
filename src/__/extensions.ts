import * as vscode from 'vscode'

export const activate = (context: vscode.ExtensionContext) => {
    console.log('Harurow-util "Hello!"')
    context.subscriptions.push(
        
    )
}

export const deactivate = () => {
    console.log('Harurow-util "see you again!"')
}

const getEditor = () => 
    vscode.window.activeTextEditor

export const replace = (replacer: (str: string) => string) => {
    const editor = getEditor()

    if (!editor || !replacer) {
        return
    }

    editor.edit(editBuilder => {
        const replace = (selection: vscode.Selection) =>
            editBuilder.replace(selection, replacer(editor.document.getText(selection)))

        editor.selections
              .forEach(replace)
    })
}

export const forEach = (func: (str: string) => void) => {
    const editor = getEditor()

    if (!editor || !func) {
        return
    }
    
    editor.selections
          .forEach(selection => func(editor.document.getText(selection)))
}
