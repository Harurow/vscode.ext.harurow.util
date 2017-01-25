'use strict'

import * as vscode from 'vscode'
import { forEachLines } from './util'

function filter(editor: vscode.TextEditor, options: vscode.InputBoxOptions, callback: (input: string, value: string) => string) {
    if (editor.selection.isEmpty) {
        vscode.window.showWarningMessage("Must be select target range.")
        return
    }

    vscode.window.showInputBox(options).then((input) => {
        if (input === undefined) {
            return
        }
        if (!input) {
            vscode.window.showWarningMessage("Must be input text.")
            return
        }
        
        editor.edit((builder) => {
            editor.selections.forEach((value, index, array) => {
                builder.replace(value, callback(input, editor.document.getText(value)))
            })
        })
    })
}

function match(pattern: string, line: string): boolean {
    return RegExp(pattern).test(line)
}

function unmatch(pattern: string, line: string): boolean {
    return !RegExp(pattern).test(line)
}

function contains(input: string, line: string): boolean {
    return line.indexOf(input) !== -1
}

function notContains(input: string, line: string): boolean {
    return line.indexOf(input) === -1
}

function filterLines(input: string, value: string, removeCondition: (input: string, line: string) => boolean): string {
    return forEachLines(value, (line) => removeCondition(input, line) ? null : line)
}

export function removeMatchedLine(input: string, value: string): string {
    return filterLines(input, value, match)
}

export function removeUnmatchedLine(input: string, value: string): string {
    return filterLines(input, value, unmatch)
}

export function removeContainsLine(input: string, value: string): string {
    return filterLines(input, value, contains)
}

export function removeNotContainsLine(input: string, value: string): string {
    return filterLines(input, value, notContains)
}

export function removeMatched(editor: vscode.TextEditor) {
    filter(editor, {
        placeHolder: "Pattern",
        prompt: "Remove lines if it matched input pattern.",
    }, removeMatchedLine)
}

export function removeUnmatched(editor: vscode.TextEditor) {
    filter(editor, {
        placeHolder: "Pattern",
        prompt: "Remove lines if it un-matched input pattern.",
    }, removeUnmatchedLine)
}

export function removeContains(editor: vscode.TextEditor) {
    filter(editor, {
        placeHolder: "Text",
        prompt: "Remove lines if it contains input text.",
    }, removeContainsLine)
}

export function removeNotContains(editor: vscode.TextEditor) {
    filter(editor, {
        placeHolder: "Text",
        prompt: "Remove lines if it not contains input text.",
    }, removeNotContainsLine)
}
