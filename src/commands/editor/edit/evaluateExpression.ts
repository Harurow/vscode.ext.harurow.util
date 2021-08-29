import * as vscode from 'vscode'
import * as mee from 'math-expression-evaluator'
import { createOnDidChangeState, createStep, runSteps } from '../../../utils'

interface QuickPickItemEx extends vscode.QuickPickItem {
  format?: string
  result?: boolean
  url?: vscode.Uri
}

const evaluateExpression = (expression: string): [boolean, string] => {
  try {
    const expr = expression
      .replace(/%/g, 'Mod')
      .replace(/[,|;]/g, '')

    const answer: number = mee.eval(expr)
    return [true, answer.toString()]
  } catch (err) {
  }

  return [false, '']
}

const formatString = (ans: string, expr: string, format: string): string => {
  return format.replace('{ans}', ans).replace('{expr}', expr)
}

function createPickItems (expr: string): QuickPickItemEx[] {
  const [result, answer] = evaluateExpression(expr)

  const formats = [
    '{ans}',
    '{ans} // {expr}',
    '{ans} /* {expr} */',
    '{ans} -- {expr}',
    '{ans} # {expr}',
  ]

  const items: QuickPickItemEx[] = result
    ? formats.map((f) => ({
      alwaysShow: true,
      picked: false,
      label: answer,
      format: f,
      result: true,
      description: formatString(answer, expr, f),
    })) : [{
      alwaysShow: true,
      picked: false,
      label: 'edit.evaluate.invalid'.toLocalize(),
      description: '',
    }]

  items.push({
    alwaysShow: true,
    picked: false,
    label: '',
    description: 'edit.evaluate.help'.toLocalize(),
    url: vscode.Uri.parse('http://bugwheels94.github.io/math-expression-evaluator/'),
  })

  return items
}

export const evaluate = async (): Promise<void> => {
  const state = {
    pick: undefined as QuickPickItemEx | undefined,
  }

  const result = createOnDidChangeState({
    converter: (editor, range, index) => {
      if (state.pick?.result === true && state.pick?.description != null) {
        if (index === 0) {
          return state.pick.description
        }
        const expr = editor.document.getText(range)
        const [result, answer] = evaluateExpression(expr)
        if (result) {
          return formatString(answer, expr, state.pick.format ?? '{ans}')
        }
      }
    },
  })

  if (result.status === 'NG') {
    return
  }

  const { editor, onDidChangeState, dispose } = result

  const str = editor.document.getText(editor.selection)

  const steps = [
    createStep({
      type: 'quickPick',
      name: 'expr',
      title: 'edit.evaluate'.toLocalizeTitle(),
      placeholder: 'edit.evaluate.placeholder'.toLocalize(),
      value: str,
      items: createPickItems(str),
      onDidChangeValue: (sender, e) => {
        sender.items = createPickItems(e)
      },
      onDidChangeActive: (sender, e) => {
        if (e.length > 0) {
          state.pick = e[0]
          onDidChangeState()
        }
      },
    }),
  ]

  const isAccept = await runSteps(steps)
  dispose()

  if (isAccept) {
    if (state.pick?.url != null) {
      await vscode.env.openExternal(state.pick.url)
    } else if (state.pick?.result === true && state.pick?.description != null) {
      const value = state.pick?.description
      const format = state.pick?.format ?? '{ans}'
      await editor.edit((eb) => {
        editor.selections.forEach((s, i) => {
          if (i === 0) {
            eb.replace(s, value)
          } else {
            const expr = editor.document.getText(s)
            const [result, answer] = evaluateExpression(expr)
            if (result) {
              const str = formatString(answer, expr, format)
              eb.replace(s, str)
            }
          }
        })
      })
    }
  }
}

export const cmdTable = [
  { name: 'edit.evaluate', func: evaluate },
]
