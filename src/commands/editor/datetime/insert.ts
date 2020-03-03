import { window, TextDocument, TextEditorEdit, Selection, workspace, Uri } from 'vscode'
import { transformTemplate } from '../util'
import { format } from './util'

export async function insert (uri: Uri): Promise<void> {
  const now = new Date()
  const fmt = (fmt: string): string => format(now, fmt)

  const conf = workspace.getConfiguration('harurow', uri)
  const values = conf.inspect('datetime.insert.format')

  const formats = values?.workspaceValue ?? values?.defaultValue

  const items = [
    ...(formats as string[])
  ].map((i: string) => ({ label: i, description: fmt(i) }))

  const result = await window.showQuickPick(items,
    {
      placeHolder: 'datetime.convert.placeholder'.toLocalize(),
      matchOnDescription: true,
      matchOnDetail: true
    }
  )

  if (result != null) {
    await edit((_: string): string => result.description)
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

export default cmdTable
