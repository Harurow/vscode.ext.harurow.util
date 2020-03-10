/* eslint-disable quote-props */
import { QuickPickItem, TextDocument, TextEditorEdit, Selection, window } from 'vscode'
import { MultiStepInput } from '../../../utils'
import { transformTemplate, handleError } from '../util'
import { encodeSgml } from './sgml'
import * as ej from 'encoding-japanese'
import { encodeRfc } from './rfc'
import { encodeUnicode } from './unicode'

type TypeQuickPickItem = QuickPickItem & { type: string, option: string }
type CharsetQuickPickItem = QuickPickItem & { charset: string }
type BaseNumberQuickPickItem = QuickPickItem & { baseNumber: string }

interface State {
  type?: TypeQuickPickItem
  charset?: CharsetQuickPickItem
  baseNumber?: BaseNumberQuickPickItem
}

function getItems (): TypeQuickPickItem[] {
  return [
    'rfc3986/c',
    'rfc3986All/c',
    'rfc1866/c',
    'rfc1866All/c',
    'sgmlEntRefSpChar/b',
    'sgmlEntRefAllChar/b',
    'sgmlNumRefSpChar/b',
    'sgmlNumRefAllChar/b',
    'unicode/',
    'unicodeAll/'
  ].map(i => {
    const [type, opt] = i.split('/')
    return {
      type: type,
      label: `encoding.encode.${type}.label`.toLocalize(),
      description: `encoding.encode.${type}.description`.toLocalize(),
      detail: `encoding.encode.${type}.detail`.toLocalize(),
      option: opt
    }
  })
}

function getCharsets (): CharsetQuickPickItem[] {
  return [
    {
      charset: 'UTF8',
      label: 'encoding.charset.utf8.label'.toLocalize(),
      description: 'encoding.charset.utf8.description'.toLocalize()
    },
    {
      charset: 'SJIS',
      label: 'encoding.charset.shiftJis.label'.toLocalize(),
      description: 'encoding.charset.shiftJis.description'.toLocalize()
    },
    {
      charset: 'EUCJP',
      label: 'encoding.charset.eucJp.label'.toLocalize(),
      description: 'encoding.charset.eucJp.description'.toLocalize()
    }
  ]
}

function getBaseNumbers (): BaseNumberQuickPickItem[] {
  return [
    { baseNumber: 'hex', label: 'encoding.baseNumber.hex.label'.toLocalize() },
    { baseNumber: 'dec', label: 'encoding.baseNumber.dec.label'.toLocalize() }
  ]
}

export async function encoding (): Promise<void> {
  const state: Partial<State> = {}

  async function pickType (input: MultiStepInput, state: Partial<State>): Promise<any> {
    state.type = await input.showQuickPick<TypeQuickPickItem>({
      placeholder: 'encoding.encode.placeHolder'.toLocalize(),
      items: getItems()
    })

    if (state.type != null) {
      if (state.type.option.includes('c')) {
        return async (input: MultiStepInput) => pickCharset(input, state)
      }
      if (state.type.option.includes('b')) {
        return async (input: MultiStepInput) => pickBaseNumber(input, state)
      }
    }
  }

  async function pickCharset (input: MultiStepInput, state: Partial<State>): Promise<any> {
    state.charset = await input.showQuickPick<CharsetQuickPickItem>({
      placeholder: 'encoding.charset.placeHolder'.toLocalize(),
      items: getCharsets()
    })
    if (state.type?.option.includes('b') ?? false) {
      return async (input: MultiStepInput) => pickBaseNumber(input, state)
    }
  }

  async function pickBaseNumber (input: MultiStepInput, state: Partial<State>): Promise<any> {
    state.baseNumber = await input.showQuickPick<BaseNumberQuickPickItem>({
      placeholder: 'encoding.charset.placeHolder'.toLocalize(),
      items: getBaseNumbers()
    })
  }

  let result = false

  try {
    result = await MultiStepInput.run(async input => pickType(input, state))
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    handleError(err)
  } finally {
    if (result) {
      const func = replace(state)
      await edit(func)
    }
  }
}

function replace (state: State): (text: string) => { result: string, failed: number } {
  const type = state?.type?.type
  const charSet = (state?.charset?.charset ?? 'UTF8') as ej.Encoding
  const baseNum = (state?.baseNumber?.baseNumber ?? 'hex')

  if (type?.startsWith('rfc') === true) {
    return encodeRfc(type.includes('1866'), type.includes('All'), charSet)
  } else if (type?.startsWith('sgml') === true) {
    return encodeSgml(baseNum === 'hex', type.includes('All'), type.includes('Ent'))
  } else if (type?.startsWith('unicode') === true) {
    return encodeUnicode(type.includes('All'))
  }
  return (text) => ({ result: text, failed: 0 })
}

async function transform (replace: (doc: TextDocument, editBuilder: TextEditorEdit, selection: Selection) => void, failedMessage?: string | undefined): Promise<void> {
  return transformTemplate({
    getSelectionCallback: (e) => e.selections,
    replaceCallback: replace,
    failedMessage: failedMessage
  })
}

async function edit (callback: (str: string) => { result: string, failed: number }): Promise<void> {
  let failedNum = 0
  await transform((doc, eb, sel) => {
    const before = doc.getText(sel)
    const { result, failed } = callback(before)
    failedNum += failed

    if (before !== result) {
      eb.replace(sel, result)
    }
  })
  if (failedNum > 0) {
    const msg = 'encoding.encode.failed'.toLocalize(failedNum)
    await window.showWarningMessage(msg)
  }
}

export const cmdTable =
[
  { name: 'encoding.encode', func: encoding }
]

export default cmdTable
