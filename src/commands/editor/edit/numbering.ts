import * as vscode from 'vscode'
import { createStep, runSteps, setActiveItems, Step } from '../../../utils'

type RadixTypes = 'bin' | 'oct' | 'dec' | 'hex' | 'HEX'
type RadixValues = 2 | 8 | 10 | 16

interface RadixPickItem extends vscode.QuickPickItem {
  type: RadixTypes
  value: RadixValues
}

const radixItems: RadixPickItem[] = [
  { label: '2', description: '[0|1]', type: 'bin', value: 2 },
  { label: '8', description: '[0-7]', type: 'oct', value: 8 },
  { label: '10', description: '[0-9]', type: 'dec', value: 10 },
  { label: '16', description: '[0-9|a-f]', type: 'hex', value: 16 },
  { label: '16', description: '[0-9|A-F]', type: 'HEX', value: 16 }
]

const paddingItems: vscode.QuickPickItem[] = [
  { label: '', description: 'edit.numbering.padding.items.none'.toLocalize() },
  { label: ' ', description: 'edit.numbering.padding.items.space'.toLocalize() },
  { label: '0', description: 'edit.numbering.padding.items.zero'.toLocalize() }
]

export const numbering = async (): Promise<void> => {
  const state = {
    radixValue: 10 as RadixValues,
    radixType: 'dec' as RadixTypes,
    start: 0,
    step: 1,
    padding: '',
    length: 8
  }

  const editor = vscode.window.activeTextEditor
  if (editor == null) {
    return
  }

  const deco = vscode.window.createTextEditorDecorationType({
    after: {
      color: new vscode.ThemeColor('editor.foreground'),
      backgroundColor: new vscode.ThemeColor('editor.findMatchBackground')
    }
  })

  const getNumberingString = (index: number): string => {
    const num = state.start + state.step * index
    const numStr = state.radixType === 'HEX'
      ? num.toString(state.radixValue).toUpperCase()
      : num.toString(state.radixValue)

    if (state.padding === '') {
      return numStr
    }

    const paddingStr = state.padding.repeat(state.length)
    return (paddingStr + numStr).slice(-state.length)
  }

  const onDidChangeState = (): void => {
    const options = editor.selections.map((s, i) => ({
      range: s,
      renderOptions: {
        after: {
          contentText: getNumberingString(i).replace(/ /g, ' ')
        }
      }
    }))

    editor.setDecorations(deco, options)
  }

  const steps: Step[] = [
    createStep({
      type: 'quickPick',
      name: 'radix',
      title: 'edit.numbering.title'.toLocalize(),
      placeholder: 'edit.numbering.radix.placeholder'.toLocalize(),
      items: radixItems,
      onWillShow: (sender) => {
        setActiveItems(sender, (i) => i.type === state.radixType)
      },
      onDidChangeActive: (_, items) => {
        if (items.length > 0) {
          const item = items[0]
          state.radixValue = item.value
          state.radixType = item.type
          onDidChangeState()
        }
      },
      onDidAccept: () => 'start'
    }),
    createStep({
      type: 'inputBox',
      name: 'start',
      title: 'edit.numbering.title'.toLocalize(),
      placeholder: 'edit.numbering.start.placeholder'.toLocalize(),
      prompt: 'edit.numbering.start.placeholder'.toLocalize(),
      onWillShow: (sender) => {
        sender.value = state.start.toString(state.radixValue)
      },
      onDidChangeValue: (sender, e): void => {
        const [succeeded, value, display] = parseInputNumber(e, state.radixType)
        if (!succeeded) {
          sender.validationMessage = display
          return
        }
        sender.validationMessage = undefined
        state.start = value
        onDidChangeState()
      },
      onDidAccept: () => 'step',
      onDidTriggerBackButton: () => 'radix'
    }),
    createStep({
      type: 'inputBox',
      name: 'step',
      title: 'edit.numbering.title'.toLocalize(),
      placeholder: 'edit.numbering.step.placeholder'.toLocalize(),
      prompt: 'edit.numbering.step.placeholder'.toLocalize(),
      onWillShow: (sender) => {
        sender.value = state.step.toString(state.radixValue)
      },
      onDidChangeValue: (sender, e): void => {
        const [succeeded, value, display] = parseInputNumber(e, state.radixType)
        if (!succeeded) {
          sender.validationMessage = display
          return
        }
        sender.validationMessage = undefined
        state.step = value
        onDidChangeState()
      },
      onDidAccept: () => 'padding',
      onDidTriggerBackButton: () => 'start'
    }),
    createStep({
      type: 'quickPick',
      name: 'padding',
      title: 'edit.numbering.title'.toLocalize(),
      placeholder: 'edit.numbering.padding.placeholder'.toLocalize(),
      items: paddingItems,
      onWillShow: (sender) => {
        setActiveItems(sender, (i) => i.label === state.padding)
      },
      onDidChangeActive: (_, items) => {
        if (items.length > 0) {
          const item = items[0]
          state.padding = item.label
          onDidChangeState()
        }
      },
      onDidAccept: () => state.padding === '' ? undefined : 'length',
      onDidTriggerBackButton: () => 'step'
    }),
    createStep({
      type: 'inputBox',
      name: 'length',
      title: 'edit.numbering.title'.toLocalize(),
      placeholder: 'edit.numbering.length.placeholder'.toLocalize(),
      prompt: 'edit.numbering.length.placeholder'.toLocalize(),
      onWillShow: (sender) => {
        sender.value = state.length.toString(10)
      },
      onDidChangeValue: (sender, e): void => {
        const trimmed = e.trim()
        if (trimmed === '') {
          sender.validationMessage = 'edit.numbering.validation'.toLocalize()
          return
        }

        const parsedNumber = Number.parseInt(trimmed)
        if (!Number.isInteger(parsedNumber)) {
          sender.validationMessage = 'edit.numbering.validation'.toLocalize()
        }

        sender.validationMessage = undefined
        if (parsedNumber > 0 && parsedNumber < 1000) {
          state.length = parsedNumber
        }
        onDidChangeState()
      },
      onDidTriggerBackButton: () => 'padding'
    })
  ]

  const result = await runSteps(steps)

  editor.setDecorations(deco, [])
  deco.dispose()

  if (result) {
    await editor.edit((eb) => {
      editor.selections.forEach((s, i) => {
        const str = getNumberingString(i)
        eb.replace(s, str)
      })
    })
  }
}

const formatNumber = (number: number, radixType: RadixTypes): string => {
  return radixType === 'bin'
    ? `0b${number.toString(2)}` : radixType === 'oct'
      ? `0${number.toString(8)}` : radixType === 'dec'
        ? `${number.toString(10)}` : radixType === 'hex'
          ? `0x${number.toString(16)}`
          : `0x${number.toString(16).toUpperCase()}`
}

const parseInputNumber = (input: string, radixType: RadixTypes): ([false, number, string] | [true, number, string]) => {
  const trimmed = input.trim()

  if (trimmed === '') {
    return [false, Number.NaN, '']
  }

  const parsedNumber = Number.parseInt(trimmed)
  if (!Number.isInteger(parsedNumber)) {
    return [false, Number.NaN, 'edit.numbering.validation'.toLocalize()]
  }

  const displayNumber = formatNumber(parsedNumber, radixType)
  return [true, parsedNumber, displayNumber]
}

export const cmdTable = [
  { name: 'edit.numbering', func: numbering }
]
