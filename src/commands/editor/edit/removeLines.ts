import * as vscode from 'vscode'
import { createRemoveLinesDecorationRenderOptions, enumTargetLines, enumTargetVisibleLines, showInformationMessage } from '../../../utils'

const getRegex = (value: string): RegExp => {
  const ignoreCase = value.endsWith('\\i')
  const flags = ignoreCase ? 'i' : undefined
  const pattern = value.slice(0, ignoreCase ? -2 : undefined)
  return new RegExp(pattern, flags)
}

export const ifMatched = async (): Promise<void> => {
  const editor = vscode.window.activeTextEditor
  if (editor == null) {
    return
  }

  const lineDeco = vscode.window.createTextEditorDecorationType(
    createRemoveLinesDecorationRenderOptions())

  const redraw = (value: string): boolean => {
    const removeLines: vscode.Range[] = []
    try {
      if (value !== '') {
        const regex = getRegex(value)
        for (const line of enumTargetVisibleLines(editor)) {
          if (regex.test(line.text)) {
            removeLines.push(line.range)
          }
        }
      }

      editor.setDecorations(lineDeco, removeLines)
    } catch {
      removeLines.length = 0
      editor.setDecorations(lineDeco, [])
      return false
    }
    return true
  }

  let lastInputText: string | undefined
  const disposables = [
    vscode.window.onDidChangeTextEditorVisibleRanges((e) => {
      if (editor === e.textEditor) {
        if (lastInputText != null) {
          redraw(lastInputText)
        }
      }
    }),
  ]

  const dispose = (): void => {
    disposables.forEach((obj) => obj.dispose())
    disposables.length = 0
    editor.setDecorations(lineDeco, [])
    lineDeco.dispose()
  }

  try {
    const validateInput = (value: string): string | undefined => {
      lastInputText = value
      if (!redraw(value)) {
        lastInputText = undefined
        return 'edit.removeLines.ifMatched.invalidate'.toLocalize()
      }
    }

    const userInput = await vscode.window.showInputBox({
      title: 'edit.removeLines.ifMatched'.toLocalizeTitle(),
      placeHolder: 'edit.removeLines.ifMatched.placeholder'.toLocalize(),
      prompt: 'edit.removeLines.ifMatched.prompt'.toLocalize(),
      validateInput,
    })

    if (userInput == null || userInput === '') {
      return
    }

    await editor.edit((eb) => {
      const regex = getRegex(userInput)

      const removeLines: vscode.Range[] = []
      for (const line of enumTargetLines(editor)) {
        if (regex.test(line.text)) {
          removeLines.unshift(line.rangeIncludingLineBreak)
        }
      }

      removeLines.forEach((r) => eb.delete(r))

      if (removeLines.length === 0) {
        showInformationMessage('notFound'.toLocalize())
      } else {
        showInformationMessage('edit.removeLines.ifMatched.result'.toLocalize(removeLines.length))
      }
    })
  } finally {
    dispose()
  }
}

export const ifUnmatched = async (): Promise<void> => {
  const editor = vscode.window.activeTextEditor
  if (editor == null) {
    return
  }

  const background = new vscode.ThemeColor('diffEditor.removedTextBackground')
  const lineDeco = vscode.window.createTextEditorDecorationType({
    isWholeLine: true,
    backgroundColor: background,
  })

  const redraw = (value: string): boolean => {
    const removeLines: vscode.Range[] = []
    try {
      if (value !== '') {
        const regex = getRegex(value)
        for (const line of enumTargetVisibleLines(editor)) {
          if (!regex.test(line.text)) {
            removeLines.push(line.range)
          }
        }
      }

      editor.setDecorations(lineDeco, removeLines)
    } catch {
      removeLines.length = 0
      editor.setDecorations(lineDeco, [])
      return false
    }
    return true
  }

  let lastInputText: string | undefined
  const disposables = [
    vscode.window.onDidChangeTextEditorVisibleRanges((e) => {
      if (editor === e.textEditor) {
        if (lastInputText != null) {
          redraw(lastInputText)
        }
      }
    }),
  ]

  const dispose = (): void => {
    disposables.forEach((obj) => obj.dispose())
    disposables.length = 0
    editor.setDecorations(lineDeco, [])
    lineDeco.dispose()
  }

  try {
    const validateInput = (value: string): string | undefined => {
      lastInputText = value
      if (!redraw(value)) {
        lastInputText = undefined
        return 'edit.removeLines.ifUnmatched.invalidate'.toLocalize()
      }
    }

    const userInput = await vscode.window.showInputBox({
      title: 'edit.removeLines.ifUnmatched'.toLocalizeTitle(),
      placeHolder: 'edit.removeLines.ifUnmatched.placeholder'.toLocalize(),
      prompt: 'edit.removeLines.ifUnmatched.prompt'.toLocalize(),
      validateInput,
    })

    if (userInput == null || userInput === '') {
      return
    }

    await editor.edit((eb) => {
      const removeLines: vscode.Range[] = []
      const regex = getRegex(userInput)
      for (const line of enumTargetLines(editor)) {
        if (!regex.test(line.text)) {
          removeLines.unshift(line.rangeIncludingLineBreak)
        }
      }

      removeLines.forEach((r) => eb.delete(r))

      if (removeLines.length === 0) {
        showInformationMessage('notFound'.toLocalize())
      } else {
        showInformationMessage('edit.removeLines.ifUnmatched.result'.toLocalize(removeLines.length))
      }
    })
  } finally {
    dispose()
  }
}

export const cmdTable =
[
  { name: 'edit.removeLines.ifMatched', func: ifMatched },
  { name: 'edit.removeLines.ifUnmatched', func: ifUnmatched },
]
