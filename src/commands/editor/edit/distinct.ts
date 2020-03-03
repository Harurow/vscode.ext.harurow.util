import { TextDocument, TextEditorEdit, Selection } from 'vscode'
import { transformTemplate } from '../util'

export async function distinct (): Promise<void> {
  await edit()
}

async function transform (replace: (doc: TextDocument, editBuilder: TextEditorEdit, selection: Selection) => void, failedMessage?: string | undefined): Promise<void> {
  return transformTemplate({
    getSelectionCallback: (e) => e.selections,
    replaceCallback: replace,
    failedMessage: failedMessage
  })
}

async function edit (): Promise<void> {
  await transform((doc, eb, sel) => {
    const before = doc.getText(sel)
    const hash: any = {}
    const after = before.lines()
      .filter(line => {
        if (hash[line] === true) {
          return false
        }
        hash[line] = true
        return true
      })
      .join('\n')

    if (before !== after) {
      eb.replace(sel, after)
    }
  })
}

export const cmdTable = [
  { name: 'edit.distinct', func: distinct }
]

export default cmdTable
