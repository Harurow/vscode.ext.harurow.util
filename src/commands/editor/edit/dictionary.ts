import * as vscode from 'vscode'
import * as dict from 'harurow-ejdict'
import { createStep, runSteps } from '../../../utils'

export const dictionary = async (): Promise<void> => {
  const state = {
    pick: undefined as vscode.QuickPickItem | undefined,
    text: undefined as string | undefined,
  }

  const editor = vscode.window.activeTextEditor
  if (editor == null) {
    return
  }

  const word = editor.document.getText(editor.selection)

  const steps = [
    createStep({
      type: 'quickPick',
      title: 'edit.dictionary'.toLocalizeTitle(),
      placeholder: 'edit.dictionary.query.placeholder'.toLocalize(),
      name: 'letter',
      value: word,
      items: createQueryItems(word),
      onDidChangeValue: (sender, e) => {
        sender.items = createQueryItems(e)
      },
      onDidChangeActive: (_, e) => {
        if (e.length > 0) {
          state.pick = e[0]
        }
      },
      onDidAccept: () => 'select',
    }),
    createStep({
      type: 'quickPick',
      title: 'edit.dictionary'.toLocalizeTitle(),
      placeholder: 'edit.dictionary.type.placeholder'.toLocalize(),
      name: 'select',
      onWillShow: (sender) => {
        sender.items = createTypeItems(state.pick)
        state.text = ''
      },
      onDidChangeActive: (_, e) => {
        if (e.length > 0) {
          state.text = e[0].description
        }
      },
      onDidTriggerBackButton: () => 'letter',
    }),
  ]

  const isAccept = await runSteps(steps)
  if (isAccept && state.text != null) {
    const text = state.text
    await editor.edit((eb) => {
      eb.replace(editor.selection, text)
    })
  }
}

const createQueryItems = (query: string): vscode.QuickPickItem[] => {
  if (query == null || query.trim() === '') {
    return []
  }
  return dict.match(query.trim(), 25)
    .map((i) => ({
      alwaysShow: true,
      picked: true,
      label: i.word,
      description: i.description,
    }))
}

const createTypeItems = (item: vscode.QuickPickItem | undefined): vscode.QuickPickItem[] => {
  if (item == null) {
    return []
  }
  return [{
    alwaysShow: true,
    picked: false,
    label: 'edit.dictionary.type.item1'.toLocalize(),
    description: item.label,
  }, {
    alwaysShow: true,
    picked: false,
    label: 'edit.dictionary.type.item2'.toLocalize(),
    description: item.description,
  }]
}

export const cmdTable = [
  { name: 'edit.dictionary', func: dictionary },
]
