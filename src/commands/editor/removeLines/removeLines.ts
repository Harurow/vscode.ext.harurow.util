import * as vscode from 'vscode'
import { window } from 'vscode'
import { enumTargetLines, enumTargetVisibleLines, showInformationMessage } from '../../../utils'

export const ifMatched = async (): Promise<void> => {
  const editor = vscode.window.activeTextEditor
  if (editor == null) {
    return
  }

  const background = new vscode.ThemeColor('editor.findMatchBackground')
  const lineDeco = vscode.window.createTextEditorDecorationType({
    isWholeLine: true,
    backgroundColor: background
  })

  const getRegex = (value: string): RegExp => {
    const ignoreCase = value.endsWith('\\i')
    const flags = ignoreCase ? 'i' : undefined
    const pattern = value.slice(0, ignoreCase ? -2 : undefined)
    return new RegExp(pattern, flags)
  }

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
    })
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
        return 'removeLines.ifMatched.invalidate'.toLocalize()
      }
    }

    const userInput = await window.showInputBox({
      placeHolder: 'removeLines.ifMatched.placeHolder'.toLocalize(),
      prompt: 'removeLines.ifMatched.prompt'.toLocalize(),
      validateInput
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
        showInformationMessage('removeLines.ifMatched.result'.toLocalize(removeLines.length))
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

  const background = new vscode.ThemeColor('editor.findMatchBackground')
  const lineDeco = vscode.window.createTextEditorDecorationType({
    isWholeLine: true,
    backgroundColor: background
  })

  const getRegex = (value: string): RegExp => {
    const ignoreCase = value.endsWith('\\i')
    const flags = ignoreCase ? 'i' : undefined
    const pattern = value.slice(0, ignoreCase ? -2 : undefined)
    return new RegExp(pattern, flags)
  }

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
    })
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
        return 'removeLines.ifUnmatched.invalidate'.toLocalize()
      }
    }

    const userInput = await window.showInputBox({
      placeHolder: 'removeLines.ifUnmatched.placeHolder'.toLocalize(),
      prompt: 'removeLines.ifUnmatched.prompt'.toLocalize(),
      validateInput
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
        showInformationMessage('removeLines.ifUnmatched.result'.toLocalize(removeLines.length))
      }
    })
  } finally {
    dispose()
  }
}

export const cmdTable =
[
  { name: 'removeLines.ifMatched', func: ifMatched },
  { name: 'removeLines.ifUnmatched', func: ifUnmatched }
]
