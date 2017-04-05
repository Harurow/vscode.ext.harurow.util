import * as vscode from 'vscode'
import * as edt from '../../utils/editor'

export const filter = async (replacer: (input: string, content: string) => string, options?: vscode.InputBoxOptions) => {
    let editor = await edt.showWarningIfHasNoSelection()
    if (!editor) {
        return false
    }
    let input = await vscode.window.showInputBox(options)
    let inputIsValid = await edt.showWarningIfHasNoInputAsync(input)
    if (!inputIsValid) {
        return false
    }

    return editor.edit(eb => {
        editor.selections = editor.selections
                                  .map(edt.getNormalizedLineSelection)

        editor.selections
            .forEach(sel => {
                let content = editor.document.getText(sel)
                eb.replace(sel, replacer(input, content))
            })
    })
}
