import * as vscode from 'vscode'
import { CharInfo } from '../../../utils'
import * as ej from 'encoding-japanese'
import { markupLanguageSpecialChars } from './markupLanguage'

export type ConvertKind =
'encodeURI' |
'encodeURIComponent' |
'encodePercent' |
'encodeMarkupLanguage' |
'encodeEscape' |
'encodeBase64' |
'encodeROT' |
'decodePercent' |
'decodeMarkupLanguage' |
'decodeEscape' |
'decodeBase64'

/*
'toBase32/basic' | 'toBase32/hex' |
'toBase85' | 'toAscii85'
*/

export type EncodingKind = 'UTF8' | 'SJIS' | 'EUCJP'
export type RfcOptionsSpaceKind = '+' | '%20'

export type CharConvertResult =
  { status: false, failed: boolean, length: number } |
  { status: true, failed: boolean, length: number, text: string }

export const isPassCharNever = (_: number): boolean => false

export const isJsEncodeUriPassChar = (code: number): boolean => {
  return code === 0x21 || // !
    (code >= 0x23 && code <= 0x24) || // #$
    (code >= 0x26 && code <= 0x2f) || // &'()*+,-./
    (code >= 0x30 && code <= 0x3b) || // 0123456789:;
    code === 0x3d || code === 0x3f || // =?
    (code >= 0x40 && code <= 0x5a) || // @ABCDEFGHIJKLMNOPQRSTUVWXYZ
    code === 0x5f || // _
    (code >= 0x61 && code <= 0x7a) || // abcdefghijklmnopqrstuvwxyz
    code === 0x7e // ~
}

export const isJsEncodeUriComponentPassChar = (code: number): boolean => {
  return code === 0x21 || // !
    (code >= 0x27 && code <= 0x2a) || // '()*
    (code >= 0x2d && code <= 0x2e) || // -.
    (code >= 0x30 && code <= 0x39) || // 0123456789
    (code >= 0x41 && code <= 0x5a) || // ABCDEFGHIJKLMNOPQRSTUVWXYZ
    code === 0x5f || // _
    (code >= 0x61 && code <= 0x7a) || // abcdefghijklmnopqrstuvwxyz
    code === 0x7e // ~
}

export const isRfcPassChar = (code: number): boolean => {
  return (code >= 0x2d && code <= 0x2e) || // -.
    (code >= 0x30 && code <= 0x39) || // 0123456789
    (code >= 0x41 && code <= 0x5a) || // ABCDEFGHIJKLMNOPQRSTUVWXYZ
    code === 0x5f || // _
    (code >= 0x61 && code <= 0x7a) || // abcdefghijklmnopqrstuvwxyz
    code === 0x7e // ~
}

export const isXWwwFormuUrlPassChar = (code: number): boolean => {
  return code === 0x2a || // *
    code === 0x2d || // -
    code === 0x2e || // .
    (code >= 0x30 && code <= 0x39) || // 0123456789
    (code >= 0x41 && code <= 0x5a) || // ABCDEFGHIJKLMNOPQRSTUVWXYZ
    code === 0x5f || // _
    (code >= 0x61 && code <= 0x7a) // abcdefghijklmnopqrstuvwxyz
}

export const toJsEncodeCore = (options: {
  isPassChar: (code: number) => boolean
  isSkipNewLine: boolean
}): ((charInfo: CharInfo) => CharConvertResult) => {
  const toFormat = (code: number): string => {
    const hex = code.toString(16).toUpperCase()
    if (hex.length >= 2) {
      return `%${hex}`
    }
    return '%' + '0'.repeat(2 - hex.length) + hex
  }

  const newLine = (code: number): CharConvertResult =>
    ({ status: !options.isSkipNewLine, failed: false, length: 1, text: toFormat(code) })

  const isPassChar = options.isPassChar

  const pass = (charInfo: CharInfo): CharConvertResult =>
    ({ status: true, failed: false, length: 1, text: charInfo.char })

  const other = (charInfo: CharInfo): CharConvertResult => {
    const binArray = ej.convert(ej.stringToCode(charInfo.char), 'UTF8', 'UNICODE')
    if (binArray[0] === 0x3f) {
      return {
        status: true,
        failed: true,
        length: charInfo.code <= 0xffff ? 1 : 2,
        text: toFormat(charInfo.code),
      }
    }
    return {
      status: true,
      failed: false,
      length: charInfo.code <= 0xffff ? 1 : 2,
      text: binArray
        .map(toFormat)
        .join(''),
    }
  }

  return (charInfo: CharInfo): CharConvertResult => {
    if (charInfo.isAscii) {
      if (charInfo.isNewLine) return newLine(charInfo.code)
      if (isPassChar(charInfo.code)) return pass(charInfo)
      return { status: true, failed: false, length: 1, text: toFormat(charInfo.code) }
    }
    return other(charInfo)
  }
}

