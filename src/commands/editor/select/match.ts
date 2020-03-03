import { window, TextDocument, TextEditorEdit, Selection } from 'vscode'
import { UserCanceled, validateRegex } from '../../../utils'
import { tryCatch, validateSelection } from '../util'

function matches (regex: RegExp, text: string, offset: number, doc: TextDocument): Selection[] {
  const results = new Array<Selection>()

  let m: RegExpExecArray | null
  while ((m = regex.exec(text)) != null && m[0].length !== 0) {
    results.push(new Selection(
      doc.positionAt(offset + m.index),
      doc.positionAt(offset + m.index + m[0].chars().length)))
  }

  return results
}

async function selectionTemplate (): Promise<void> {
  await tryCatch(async () => {
    const { editor, selections, document } = validateSelection()

    const input = await window.showInputBox({
      placeHolder: 'select.ifMatched.placeHoler'.toLocalize(),
      prompt: 'select.ifMatched.prompt'.toLocalize(),
      validateInput: validateRegex('select.ifMatched.invalidate'.toLocalize())
    })

    if (input === undefined) {
      throw new UserCanceled()
    }

    const ignoreCase = input.endsWith('\\i')
    const pattern = input.slice(0, ignoreCase ? -2 : undefined)

    await editor.edit((eb: TextEditorEdit) => {
      const newSelections = new Array<Selection>()

      for (const sel of selections) {
        const text = document.getText(sel)
        const regex = RegExp(pattern, ignoreCase ? 'gmi' : 'gm')
        const offset = document.offsetAt(sel.start)
        newSelections.push(...matches(regex, text, offset, document))
      }

      if (newSelections.length === 0) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        window.showInformationMessage('notFound'.toLocalize())
      } else {
        editor.selections = newSelections
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        window.showInformationMessage(
          'select.ifMatched.result'
            .toLocalize()
            .replace('%1', `${newSelections.length.toLocaleString()}`))
      }
    })
  })
}

export async function ifUnmatched (): Promise<void> {
  return selectionTemplate()
}

export const cmdTable =
[
  { name: 'select.ifMatched', func: ifUnmatched }
]

export default cmdTable
