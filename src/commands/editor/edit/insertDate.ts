import * as vscode from 'vscode'
import { formatDate } from '../../../utils/formatDate'
import { createOnDidChangeState, createStep, runSteps } from '../../../utils'

interface QuickPickItemEx extends vscode.QuickPickItem {
  url?: vscode.Uri
}

function createHelpLinkPickItem (): QuickPickItemEx {
  return {
    alwaysShow: true,
    picked: false,
    label: '',
    description: 'edit.insertDate.help'.toLocalize(),
    url: vscode.Uri.parse('https://momentjs.com/docs/#/displaying/'),
  }
}

export const insert = async (uri: vscode.Uri): Promise<void> => {
  const state = {
    pick: undefined as QuickPickItemEx | undefined,
    format: '',
  }

  const result = createOnDidChangeState({ converter: () => state.format })
  if (result.status === 'NG') {
    return
  }

  const { editor, onDidChangeState, dispose } = result
  const conf = vscode.workspace.getConfiguration('harurow', uri)
  const formats = conf.get('edit.insertDate.format') as string[]

  const createItems = (): QuickPickItemEx[] => {
    const now = new Date()
    const items: QuickPickItemEx[] = [...formats]
      .map((f) => ({
        label: formatDate(now, f),
        description: f,
      }))
    items.push(createHelpLinkPickItem())
    return items
  }

  const steps = [
    createStep({
      type: 'quickPick',
      name: 'format',
      title: 'edit.insertDate'.toLocalizeTitle(),
      items: createItems(),
      placeholder: 'edit.insertDate.placeholder'.toLocalize(),
      matchOnDescription: true,
      onDidChangeValue: (sender) => {
        sender.items = createItems()
      },
      onDidChangeActive: (_, e) => {
        if (e.length > 0) {
          state.pick = e[0]
          state.format = e[0].label
          onDidChangeState()
        }
      },
    }),
  ]

  const isAccept = await runSteps(steps)
  dispose()

  if (isAccept) {
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
  { name: 'edit.insertDate', func: insert },
]
