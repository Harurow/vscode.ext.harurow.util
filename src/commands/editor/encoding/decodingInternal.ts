import * as vscode from 'vscode'
import * as ej from 'encoding-japanese'
import { unescapeSpecialChar } from './markupLanguage'

export type EncodingKind = 'UTF8' | 'SJIS' | 'EUCJP'

export const isPassCharNever = (_: number): boolean => false

export const fromPercentEncode = (options: {
  encoding: EncodingKind
  plus: string
}): ((editor: vscode.TextEditor, range: vscode.Range) => vscode.DecorationOptions[]) => {
  return (editor: vscode.TextEditor, range: vscode.Range): vscode.DecorationOptions[] => {
    const text = editor.document.getText(range)

    const dec = (m: string): string => {
      const code = m.match(/%[0-9A-Fa-f]{2}/g)
        ?.map(m => Number.parseInt(m.substr(1), 16)) as number[]
      return ej.codeToString(ej.convert(code, 'UNICODE', options.encoding))
    }

    const decodeText = text.replace(/[+]/g, options.plus)
      .replace(/(%[0-9A-Fa-f]{2})+/g, dec)

    return [
      {
        range,
        renderOptions: {
          after: {
            contentText: decodeText,
          },
        },
      },
    ]
  }
}

export const fromMarkupLanguageEncode = (options: {
}): ((editor: vscode.TextEditor, range: vscode.Range) => vscode.DecorationOptions[]) => {
  return (editor: vscode.TextEditor, range: vscode.Range): vscode.DecorationOptions[] => {
    const text = editor.document.getText(range)

    const parse = (str: string): RegExpMatchArray =>
      str.match(/&[^;]+;|[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) ?? []

    const decHex = (str: string): string =>
      String.fromCodePoint(Number.parseInt(str.slice(3, -1), 16))

    const decDec = (str: string): string =>
      String.fromCodePoint(Number.parseInt(str.slice(2, -1), 10))

    const dec = (str: string): string => (str.startsWith('&#x') || str.startsWith('&#x'))
      ? decHex(str) : str.startsWith('&#')
        ? decDec(str) : unescapeSpecialChar(str)

    const decodeText = parse(text)
      .map(dec)
      .join('')

    return [
      {
        range,
        renderOptions: {
          after: {
            contentText: decodeText,
          },
        },
      },
    ]
  }
}

export const fromEscapeEncode = (options: {
}): ((editor: vscode.TextEditor, range: vscode.Range) => vscode.DecorationOptions[]) => {
  return (editor: vscode.TextEditor, range: vscode.Range): vscode.DecorationOptions[] => {
    const text = editor.document.getText(range)

    const parse = (str: string): RegExpMatchArray =>
      str.match(/\\x[0-9A-Fa-f]{2}|\\u[0-9A-Fa-f]{4}|\\u{[0-9A-Fa-f]{1,}}|[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) ?? []

    const dec = (str: string): string => {
      if (str.startsWith('\\x')) {
        const hex = str.slice(2)
        return String.fromCodePoint(Number.parseInt(hex, 16))
      }
      if (str.startsWith('\\u{')) {
        const hex = str.slice(3, -1)
        return String.fromCodePoint(Number.parseInt(hex, 16))
      }
      if (str.startsWith('\\u')) {
        const hex = str.slice(2)
        return String.fromCodePoint(Number.parseInt(hex, 16))
      }
      return str
    }

    const decodeText = parse(text)
      .map(dec)
      .join('')

    return [
      {
        range,
        renderOptions: {
          after: {
            contentText: decodeText,
          },
        },
      },
    ]
  }
}

export const fromBase64Encode = (options: {
  encoding: EncodingKind
  char62: string
  char63: string
}): ((editor: vscode.TextEditor, range: vscode.Range) => vscode.DecorationOptions[]) => {
  return (editor: vscode.TextEditor, range: vscode.Range): vscode.DecorationOptions[] => {
    const base64Text = editor.document.getText(range)
      .replace(new RegExp(`[${options.char62}]`, 'g'), '+')
      .replace(new RegExp(`[${options.char63}]`, 'g'), '/')

    const bin = ej.base64Decode(base64Text)
    const unicodeBin = ej.convert(bin, 'UNICODE', options.encoding)
    const text = ej.codeToString(unicodeBin)

    return [
      {
        range,
        renderOptions: {
          after: {
            contentText: text,
          },
        },
      },
    ]
  }
}