export const toPercentEncodeCore = (options: {
  encoding: EncodingKind
  skipIfFailed: boolean
  upperCase: boolean
  space: RfcOptionsSpaceKind
  isPassUnreserveChars: boolean
  isSkipNewLine: boolean
}): ((charInfo: CharInfo) => CharConvertResult) => {
  const toFormat = options.upperCase
    ? (code: number): string => {
      const hex = code.toString(16).toUpperCase()
      if (hex.length >= 2) {
        return `%${hex}`
      }
      return '%' + '0'.repeat(2 - hex.length) + hex
    }
    : (code: number): string => {
      const hex = code.toString(16)
      if (hex.length >= 2) {
        return `%${hex}`
      }
      return '%' + '0'.repeat(2 - hex.length) + hex
    }

  const space = (_: number): CharConvertResult =>
    ({ status: true, failed: false, length: 1, text: options.space })

  const newLine = (code: number): CharConvertResult =>
    ({ status: !options.isSkipNewLine, failed: false, length: 1, text: toFormat(code) })

  const isPass = options.isPassUnreserveChars ? isRfcPassChar : isPassCharNever

  const pass = (charInfo: CharInfo): CharConvertResult =>
    ({ status: true, failed: false, length: 1, text: charInfo.char })

  const other = (charInfo: CharInfo): CharConvertResult => {
    const binArray = ej.convert(ej.stringToCode(charInfo.char), options.encoding, 'UNICODE')
    if (binArray[0] === 0x3f) {
      return {
        status: !options.skipIfFailed,
        failed: true,
        length: charInfo.code <= 0xffff ? 1 : 2,
        text: toFormat(0x3f),
      }
    }
    return {
      status: true,
      failed: false,
      length: charInfo.code <= 0xffff ? 1 : 2,
      text: binArray
        .map(toFormat)
        .join(''),
    }
  }

  const encodeCore = (charInfo: CharInfo): CharConvertResult => {
    if (charInfo.isAscii) {
      if (charInfo.isSpace) return space(charInfo.code)
      if (charInfo.isNewLine) return newLine(charInfo.code)
      if (isPass(charInfo.code)) return pass(charInfo)
      return { status: true, failed: false, length: 1, text: toFormat(charInfo.code) }
    }
    return other(charInfo)
  }

  return encodeCore
}

export const toMarkupLanguageEncodeCore = (options: {
  numberFormat: 'dec' | 'hex' | 'HEX'
  special: 'charEntRef' | 'numCharRef'
  target: 'all' | 'special-char'
}): ((charInfo: CharInfo) => CharConvertResult) => {
  const toFormatNum = options.numberFormat === 'dec'
    ? (code: number): string => `&#${code.toString()};` : options.numberFormat === 'hex'
      ? (code: number): string => `&#x${code.toHex(2)};`
      : (code: number): string => `&#x${code.toHex(2).toUpperCase()};`

  const isNumFormat = (charInfo: CharInfo): boolean => (
    charInfo.code < 0x20 || charInfo.code === 0x27 || charInfo.code === 0x2f)

  const isSpecialChar = (charInfo: CharInfo): boolean => (
    markupLanguageSpecialChars.has(charInfo.char))

  const toFormatSpecialChar = options.special === 'charEntRef'
    ? (charInfo: CharInfo): CharConvertResult =>
      ({ status: true, failed: false, length: 1, text: markupLanguageSpecialChars.get(charInfo.char) ?? '' })
    : (charInfo: CharInfo): CharConvertResult =>
      ({ status: true, failed: false, length: 1, text: toFormatNum(charInfo.code) })

  const other = options.target === 'all'
    ? (charInfo: CharInfo): CharConvertResult => (
      { status: true, failed: false, length: charInfo.code <= 0xffff ? 1 : 2, text: toFormatNum(charInfo.code) })
    : (charInfo: CharInfo): CharConvertResult => (
      { status: true, failed: false, length: charInfo.code <= 0xffff ? 1 : 2, text: charInfo.char })

  const encodeCore = (charInfo: CharInfo): CharConvertResult => {
    if (isNumFormat(charInfo)) return { status: true, failed: false, length: 1, text: toFormatNum(charInfo.code) }
    if (isSpecialChar(charInfo)) return toFormatSpecialChar(charInfo)
    return other(charInfo)
  }

  return encodeCore
}

