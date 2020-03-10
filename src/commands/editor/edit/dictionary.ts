import { TextDocument, TextEditorEdit, Selection, QuickPickItem } from 'vscode'
import { transformTemplate, getSelectTextIfExists, handleError } from '../util'
import { MultiStepInput, isNullOrEmpty } from '../../../utils'
import * as dict from 'harurow-ejdict'

interface State {
  pick?: QuickPickItem
}

function createPickItem (query: string): QuickPickItem[] {
  if (isNullOrEmpty(query)) {
    return []
  }
  return dict.match(query, 25)
    .map((i) => ({
      alwaysShow: true,
      picked: true,
      label: i.index,
      description: i.description,
      result: i.index
    }))
}

export async function dictionary (): Promise<void> {
  const state: State = {}
  const text = getSelectTextIfExists()
  const items: QuickPickItem[] = []

  if (text != null) {
    items.push(...createPickItem(text))
  }

  async function pick (input: MultiStepInput, state: State): Promise<any> {
    state.pick = await input.showQuickPick<QuickPickItem>({
      placeholder: '検索文字',
      value: text ?? undefined,
      items: items,
      activeItem: items.length > 0 ? items[0] : undefined,
      onDidChangeValue: (sender, input) => {
        sender.items = [...createPickItem(input)] as QuickPickItem[]
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
      await edit(state.pick)
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

async function edit (state: QuickPickItem): Promise<void> {
  await transform((doc, eb, sel) => {
    const before = doc.getText(sel)
    const after = state.label

    if (before !== after) {
      eb.replace(sel, after)
    }
  })
}

export const cmdTable = [
  { name: 'edit.dictionary', func: dictionary }
]

export default cmdTable
