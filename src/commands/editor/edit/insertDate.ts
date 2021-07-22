import * as vscode from 'vscode'
import { formatDate } from '../../../utils/formatDate'
import { createStep, runSteps } from '../../../utils'

interface QuickPickItemEx extends vscode.QuickPickItem {
  url?: vscode.Uri
}

function createHelpLinkPickItem (): QuickPickItemEx {
  return {
    alwaysShow: true,
    picked: false,
    label: '',
    description: 'edit.insertDate.help'.toLocalize(),
    url: vscode.Uri.parse('https://momentjs.com/docs/#/displaying/')
  }
}

export const insert = async (uri: vscode.Uri): Promise<void> => {
  const state = {
    pick: undefined as QuickPickItemEx | undefined,
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
  const formats = conf.get('edit.insertDate.format') as string[]

  const createQuickPickItem = (fmt: string, now: Date): QuickPickItemEx =>
    ({ label: formatDate(now, fmt), description: fmt })

  const now = new Date()
  const items = [...formats].map((f) => createQuickPickItem(f, now))
  items.push(createHelpLinkPickItem())

  const steps = [
    createStep({
      type: 'quickPick',
      name: 'format',
      items: items,
      placeholder: 'edit.insertDate.placeholder'.toLocalize(),
      matchOnDescription: true,
      onDidChangeValue: (sender, e) => {
        const now = new Date()
        const items = [e, ...formats].map((f) => createQuickPickItem(f, now))
        items.push(createHelpLinkPickItem())
        sender.items = items
      },
      onDidChangeActive: (_, e) => {
        if (e.length > 0) {
          state.pick = e[0]
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
    if (state.pick?.url != null) {
      await vscode.env.openExternal(state.pick.url)
    } else {
      await editor.edit((eb) => {
        editor.selections.forEach((s) => {
          eb.replace(s, state.format)
        })
      })
    }
  }
}

export const cmdTable = [
  { name: 'edit.insertDate', func: insert }
]
