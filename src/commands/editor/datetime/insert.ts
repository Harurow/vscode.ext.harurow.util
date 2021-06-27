import { TextDocument, TextEditorEdit, Selection, workspace, Uri, QuickPickItem } from 'vscode'
import { transformTemplate, handleError } from '../util'
import { format } from './util'
import { MultiStepInput } from '../../../utils'

interface State {
  pick?: QuickPickItem
}

export async function insert (uri: Uri): Promise<void> {
  const state: State = {}
  const now = new Date()

  const conf = workspace.getConfiguration('harurow', uri)
  const values = conf.inspect('datetime.insert.format')
  const value = (values?.workspaceValue ?? values?.defaultValue) as string
  const formats = [
    'YYYY-MM',
    'YYYY-MM-DD',
    'YYYY-MM-DD HH:mm:ss.SSS',
    'L',
    'l',
    'LL',
    'll',
    'LLL',
    'lll',
    'LLLL',
    'llll'
  ]

  const createQuickPickItem = (fmt: string): QuickPickItem =>
    ({ label: format(now, fmt), description: fmt })

  const items = [...formats].map(createQuickPickItem)
  const activeItem = items.find((i) => i.description === value)

  async function pick (input: MultiStepInput, state: State): Promise<any> {
    state.pick = await input.showQuickPick({
      placeholder: 'datetime.insert.placeholder'.toLocalize(),
      matchOnDescription: true,
      items: items,
      activeItem: activeItem,
      onDidChangeValue: (sender, input) => {
        sender.items = [input, ...formats].map(createQuickPickItem)
      }
    })
  }

  let result = false

  try {
    result = await MultiStepInput.run(async input => pick(input, state))
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    handleError(err)
  } finally {
    if (result && state.pick != null) {
      await edit((_: string): string => state.pick?.label ?? '')
    }
  }
}

async function transform (replace: (doc: TextDocument, editBuilder: TextEditorEdit, selection: Selection) => void, failedMessage?: string | undefined): Promise<void> {
  return transformTemplate({
    getSelectionCallback: (e) => e.selections,
    replaceCallback: replace,
    isRequiredRegion: false,
    failedMessage: failedMessage
  })
}

async function edit (callback: (str: string) => string): Promise<void> {
  await transform((doc, eb, sel) => {
    const before = doc.getText(sel)
    const after = callback(before)

    if (before !== after) {
      eb.replace(sel, after)
    }
  })
}

export const cmdTable = [
  { name: 'datetime.insert', func: insert }
]
