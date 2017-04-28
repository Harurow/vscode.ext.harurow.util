import * as vscode from 'vscode'

import {
    clearSelection,
    getSelections,
} from './utils'

import {
    strLen,
    InputBoxOptionsEx,
    showInputBox,
    getTextEditorOrThrowIfNotExistsTextEditor,
} from '../../utils'

export const selectWhenMatchSubstring = () => {
    getTextEditorOrThrowIfNotExistsTextEditor()
        .then(editor => {
            showInputBox({
                placeHolder: 'Text',
                prompt: 'Select if it equales input text.',
                emptyMessage: 'Must be input text.'
            }).then(input => {
                select(editor, input)
            })
        })
}

export const selectWhenMatchPattern = async () => {
    getTextEditorOrThrowIfNotExistsTextEditor()
        .then(editor => {
            showInputBox({
                placeHolder: 'Pattern',
                prompt: 'Select if it matched input pattern.',
                emptyMessage: 'Must be input pattern.'
            }).then(pattern => {
               select(editor, new RegExp(pattern, 'gm'))
            })
        })
}

export const selectWhenMatchPatternIgnoreCase = async () => {
    getTextEditorOrThrowIfNotExistsTextEditor()
        .then(editor => {
            showInputBox({
                placeHolder: 'Pattern (ignore case)',
                prompt: 'Select if it matched input pattern. (ignore case)',
                emptyMessage: 'Must be input pattern.'
            }).then(pattern => {
                select(editor, new RegExp(pattern, 'igm'))
            })
        })
}

const select = (editor: vscode.TextEditor, pattern: string|RegExp) => {
    let selections = getSelections(editor)

    editor.edit(eb => {
        clearSelection(editor)

        let newSelections = getMacthedSelections(editor.document, selections, pattern)

        if (newSelections && newSelections.length > 0) {
            editor.selections = newSelections
        } else {
            editor.selections = selections
            vscode.window.showWarningMessage('Not found.')
        }
    })
}

const getMacthedSelections = (doc: vscode.TextDocument, selections: vscode.Selection[], pattern: string|RegExp): vscode.Selection[] => {
    let newSelections: vscode.Selection[] = []

    let selector = getSelector(pattern)

    selections.forEach(sel => {
        let ms = selector(doc.offsetAt(sel.start), doc.getText(sel), doc)
        for (let r of ms) {
            newSelections.push(new vscode.Selection(r.start, r.end))
        }
    })

    return newSelections
}

const getSelector = (pattern: string|RegExp) =>
    typeof pattern === 'string'
        ? getSelectorForString(pattern)
        : getSelectorForRegex(pattern)

const getSelectorForString = (substr: string) =>
    function * (offset: number, content: string, doc: vscode.TextDocument): IterableIterator<vscode.Range> {
        let stidx = 0
        let htidx = content.indexOf(substr)
        let len = strLen(substr)
        while (htidx !== -1) {
            yield new vscode.Range(
                doc.positionAt(offset + htidx),
                doc.positionAt(offset + htidx + len)
            )
            stidx = htidx + len
            htidx = content.indexOf(substr, stidx)
        }
    }

const getSelectorForRegex = (pattern: RegExp) =>
    function * (offset: number, content: string, doc: vscode.TextDocument): IterableIterator<vscode.Range> {
        let m = pattern.exec(content)

        while (m) {
            let hit = m[0]
            let len = strLen(hit)
            if (len === 0) {
                break
            }
            yield new vscode.Range(
                doc.positionAt(offset + m.index),
                doc.positionAt(offset + m.index + len)
            )
            m = pattern.exec(content)
        }
    }