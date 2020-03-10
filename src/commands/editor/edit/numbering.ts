import { TextDocument, TextEditorEdit, Selection } from 'vscode'
import { transformTemplate, handleError } from '../util'
import { MultiStepInput } from '../../../utils'

type radix = 'bin' | 'dec' | 'oct' | 'hex' | 'HEX'

interface State {
  radix?: radix
  start?: number
  step?: number
  zeroPadLen?: number
}

export async function numbering (): Promise<void> {
  const state: State = {
    radix: 'dec',
    start: 0,
    step: 1,
    zeroPadLen: undefined
  }

  const parse = (input: string, radix: radix): number => {
    let value: number = NaN
    switch (radix) {
      case 'bin':
        if (/^-?[0|1]{1,}$/.test(input)) {
          value = Number.parseInt(input, 2)
        }
        break
      case 'oct':
        if (/^-?[0-7]{1,}$/.test(input)) {
          value = Number.parseInt(input, 8)
        }
        break
      case 'dec':
        if (/^-?[0-9]{1,}$/.test(input)) {
          value = Number.parseInt(input, 10)
        }
        break
      case 'hex':
      case 'HEX':
        if (/^-?[0-9|a-f|A-F]{1,}$/.test(input)) {
          value = Number.parseInt(input, 16)
        }
        break
    }
    return value
  }

  const validate = (input: string, radix: radix): string | undefined => {
    const value = parse(input, radix)
    if (isNaN(value)) {
      return 'edit.numbering.validation'.toLocalize()
    }
    return undefined
  }

  async function pickRadix (input: MultiStepInput, state: State): Promise<any> {
    const radixItems = [
      { radix: 'bin', label: '2', description: '[0|1]' },
      { radix: 'oct', label: '8', description: '[0-7]' },
      { radix: 'dec', label: '10', description: '[0-9]' },
      { radix: 'hex', label: '16', description: '[0-9|a-f]' },
      { radix: 'HEX', label: '16', description: '[0-9|A-F]' }
    ]
    const res = await input.showQuickPick({
      placeholder: 'edit.numbering.radix'.toLocalize(),
      items: radixItems,
      activeItem: radixItems[2]
    })

    if (res != null) {
      state.radix = res.radix as radix
      return async (input: MultiStepInput) => inputStart(input, state)
    }
  }

  async function inputStart (input: MultiStepInput, state: State): Promise<any> {
    const res = await input.showInputBox({
      prompt: 'edit.numbering.start'.toLocalize(),
      value: '0',
      validateInput: (i: string) => validate(i, state.radix as radix)
    })
    if (res != null) {
      state.start = parse(res, state.radix as radix)
      return async (input: MultiStepInput) => inputStep(input, state)
    }
  }

  async function inputStep (input: MultiStepInput, state: State): Promise<any> {
    const res = await input.showInputBox({
      prompt: 'edit.numbering.step'.toLocalize(),
      value: '1',
      validateInput: (i: string) => validate(i, 'dec')
    })
    if (res != null) {
      state.step = parse(res, 'dec')
      return async (input: MultiStepInput) => inputZeroPad(input, state)
    }
  }

  async function inputZeroPad (input: MultiStepInput, state: State): Promise<any> {
    const res = await input.showInputBox({
      prompt: 'edit.numbering.zeroPad'.toLocalize(),
      value: '0',
      validateInput: (i: string) => validate(i, 'dec')
    })
    if (res != null) {
      state.zeroPadLen = parse(res, 'dec')
    }
  }

  let result = false

  try {
    result = await MultiStepInput.run(async input => pickRadix(input, state))
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    handleError(err)
  } finally {
    if (result) {
      await edit(state)
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

async function edit (state: State): Promise<void> {
  let num = state.start as number
  const step = state.step as number
  const convert = (num: number): string => {
    switch (state.radix) {
      case 'bin': return num.toString(2)
      case 'oct': return num.toString(8)
      case 'dec': return num.toString(10)
      case 'hex': return num.toString(16)
      case 'HEX': return num.toString(16).toUpperCase()
    }
    return ''
  }
  const zeroPad = (text: string): string => {
    if (state.zeroPadLen != null && state.zeroPadLen > text.length) {
      return ('0'.repeat(state.zeroPadLen) + text).slice(-state.zeroPadLen)
    }
    return text
  }

  await transform((doc, eb, sel) => {
    const before = doc.getText(sel)
    const after = zeroPad(convert(num))
    num += step

    if (before !== after) {
      eb.replace(sel, after)
    }
  })
}

export const cmdTable = [
  { name: 'edit.numbering', func: numbering }
]

export default cmdTable
