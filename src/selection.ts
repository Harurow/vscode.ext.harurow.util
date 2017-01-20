'use strict'

import * as vscode from 'vscode'
import * as util from './util'

function enumLines(value: string, callback: (line: string) => string): string {
    return value.replace(/(^.*\n)|(^.*$)/mg, (line) => {
        let newLine = callback(line)
        return newLine === null
            ? ""
            : newLine
    })
}

function getSafeSelections(editor: vscode.TextEditor): vscode.Selection[] {
    var selections: vscode.Selection[] = []

    if (editor.selection.isEmpty) {
        let endline = editor.document.lineAt(editor.document.lineCount - 1)
        let all = new vscode.Selection(0, 0, endline.lineNumber, endline.rangeIncludingLineBreak.end.character)
        selections.push(all)
    } else {
        editor.selections.forEach(sel => selections.push(sel))
    }

    return selections
}

function clearSelection(editor: vscode.TextEditor) {
    let sttline = editor.document.lineAt(0)
    editor.selection = new vscode.Selection(
        sttline.rangeIncludingLineBreak.start,
        sttline.rangeIncludingLineBreak.start
    )
}

interface Matched {
    index: number
    value: string
}

function match(offset: number, text: string, pattern: RegExp | string): Matched[] {
    let results: Matched[] = []

    if (typeof pattern === 'string') {
        let stidx = 0
        let htidx = text.indexOf(pattern)
        while (htidx !== -1) {
            results.push({ index: offset + htidx, value: pattern })
            stidx = htidx + pattern.length
            htidx = text.indexOf(pattern, stidx)
        }
    } else {
        let regex = <RegExp>pattern
        let m = regex.exec(text)

        while (m) {
            results.push({ index: offset + m.index, value: m[0] })
            m = regex.exec(text)
        }
    }

    return results
}

function matches(editor: vscode.TextEditor, selections: vscode.Selection[], pattern: RegExp | string): vscode.Selection[] {
    let doc = editor.document
    let newSels: vscode.Selection[] = []

    selections.forEach(sel => {
        let text = doc.getText(sel)
        let offset = doc.offsetAt(sel.start)

        let ms = match(offset, text, pattern)

        ms.forEach(m => {
            let stt = doc.positionAt(m.index)
            let end = doc.positionAt(m.index + util.strLen(m.value))
            let newSel = new vscode.Selection(stt, end)
            newSels.push(newSel)
        })
    })

    return newSels
}

type SelectType = 'STR' | 'REGEX'

function select(editor: vscode.TextEditor, options: vscode.InputBoxOptions, type: SelectType) {
    vscode.window.showInputBox(options).then((input) => {
        if (input === undefined) {
            return
        }
        if (!input) {
            vscode.window.showWarningMessage("Must be input text.")
            return
        }

        let selections = getSafeSelections(editor)

        let doc = editor.document
        let sttline = doc.lineAt(0)
        let endline = doc.lineAt(doc.lineCount - 1)

        let newSels: vscode.Selection[] = []

        editor.edit((builder) => {
            clearSelection(editor)

            switch (type) {
                case 'REGEX':
                    newSels = matches(editor, selections, new RegExp(input, "gm"))
                    break
                case 'STR':
                    newSels = matches(editor, selections, input)
                    break
            }

            if (newSels && newSels.length > 0) {
                editor.selections = newSels
            } else {
                vscode.window.showWarningMessage("Not found.")
            }
        })
    })
}

export function string(editor: vscode.TextEditor) {
    select(editor, {
        placeHolder: "Text",
        prompt: "Select if it equales input text.",
    }, "STR")
}

export function regex(editor: vscode.TextEditor) {
    select(editor, {
        placeHolder: "Pattern",
        prompt: "Select if it matched input pattern.",
    }, "REGEX")
}