export const toEscapeEncodeCore = (options: {
  latin: '' | 'x' | 'u'
  surrogatePair: 'pair' | 'codePoint'
}): ((charInfo: CharInfo) => CharConvertResult) => {
  const toLatin = options.latin === ''
    ? (charInfo: CharInfo): CharConvertResult =>
      ({ status: true, failed: false, length: 1, text: charInfo.char }) : options.latin === 'x'
      ? (charInfo: CharInfo): CharConvertResult =>
        ({ status: true, failed: false, length: 1, text: `\\x${charInfo.code.toHex(2).toUpperCase()}` })
      : (charInfo: CharInfo): CharConvertResult =>
        ({ status: true, failed: false, length: 1, text: `\\u${charInfo.code.toHex(4).toUpperCase()}` })

  const toSurrogatePair = options.surrogatePair === 'pair'
    ? (charInfo: CharInfo): CharConvertResult => {
      const sp = charInfo.toSurrogatePair()
      return ({ status: true, failed: false, length: 2, text: `\\u${sp.hi.toHex(4).toUpperCase()}\\u${sp.lo.toHex(4).toUpperCase()}` })
    }
    : (charInfo: CharInfo): CharConvertResult => (
      { status: true, failed: false, length: 2, text: `\\u{${charInfo.code.toHex(1).toUpperCase()}}` })

  const other = (code: number): CharConvertResult => (
    { status: true, failed: false, length: 1, text: `\\u${code.toHex(4).toUpperCase()}` })

  const encodeCore = (charInfo: CharInfo): CharConvertResult => {
    if (charInfo.isLatin) return toLatin(charInfo)
    if (charInfo.isSurrogatePair) return toSurrogatePair(charInfo)
    return other(charInfo.code)
  }

  return encodeCore
}

export const toBase64EncodeCore = (text: string, options: {
  encoding: EncodingKind
  char62: string
  char63: string
  padding: string
  line: number
}): string => {
  const binArray = ej.convert(ej.stringToCode(text), options.encoding, 'UNICODE')
  let base64Text = ej.base64Encode(binArray)
    .replace(/[+]/g, options.char62)
    .replace(/[/]/g, options.char63)
    .replace(/[=]/g, options.padding)

  if (options.line > 0) {
    let tmp = base64Text
    let text = ''
    while (tmp.length > 0) {
      text += tmp.substr(0, options.line)
      text += '\r\n'
      tmp = tmp.substr(options.line)
    }
    base64Text = text
  }

  return base64Text
}

export const toRotEncodeCore = (options: {
  type: '16' | '47'
}): ((charInfo: CharInfo) => CharConvertResult) => {
  const isTarget = options.type === '16'
    ? (code: number): boolean => (code >= 0x41 && code <= 0x5a) || (code >= 0x61 && code <= 0x7a)
    : (code: number): boolean => code >= 0x21 && code <= 0x7e

  const map16from = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const map16to = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm'

  const map47from = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'
  const map47to = 'PQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNO'

  const toRotate = options.type === '16'
    ? (charInfo: CharInfo): CharConvertResult => ({ status: true, failed: false, length: 1, text: map16to[map16from.indexOf(charInfo.char)] })
    : (charInfo: CharInfo): CharConvertResult => ({ status: true, failed: false, length: 1, text: map47to[map47from.indexOf(charInfo.char)] })

  const other = (charInfo: CharInfo): CharConvertResult => (
    { status: true, failed: false, length: charInfo.code <= 0xffff ? 1 : 2, text: charInfo.char })

  const encodeCore = (charInfo: CharInfo): CharConvertResult => {
    if (isTarget(charInfo.code)) return toRotate(charInfo)
    return other(charInfo)
  }
  return encodeCore
}

