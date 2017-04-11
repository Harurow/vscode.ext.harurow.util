import * as vscode from 'vscode'
import * as edt from '../../utils/editor'
import {
    InputBoxOptionsEx,
    showInputBox,
    showWarningIfHasNoSelection,
} from '../../utils'

export const lineFilter = (replacer: (input: string, content: string) => string, options?: vscode.InputBoxOptions | InputBoxOptionsEx) => {
    showWarningIfHasNoSelection()
        .then(editor => {
            showInputBox(options)
                .then(input => {
                    editor.edit(eb => {
                        editor.selections = editor.selections
                                                .map(edt.getNormalizedLineSelection)

                        editor.selections
                            .forEach(sel => {
                                let content = editor.document.getText(sel)
                                eb.replace(sel, replacer(input, content))
                            })
                    })
                })
        }).catch(error => {/* suppress */})
}
