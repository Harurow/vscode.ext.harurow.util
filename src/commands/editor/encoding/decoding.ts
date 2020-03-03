import { QuickPickItem, TextDocument, TextEditorEdit, Selection } from 'vscode'
import { MultiStepInput } from '../../../utils'
import { transformTemplate } from '../util'
import * as ej from 'encoding-japanese'
import { decodeRfc } from './rfc'
import { decodeSgml } from './sgml'
import { decodeUnicode } from './unicode'

type TypeQuickPickItem = QuickPickItem & { type: string, option: string }
type CharsetQuickPickItem = QuickPickItem & { charset: string }

interface State {
  type?: TypeQuickPickItem
  charset?: CharsetQuickPickItem
}

function getItems (): TypeQuickPickItem[] {
  return [
    'rfc/c',
    'sgml/',
    'unicode/'
  ].map(i => {
    const [type, opt] = i.split('/')
    return {
      type: type,
      label: `encoding.decode.${type}.label`.toLocalize(),
      description: `encoding.decode.${type}.description`.toLocalize(),
      detail: `encoding.decode.${type}.detail`.toLocalize(),
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

export async function decoding (): Promise<void> {
  const state: Partial<State> = {}

  async function pickType (input: MultiStepInput, state: Partial<State>): Promise<any> {
    state.type = await input.showQuickPick<TypeQuickPickItem>({
      placeholder: 'encoding.decode.placeHolder'.toLocalize(),
      items: getItems()
    })

    if (state.type != null) {
      if (state.type.option.includes('c')) {
        return async (input: MultiStepInput) => pickCharset(input, state)
      }
    }
  }

  async function pickCharset (input: MultiStepInput, state: Partial<State>): Promise<any> {
    state.charset = await input.showQuickPick<CharsetQuickPickItem>({
      placeholder: 'encoding.charset.placeHolder'.toLocalize(),
      items: getCharsets()
    })
  }

  let result = false

  try {
    result = await MultiStepInput.run(async input => pickType(input, state))
  } catch (err) {
    console.warn(err)
  } finally {
    if (result) {
      const func = replace(state)
      await edit(func)
    }
  }
}

function replace (state: State): (text: string) => string {
  const type = state?.type?.type
  const charSet = (state?.charset?.charset ?? 'UTF8') as ej.Encoding

  if (type?.startsWith('rfc') === true) {
    return decodeRfc(charSet)
  } else if (type?.startsWith('sgml') === true) {
    return decodeSgml()
  } else if (type?.startsWith('unicode') === true) {
    return decodeUnicode()
  }
  return (text) => text
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
  { name: 'encoding.decode', func: decoding }
]

export default cmdTable
