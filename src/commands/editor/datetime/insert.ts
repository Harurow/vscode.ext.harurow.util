import * as vscode from 'vscode'
import { format } from './util'
import { createStep, runSteps } from '../../../utils'

export async function insert (uri: vscode.Uri): Promise<void> {
  const state = {
    format: ''
  }

  const editor = vscode.window.activeTextEditor
  if (editor == null) {
    return
  }

  const deco = vscode.window.createTextEditorDecorationType({
    after: {
      color: new vscode.ThemeColor('editor.foreground'),
      backgroundColor: new vscode.ThemeColor('editor.findMatchBackground')
    }
  })

  const onDidChangeState = (): void => {
    const options = editor.selections.map((s, i) => ({
      range: s,
      renderOptions: {
        after: {
          contentText: state.format
        }
      }
    }))

    editor.setDecorations(deco, options)
  }

  const conf = vscode.workspace.getConfiguration('harurow', uri)
  const formats = conf.get('datetime.insert.format') as string[]

  const createQuickPickItem = (fmt: string, now: Date): vscode.QuickPickItem =>
    ({ label: format(now, fmt), description: fmt })

  const now = new Date()
  const items = [...formats].map((f) => createQuickPickItem(f, now))

  const steps = [
    createStep({
      type: 'quickPick',
      name: 'format',
      items: items,
      placeholder: 'datetime.insert.placeholder'.toLocalize(),
      matchOnDescription: true,
      onDidChangeValue: (sender, e) => {
        const now = new Date()
        sender.items = [e, ...formats].map((f) => createQuickPickItem(f, now))
        console.log(now)
      },
      onDidChangeActive: (_, e) => {
        if (e.length > 0) {
          state.format = e[0].label
          onDidChangeState()
        }
      }
    })
  ]

  const result = await runSteps(steps)

  editor.setDecorations(deco, [])
  deco.dispose()

  if (result) {
    await editor.edit((eb) => {
      editor.selections.forEach((s) => {
        eb.replace(s, state.format)
      })
    })
  }
}

export const cmdTable = [
  { name: 'datetime.insert', func: insert }
]
