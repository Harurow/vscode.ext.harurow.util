import * as vscode from 'vscode'
import { createReplaceDecorationRenderOptions, Step, createStep, runSteps, getVisibleRanges } from '../../../utils'
import { ConvertKind, toBase64Encode, toJsEncodeUri, toJsEncodeUriComponent, toPercentEncode } from './rfc'

// https://docs.python.org/ja/dev/library/base64.html

type ConvertQuickPickItem = vscode.QuickPickItem & {
  convertKind: ConvertKind
  options: any
}

const itemsEncodeURI: ConvertQuickPickItem[] = [
  { isSkipNewLine: false, label: '', desc: '' },
//  { isSkipNewLine: true, label: ' (改行は除く)', desc: ' (改行は除く)' },
].flatMap(isSkipNewLineOption => [{
  label: `encodeURI${isSkipNewLineOption.label}`,
  description: `JavaScript: encodeURI${isSkipNewLineOption.desc}`,
  convertKind: 'encodeURI',
  options: {
    isSkipNewLine: isSkipNewLineOption.isSkipNewLine,
  },
}])

const itemsEncodeURIComponent: ConvertQuickPickItem[] = [
  { isSkipNewLine: false, label: '', desc: '' },
//  { isSkipNewLine: true, label: ' (改行は除く)', desc: ' (改行は除く)' },
].flatMap(isSkipNewLineOption => [{
  label: `encodeURIComponent${isSkipNewLineOption.label}`,
  description: `JavaScript: encodeURIComponent${isSkipNewLineOption.desc}`,
  convertKind: 'encodeURIComponent',
  options: {
    isSkipNewLine: isSkipNewLineOption.isSkipNewLine,
  },
}])

const itemsEncodePercentRfc3986: ConvertQuickPickItem[] = ['UTF8', 'SJIS', 'EUCJP'].flatMap(enc => [
  { skipIfFailed: false, label: '', desc: '' },
  // { skipIfFailed: true, label: ' / 変換失敗はスキップ', desc: ' / 変換失敗はスキップ' },
].flatMap(skipIfFailedOption => [
  { isSkipNewLine: false, label: '', desc: '' },
  // { isSkipNewLine: true, label: ' (改行は除く)', desc: ' (改行は除く)' },
].flatMap(isSkipNewLineOption => [
  { isPassUnreserveChars: true, label: '', desc: '' },
  { isPassUnreserveChars: false, label: ' (全ての文字)', desc: ' (全ての文字を対象とする)' },
].flatMap(isPassUnreserveCharsOption => [{
  label: `% エンコーディング - ${enc}${isSkipNewLineOption.label}${isPassUnreserveCharsOption.label}${skipIfFailedOption.label}`,
  description: `RFC3986準拠 - ${enc}${isSkipNewLineOption.desc}${isPassUnreserveCharsOption.desc}${skipIfFailedOption.desc}`,
  convertKind: 'encodePercent',
  options: {
    upperCase: true,
    space: '%20',
    encoding: enc,
    isPassUnreserveChars: isPassUnreserveCharsOption.isPassUnreserveChars,
    skipIfFailed: skipIfFailedOption.skipIfFailed,
    isSkipNewLine: isSkipNewLineOption.isSkipNewLine,
  },
}]))))

const itemsEncodePercentRfc1866: ConvertQuickPickItem[] = ['UTF8', 'SJIS', 'EUCJP'].flatMap(enc => [
  { skipIfFailed: false, label: '', desc: '' },
  // { skipIfFailed: true, label: ' / 変換失敗はスキップ', desc: ' / 変換失敗はスキップ' },
].flatMap(skipIfFailedOption => [
  { isSkipNewLine: false, label: '', desc: '' },
  // { isSkipNewLine: true, label: ' (改行は除く)', desc: ' (改行は除く)' },
].flatMap(isSkipNewLineOption => [
  { isPassUnreserveChars: true, label: '', desc: '' },
  { isPassUnreserveChars: false, label: ' (全ての文字)', desc: ' (全ての文字を対象とする)' },
].flatMap(isPassUnreserveCharsOption => [{
  label: `x-www-form-urlencoded - ${enc}${isSkipNewLineOption.label}${isPassUnreserveCharsOption.label}${skipIfFailedOption.label}`,
  description: `RFC1866準拠 - ${enc}${isSkipNewLineOption.desc}${isPassUnreserveCharsOption.desc}${skipIfFailedOption.desc}`,
  convertKind: 'encodePercent',
  options: {
    upperCase: true,
    space: '+',
    encoding: enc,
    isPassUnreserveChars: isPassUnreserveCharsOption.isPassUnreserveChars,
    skipIfFailed: skipIfFailedOption.skipIfFailed,
    isSkipNewLine: isSkipNewLineOption.isSkipNewLine,
  },
}]))))

const itemsEncodeBase64: ConvertQuickPickItem[] = ['UTF8', 'SJIS', 'EUCJP'].flatMap(enc => [
  {
    label: `base64 - ${enc}`,
    description: `RFC2045準拠 - ${enc}`,
    convertKind: 'encodeBase64',
    options: {
      encoding: enc,
      char62: '+',
      char63: '/',
      padding: '=',
      line: 76,
    },
  },
  {
    label: `base64 safeUrl - ${enc}`,
    description: `base64url - ${enc}`,
    convertKind: 'encodeBase64',
    options: {
      encoding: enc,
      char62: '-',
      char63: '_',
      padding: '',
      line: 0,
    },
  },
])

const items: ConvertQuickPickItem[] = [
  ...itemsEncodeURI,
  ...itemsEncodeURIComponent,
  ...itemsEncodePercentRfc3986,
  ...itemsEncodePercentRfc1866,
  ...itemsEncodeBase64,
]

const getConverter = (convertKind: ConvertKind, convertOptions: any): ((editor: vscode.TextEditor, range: vscode.Range) => vscode.DecorationOptions[]) => {
  if (convertKind === 'encodePercent') {
    return toPercentEncode(convertOptions)
  }
  if (convertKind === 'encodeURI') {
    return toJsEncodeUri(convertOptions)
  }
  if (convertKind === 'encodeURIComponent') {
    return toJsEncodeUriComponent(convertOptions)
  }
  if (convertKind === 'encodeBase64') {
    return toBase64Encode(convertOptions)
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
        title: 'エンコード',
        placeholder: 'エンコード方法を選択してください',
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
  { name: 'encoding.encode', func: convert },
]