export const toJsEncodeUri = (options: {
  isSkipNewLine: boolean
}): ((editor: vscode.TextEditor, range: vscode.Range) => vscode.DecorationOptions[]) => {
  const encodeCore = toJsEncodeCore({
    isPassChar: isJsEncodeUriPassChar,
    isSkipNewLine: options.isSkipNewLine,
  })
  return encodeInternal(encodeCore)
}

export const toJsEncodeUriComponent = (options: {
  isSkipNewLine: boolean
}): ((editor: vscode.TextEditor, range: vscode.Range) => vscode.DecorationOptions[]) => {
  const encodeCore = toJsEncodeCore({
    isPassChar: isJsEncodeUriComponentPassChar,
    isSkipNewLine: options.isSkipNewLine,
  })
  return encodeInternal(encodeCore)
}

export const toPercentEncode = (options: {
  encoding: EncodingKind
  skipIfFailed: boolean
  upperCase: boolean
  space: RfcOptionsSpaceKind
  isPassUnreserveChars: boolean
  isSkipNewLine: boolean
}): ((editor: vscode.TextEditor, range: vscode.Range) => vscode.DecorationOptions[]) => {
  const encodeCore = toPercentEncodeCore(options)
  return encodeInternal(encodeCore)
}

export const toMarkupLanguageEncode = (options: {
  numberFormat: 'dec' | 'hex' | 'HEX'
  special: 'charEntRef' | 'numCharRef'
  target: 'all' | 'special-char'
}): ((editor: vscode.TextEditor, range: vscode.Range) => vscode.DecorationOptions[]) => {
  const encodeCore = toMarkupLanguageEncodeCore(options)
  return encodeInternal(encodeCore)
}

export const toEscapeEncode = (options: {
  latin: '' | 'x' | 'u'
  surrogatePair: 'pair' | 'codePoint'
}): ((editor: vscode.TextEditor, range: vscode.Range) => vscode.DecorationOptions[]) => {
  const encodeCore = toEscapeEncodeCore(options)
  return encodeInternal(encodeCore)
}

export const toBase64Encode = (options: {
  encoding: EncodingKind
  char62: string
  char63: string
  padding: string
  line: number
}): ((editor: vscode.TextEditor, range: vscode.Range) => vscode.DecorationOptions[]) => {
  return (editor: vscode.TextEditor, range: vscode.Range): vscode.DecorationOptions[] => {
    const text = editor.document.getText(range)
    const base64Text = toBase64EncodeCore(text, options)
    return [
      {
        range,
        renderOptions: {
          after: {
            contentText: base64Text,
          },
        },
      },
    ]
  }
}

export const toRotEncode = (options: {
  type: '16' | '47'
}): ((editor: vscode.TextEditor, range: vscode.Range) => vscode.DecorationOptions[]) => {
  const encodeCore = toRotEncodeCore(options)
  return encodeInternal(encodeCore)
}

interface EncodeState {
  offset: number
  length: number
  text: string
}

const encodeInternal = (
  encodeCore: (charInfo: CharInfo) => CharConvertResult
): ((editor: vscode.TextEditor, range: vscode.Range) => vscode.DecorationOptions[]) => {
  return (editor, range) => {
    const results = [] as vscode.DecorationOptions[]

    let state: EncodeState | null = null

    const pushStateToResults = (): void => {
      if (state == null) {
        return
      }

      const range = new vscode.Range(
        editor.document.positionAt(state.offset),
        editor.document.positionAt(state.offset + state.length))

      results.push({
        range,
        renderOptions: {
          after: {
            contentText: state.text,
          },
        },
      })

      state = null
    }

    const offset = editor.document.offsetAt(range.start)

    let i = 0
    editor.document
      .getText(range)
      .charInfos()
      .forEach((ci) => {
        const result = encodeCore(ci)

        if (state != null) {
          if (result.status) {
            state.length += result.length
            state.text += result.text
          } else {
            pushStateToResults()
          }
        } else if (result.status) {
          state = {
            offset: offset + i,
            length: result.length,
            text: result.text,
          }
        }
        i += result.length
      })

    pushStateToResults()

    return results
  }
}
