import { TextDocument, TextEditorEdit, Selection, QuickPickItem } from 'vscode'
import { transformTemplate, getSelectTextIfExists } from '../util'
import { MultiStepInput } from '../../../utils'
import * as mee from 'math-expression-evaluator'

interface QuickPickItemEx extends QuickPickItem {
  result: boolean
}

interface State {
  pick?: QuickPickItemEx
}

function calculation (expr: string): { result: boolean, answer: string } {
  try {
    const answer: number = mee.eval(expr.replace(/%/, 'Mod'))
    return { result: true, answer: answer.toString() }
  } catch (err) {
  }
  return { result: false, answer: '' }
}

function createPickItem (expr: string): QuickPickItemEx {
  const result = calculation(expr)
  return {
    alwaysShow: true,
    picked: true,
    label: result.result ? result.answer : '-',
    description: `= ${expr}`,
    result: result.result
  }
}

export async function calc (): Promise<void> {
  const state: State = {}
  const text = getSelectTextIfExists()
  const items: QuickPickItemEx[] = []
  if (text != null) {
    items.push(createPickItem(text))
  }

  async function pick (input: MultiStepInput, state: State): Promise<any> {
    state.pick = await input.showQuickPick<QuickPickItemEx>({
      placeholder: '計算式',
      value: text ?? undefined,
      items: items,
      activeItem: items.length > 0 ? items[0] : undefined,
      onDidChangeValue: (sender, input) => {
        sender.items = [createPickItem(input)] as QuickPickItemEx[]
      }
    })
  }

  let result = false

  try {
    result = await MultiStepInput.run(async input => pick(input, state))
  } catch (err) {
    console.warn(err)
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
    failedMessage: failedMessage
  })
}

async function edit (state: QuickPickItemEx): Promise<void> {
  if (!state.result) {
    return
  }

  await transform((doc, eb, sel) => {
    const before = doc.getText(sel)
    const after = state.label

    if (before !== after) {
      eb.replace(sel, after)
    }
  })
}

export const cmdTable = [
  { name: 'edit.calc', func: calc }
]

export default cmdTable
