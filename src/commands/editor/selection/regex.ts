import * as vscode from 'vscode'
import { createOnDidChangeTextEditorVisibleRanges, createStep, getSafeRegex, pushMatchedTextRange, runSteps, showInformationMessage } from '../../../utils'

export const regex = async (): Promise<void> => {
  const state = {
    createRegex: undefined as ((() => RegExp) | undefined),
  }

  const result = createOnDidChangeTextEditorVisibleRanges({
    getRangesOrOptions: (iterator) => {
      if (state.createRegex != null) {
        const matches: vscode.Range[] = []
        for (const line of iterator) {
          pushMatchedTextRange(matches, state.createRegex(), line)
        }
        return matches
      }
      return []
    },
  })

  if (result.status === 'NG') {
    return
  }

  const { editor, redraw, dispose } = result

  const steps = [
    createStep({
      type: 'inputBox',
      name: 'regex',
      title: 'selection.regex'.toLocalizeTitle(),
      placeholder: 'selection.regex.placeholder'.toLocalize(),
      prompt: 'selection.regex.prompt'.toLocalize(),
      onDidChangeValue: (sender, e) => {
        const result = getSafeRegex(e)
        if (result.status === 'ok') {
          state.createRegex = result.createRegex
        } else {
          state.createRegex = undefined
        }
        sender.validationMessage = undefined
        redraw()
      },
    }),
  ]

  const isAccept = await runSteps(steps)
  dispose()

  if (isAccept && state.createRegex != null) {
    const limit = 1000

    const matches: vscode.Range[] = []
    for (let i = 0; i < editor.document.lineCount; i++) {
      const line = editor.document.lineAt(i)
      pushMatchedTextRange(matches, state.createRegex(), line)
      if (matches.length > limit) {
        break
      }
    }

    if (matches.length > limit) {
      matches.length = limit
      showInformationMessage('selection.regex.warnning'.toLocalize(limit))
    }

    if (matches.length > 0) {
      editor.selections = matches.map((r) => new vscode.Selection(r.start, r.end))
      showInformationMessage('selection.regex.result'.toLocalize(matches.length))
    }
  }
}

export const cmdTable =
[
  { name: 'selection.regex', func: regex },
]
