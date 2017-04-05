import * as vscode from 'vscode'
import * as edt from '../../utils/editor'
import {
    InputBoxOptionsEx,
    showInputBoxAsync,
    showWarningIfHasNoSelectionAsync,
} from '../../utils'

export const lineFilter = async (replacer: (input: string, content: string) => string, options?: vscode.InputBoxOptions | InputBoxOptionsEx) => {
    try {
        let editor = await showWarningIfHasNoSelectionAsync()
        let input = await showInputBoxAsync(options)

        await editor.edit(eb => {
            editor.selections = editor.selections
                                    .map(edt.getNormalizedLineSelection)

            editor.selections
                .forEach(sel => {
                    let content = editor.document.getText(sel)
                    eb.replace(sel, replacer(input, content))
                })
        })
    } catch (error) {
        // suppress
    }
}
