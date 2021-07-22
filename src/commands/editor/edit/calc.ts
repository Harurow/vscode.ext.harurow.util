import * as vscode from 'vscode'
import * as mee from 'math-expression-evaluator'
import { transformTemplate, getSelectTextIfExists, handleError } from '../util'
import { MultiStepInput } from '../../../utils'

interface QuickPickItemEx extends vscode.QuickPickItem {
  url?: vscode.Uri
  result: boolean
}

interface State {
  pick?: QuickPickItemEx
}

function calculation (expression: string): { result: boolean, answer: string } {
  try {
    const expr = expression
      .replace(/%/g, 'Mod')
      .replace(/[,|;]/g, '')
    const answer: number = mee.eval(expr)
    return { result: true, answer: answer.toString() }
  } catch (err) {
  }
  return { result: false, answer: '' }
}

function createPickItems (expr: string): QuickPickItemEx[] {
  const result = calculation(expr)
  if (result.result) {
    return [
      {
        alwaysShow: true,
        picked: true,
        label: result.answer,
        description: '',
        result: true
      },
      {
        alwaysShow: true,
        picked: false,
        label: result.answer,
        description: ` // ${expr}`,
        result: true
      },
      {
        alwaysShow: true,
        picked: false,
        label: result.answer,
        description: ` /* ${expr} */`,
        result: true
      },
      {
        alwaysShow: true,
        picked: false,
        label: result.answer,
        description: ` -- ${expr}`,
        result: true
      },
      {
        alwaysShow: true,
        picked: false,
        label: result.answer,
        description: ` # ${expr}`,
        result: true
      }
    ]
  } else {
    return [{
      alwaysShow: true,
      picked: false,
      label: 'edit.calc.invalid'.toLocalize(),
      description: '',
      result: false
    }]
  }
}

function createHelpLinkPickItem (): QuickPickItemEx {
  return {
    alwaysShow: true,
    picked: false,
    label: '',
    description: 'edit.calc.help'.toLocalize(),
    url: vscode.Uri.parse('http://bugwheels94.github.io/math-expression-evaluator/'),
    result: false
  }
}

export async function calc (): Promise<void> {
  const state: State = {}
  const text = getSelectTextIfExists()
  const items: QuickPickItemEx[] = []
  if (text != null) {
    items.push(...createPickItems(text))
  }
  items.push(createHelpLinkPickItem())

  async function pick (input: MultiStepInput, state: State): Promise<any> {
    state.pick = await input.showQuickPick<QuickPickItemEx>({
      placeholder: 'edit.calc.placeholder'.toLocalize(),
      value: text ?? undefined,
      items: items,
      activeItem: items.length > 0 ? items[0] : undefined,
      onDidChangeValue: (sender, input) => {
        sender.items = [
          ...createPickItems(input),
          createHelpLinkPickItem()
        ] as QuickPickItemEx[]
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
    if (state.pick != null) {
      if (state.pick.url != null) {
        await vscode.env.openExternal(state.pick.url)
      } else if (result) {
        await edit(state.pick)
      }
    }
  }
}

async function transform (replace: (doc: vscode.TextDocument, editBuilder: vscode.TextEditorEdit, selection: vscode.Selection) => void, failedMessage?: string | undefined): Promise<void> {
  return transformTemplate({
    getSelectionCallback: (e) => e.selections,
    replaceCallback: replace,
    isRequiredRegion: false,
    failedMessage: failedMessage
  })
}

async function edit (state: QuickPickItemEx): Promise<void> {
  if (!state.result) {
    return
  }

  await transform((doc, eb, sel) => {
    const before = doc.getText(sel)
    const after = state.label + (state.description ?? '')

    if (before !== after) {
      eb.replace(sel, after)
    }
  })
}

export const cmdTable = [
  { name: 'edit.calc', func: calc }
]
