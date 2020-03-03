import { TextDocument, TextEditorEdit, Selection } from 'vscode'
import { transformTemplate } from '../util'

export async function swap (): Promise<void> {
  const conv = (text: string): string =>
    text.replace(/^([\t ]*)([a-zA-Z_][a-zA-Z0-9_.]+)([\t ]*[=:][\t ]*)([a-zA-Z_][a-zA-Z0-9_.]+)([\t ]*[;,]?)$/gm, '$1$4$3$2$5')
  await edit(conv)
}

async function transform (replace: (doc: TextDocument, editBuilder: TextEditorEdit, selection: Selection) => void, failedMessage?: string | undefined): Promise<void> {
  return transformTemplate({
    getSelectionCallback: (e) => e.selections,
    replaceCallback: replace,
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

export const cmdTable =
[
  { name: 'edit.swap', func: swap }
]

export default cmdTable
