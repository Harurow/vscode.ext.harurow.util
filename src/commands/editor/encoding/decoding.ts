import * as vscode from 'vscode'
import { createReplaceDecorationRenderOptions, Step, createStep, runSteps, getVisibleRanges } from '../../../utils'
import { fromEscapeEncode, fromMarkupLanguageEncode, fromPercentEncode, fromBase64Encode } from './decodingInternal'
import { ConvertKind, toRotEncode } from './encodingInternal'

type ConvertQuickPickItem = vscode.QuickPickItem & {
  convertKind: ConvertKind
  options: any
}

const itemsDecodePercent1: ConvertQuickPickItem[] = [
  {
    label: '% エンコーディング - UTF8',
    description: 'RFC3986準拠(UTF8), JavaScript: encodeURI, encodeURIComponent',
    convertKind: 'decodePercent',
    options: {
      encoding: 'UTF8',
      plus: '+',
    },
  },
  {
    label: '% エンコーディング - SJIS',
    description: 'RFC3986(SJIS)',
    convertKind: 'decodePercent',
    options: {
      encoding: 'SJIS',
      plus: '+',
    },
  },
  {
    label: '% エンコーディング - EUCJP',
    description: 'RFC3986(EUCJP)',
    convertKind: 'decodePercent',
    options: {
      encoding: 'EUCJP',
      plus: '+',
    },
  },
]

const itemsDecodePercent2: ConvertQuickPickItem[] = ['UTF8', 'SJIS', 'EUCJP'].flatMap(enc => [{
  label: `x-www-form-urlencoded - ${enc}`,
  description: `RFC1866準拠 - ${enc}`,
  convertKind: 'decodePercent',
  options: {
    encoding: enc,
    plus: ' ',
  },
}])

const itemsDecodeMarkupLanguage: ConvertQuickPickItem[] = [
  {
    label: 'markup言語',
    description: 'HTML, XMLなど',
    convertKind: 'decodeMarkupLanguage',
    options: {},
  },
]

const itemsDecodeEscape: ConvertQuickPickItem[] = [
  {
    label: 'escapce',
    description: 'TypeScriptなど',
    convertKind: 'decodeEscape',
    options: {},
  },
]

const itemsDecodeBase64: ConvertQuickPickItem[] = ['UTF8', 'SJIS', 'EUCJP'].flatMap(enc => [
  {
    label: `base64 - ${enc}`,
    description: `RFC2045準拠 - ${enc}`,
    convertKind: 'decodeBase64',
    options: {
      encoding: enc,
      char62: '+',
      char63: '/',
    },
  },
  {
    label: `base64 safeUrl - ${enc}`,
    description: `base64url - ${enc}`,
    convertKind: 'decodeBase64',
    options: {
      encoding: enc,
      char62: '-',
      char63: '_',
    },
  },
])

const itemsEncodeROT: ConvertQuickPickItem[] = [
  {
    label: 'ROT16',
    description: 'ROT16',
    convertKind: 'encodeROT',
    options: {
      type: '16',
    },
  },
  {
    label: 'ROT47',
    description: 'ROT47',
    convertKind: 'encodeROT',
    options: {
      encoding: '47',
    },
  },
]

const items: ConvertQuickPickItem[] = [
  ...itemsDecodePercent1,
  ...itemsDecodePercent2,
  ...itemsDecodeMarkupLanguage,
  ...itemsDecodeEscape,
  ...itemsDecodeBase64,
  ...itemsEncodeROT,
]

const getConverter = (convertKind: ConvertKind, convertOptions: any): ((editor: vscode.TextEditor, range: vscode.Range) => vscode.DecorationOptions[]) => {
  if (convertKind === 'decodePercent') {
    return fromPercentEncode(convertOptions)
  }
  if (convertKind === 'decodeMarkupLanguage') {
    return fromMarkupLanguageEncode(convertOptions)
  }
  if (convertKind === 'decodeEscape') {
    return fromEscapeEncode(convertOptions)
  }
  if (convertKind === 'decodeBase64') {
    return fromBase64Encode(convertOptions)
  }
  if (convertKind === 'encodeROT') {
    return toRotEncode(convertOptions)
  }

  return (_editor: vscode.TextEditor, _range: vscode.Range): vscode.DecorationOptions[] => {
    return []
  }
}

const getDecorationOptions = (editor: vscode.TextEditor, convertKind: ConvertKind, convertOptions: any): vscode.DecorationOptions[] => {
  const visibleRanges = getVisibleRanges(editor)

  if (visibleRanges.length > 0) {
    const visibleRange = visibleRanges[0]
    const conv = getConverter(convertKind, convertOptions)
    return editor.selections
      .filter(s => visibleRange.intersection(s))
      .flatMap(s => conv(editor, s))
  }

  return []
}

export const convert = async (): Promise<void> => {
  const editor = vscode.window.activeTextEditor

  if (editor == null) {
    return
  }

  const state = {
    item: null as ConvertQuickPickItem | null,
  }

  const deco = vscode.window.createTextEditorDecorationType(
    createReplaceDecorationRenderOptions())

  const redraw = (): boolean => {
    if (state.item != null) {
      try {
        const options = getDecorationOptions(editor, state.item.convertKind, state.item.options)
        editor.setDecorations(deco, options)
      } catch (e) {
        console.error(e)
      }
      return true
    }

    editor.setDecorations(deco, [])
    return true
  }
  const disposables = [
    vscode.window.onDidChangeTextEditorVisibleRanges((e) => {
      if (editor === e.textEditor) {
        redraw()
      }
    }),
  ]

  const dispose = (): void => {
    disposables.forEach((obj) => obj.dispose())
    disposables.length = 0
    editor.setDecorations(deco, [])
    deco.dispose()
  }

  try {
    const steps: Step[] = [
      createStep({
        type: 'quickPick',
        name: 'select',
        title: 'デコード',
        placeholder: 'デコード方法を選択してください',
        items: items,
        onDidChangeActive: (_, items) => {
          if (items.length > 0) {
            state.item = items[0]
            redraw()
          }
        },
      }),
    ]

    const isAccept = await runSteps(steps)
    dispose()

    if (isAccept) {
      await editor.edit(eb => {
        if (state.item != null) {
          const conv = getConverter(state.item.convertKind, state.item.options)
          const options = editor.selections
            .flatMap(s => conv(editor, s))
            .reverse()
          options.forEach(opt => {
            eb.replace(opt.range, opt.renderOptions?.after?.contentText ?? '')
          })
        }
      })
    }
  } finally {
    dispose()
  }
}

export const cmdTable =
[
  { name: 'encoding.decode', func: convert },
]
