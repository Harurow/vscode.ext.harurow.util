import { window, TextDocument, TextEditorEdit, Selection, TextEditor } from 'vscode'
import { UserCanceled, validateRegex } from '../../../utils'
import { transformTemplate } from '../util'

function extendsToLineSelection (sel: Selection): Selection {
  const anchorLine = sel.anchor.line < sel.active.line && sel.active.character === 0
    ? sel.active.line - 1
    : sel.active.line

  return new Selection(sel.anchor.line, 0, anchorLine, Number.MAX_VALUE)
}

function extendsToLineSelections (editor: TextEditor): Selection[] {
  editor.selections = editor.selections.map(extendsToLineSelection)
  return editor.selections
}

async function transformLines<T = void> (
  input: () => Promise<T>,
  replace: (doc: TextDocument, editBuilder: TextEditorEdit, selection: Selection, input: T) => void,
  failedMessage?: string | undefined): Promise<void> {
  return transformTemplate({
    getSelectionCallback: extendsToLineSelections,
    inputCallback: input,
    replaceCallback: replace,
    failedMessage: failedMessage
  })
}

export async function ifMatched (): Promise<void> {
  const input = async (): Promise<{pattern: string, ignoreCase: boolean}> => {
    const pattern = await window.showInputBox({
      placeHolder: 'removeLines.ifMatched.placeHoler'.toLocalize(),
      prompt: 'removeLines.ifMatched.prompt'.toLocalize(),
      validateInput: validateRegex('removeLines.ifMatched.invalidate'.toLocalize())
    })

    if (pattern === undefined) {
      throw new UserCanceled()
    }

    const ignoreCase = pattern.endsWith('\\i')
    return { pattern: pattern.slice(0, ignoreCase ? -2 : undefined), ignoreCase }
  }

  let removes = 0

  const replace = (doc: TextDocument, eb: TextEditorEdit, sel: Selection, input: {pattern: string, ignoreCase: boolean}): void => {
    const before = doc.getText(sel)
    const after = before
      .lines()
      .filter(line => {
        const match = !RegExp(input.pattern, input.ignoreCase ? 'i' : undefined).test(line)
        removes = match ? removes : removes + 1
        return match
      })
      .join('\n')

    if (before !== after) {
      eb.replace(sel, after)
    }
  }

  await transformLines<{pattern: string, ignoreCase: boolean}>(input, replace)

  if (removes === 0) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    window.showInformationMessage('notFound'.toLocalize())
  } else {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    window.showInformationMessage(
      'removeLines.ifMatched.result'
        .toLocalize()
        .replace('%1', `${removes.toLocaleString()}`))
  }
}

export async function ifUnmatched (): Promise<void> {
  const input = async (): Promise<{pattern: string, ignoreCase: boolean}> => {
    const pattern = await window.showInputBox({
      placeHolder: 'removeLines.ifUnmatched.placeHoler'.toLocalize(),
      prompt: 'removeLines.ifUnmatched.prompt'.toLocalize(),
      validateInput: validateRegex('removeLines.ifUnmatched.invalidate'.toLocalize())
    })

    if (pattern === undefined) {
      throw new UserCanceled()
    }

    const ignoreCase = pattern.endsWith('\\i')
    return { pattern: pattern.slice(0, ignoreCase ? -2 : undefined), ignoreCase }
  }

  let removes = 0

  const replace = (doc: TextDocument, eb: TextEditorEdit, sel: Selection, input: {pattern: string, ignoreCase: boolean}): void => {
    const before = doc.getText(sel)
    const after = before
      .lines()
      .filter(line => {
        const match = RegExp(input.pattern, input.ignoreCase ? 'i' : undefined).test(line)
        removes = match ? removes : removes + 1
        return match
      })
      .join('\n')

    if (before !== after) {
      eb.replace(sel, after)
    }
  }

  await transformLines<{pattern: string, ignoreCase: boolean}>(input, replace)

  if (removes === 0) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    window.showInformationMessage('notFound'.toLocalize())
  } else {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    window.showInformationMessage(
      'removeLines.ifUnmatched.result'
        .toLocalize()
        .replace('%1', `${removes.toLocaleString()}`))
  }
}

export const cmdTable =
[
  { name: 'removeLines.ifMatched', func: ifMatched },
  { name: 'removeLines.ifUnmatched', func: ifUnmatched }
]

export default cmdTable
