import * as vscode from 'vscode'
import {
        removeLineIfMatch,
        removeLineIfNotMatch,
        removeLineIfContains,
        removeLineIfNotContains
    } from './removeLine'
import * as cmd from '../../utils/commands'
import * as edt from '../../utils/editor'

const filter = async (replacer: (str: string, input: string) => string, options?: vscode.InputBoxOptions) => {
    let editor = await edt.showWarningIfHasNoSelection()
    if (!editor) {
        return
    }
    let input = await vscode.window.showInputBox(options)
    let inputIsValid = await edt.showWarningIfHasNoInputAsync(input)
    if (!inputIsValid) {
        return
    }
    
    return editor.edit(eb => {
        editor.selections = editor.selections
                                  .map(edt.getNormalizedLineSelection)

        editor.selections
            .forEach(sel => {
                let content = editor.document.getText(sel)
                eb.replace(sel, replacer(content, input))
            })
    })
}

export const removeLineIfMatchCommand = (command: string) =>
    vscode.commands.registerCommand(command, () =>
        filter(removeLineIfMatch, {
            placeHolder: 'Pattern',
            prompt: 'Remove lines if it matched input pattern.'
        }))

export const removeLineIfNotMatchCommand = (command: string) =>
    vscode.commands.registerCommand(command, () =>
        filter(removeLineIfNotMatch, {
            placeHolder: 'Pattern',
            prompt: 'Remove lines if it un-matched input pattern.'
        }))

export const removeLineIfContainsCommand = (command: string) =>
    vscode.commands.registerCommand(command, () =>
        filter(removeLineIfContains, {
            placeHolder: 'Text',
            prompt: 'Remove lines if it contains input text.'
        }))

export const removeLineIfNotContainsCommand = (command: string) =>
    vscode.commands.registerCommand(command, () =>
        filter(removeLineIfNotContains, {
            placeHolder: 'Text',
            prompt: 'Remove lines if it not contains input text.'
        }))
