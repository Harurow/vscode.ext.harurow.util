import * as vscode from 'vscode'
import { window } from 'vscode'
import { enumLineNumbers, showInformationMessage } from '../../../utils'

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

  const dispose = (): void => {
    editor.setDecorations(lineDeco, [])
    lineDeco.dispose()
  }

  try {
    const doc = editor.document
    const getRegex = (value: string): RegExp => {
      const ignoreCase = value.endsWith('\\i')
      const flags = ignoreCase ? 'i' : undefined
      const pattern = value.slice(0, ignoreCase ? -2 : undefined)
      return new RegExp(pattern, flags)
    }

    const removeLines: vscode.Range[] = []
    const validateInput = (value: string): string | undefined => {
      try {
        removeLines.length = 0
        if (value !== '') {
          const regex = getRegex(value)
          for (const lineNo of enumLineNumbers()) {
            const line = doc.lineAt(lineNo)
            if (regex.test(line.text)) {
              removeLines.push(line.range)
            }
          }
        }

        editor.setDecorations(lineDeco, removeLines)
      } catch {
        removeLines.length = 0
        editor.setDecorations(lineDeco, [])
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

    if (removeLines.length === 0) {
      showInformationMessage('notFound'.toLocalize())
      return
    }

    await editor.edit((eb) => {
      removeLines
        .reverse()
        .forEach((r) => {
          eb.delete(doc.lineAt(r.start).rangeIncludingLineBreak)
        })
    })

    showInformationMessage('removeLines.ifMatched.result'.toLocalize(removeLines.length))
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

  const dispose = (): void => {
    editor.setDecorations(lineDeco, [])
    lineDeco.dispose()
  }

  const doc = editor.document
  const removeLines: vscode.Range[] = []

  try {
    const getRegex = (value: string): RegExp => {
      const ignoreCase = value.endsWith('\\i')
      const flags = ignoreCase ? 'i' : undefined
      const pattern = value.slice(0, ignoreCase ? -2 : undefined)
      return new RegExp(pattern, flags)
    }

    const validateInput = (value: string): string | undefined => {
      try {
        removeLines.length = 0
        if (value !== '') {
          const regex = getRegex(value)
          for (const lineNo of enumLineNumbers()) {
            const line = doc.lineAt(lineNo)
            if (!regex.test(line.text)) {
              removeLines.push(line.range)
            }
          }
        }

        editor.setDecorations(lineDeco, removeLines)
      } catch {
        removeLines.length = 0
        editor.setDecorations(lineDeco, [])
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
  } finally {
    dispose()
  }

  if (removeLines.length === 0) {
    showInformationMessage('notFound'.toLocalize())
    return
  }

  await editor.edit((eb) => {
    removeLines
      .reverse()
      .forEach((r) => {
        eb.delete(doc.lineAt(r.start).rangeIncludingLineBreak)
      })
  })

  showInformationMessage('removeLines.ifUnmatched.result'.toLocalize(removeLines.length))
}

export const cmdTable =
[
  { name: 'removeLines.ifMatched', func: ifMatched },
  { name: 'removeLines.ifUnmatched', func: ifUnmatched }
]
