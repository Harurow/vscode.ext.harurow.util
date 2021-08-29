import * as vscode from 'vscode'
import { CharInfo } from '../../../utils'
import * as ej from 'encoding-japanese'

export type ConvertKind =
'encodeURI' |
'encodeURIComponent' |
'encodePercent' |
'encodeBase64'

/*
'fromRFC' | 'fromSGML' | 'fromUnicode' |
'fromBase64' | 'fromBase32' | 'fromBase85' | 'fromAscii85' |
'toRFC3986/simple' | 'toRFC3986/all' |
'toRFC1866/simple' | 'toRFC1866/all' |
'toSGML/character/simple' | 'toSGML/character/all' |
'toSGML/numeric/simple' | 'toSGML/numeric/all' |
'toUnicode/simple' | 'toUnicode/all' |
'toBase64/basic' | 'toBase64/standard' | 'toBase64/urlsafe' |
'toBase32/basic' | 'toBase32/hex' |
'toBase85' | 'toAscii85'
*/

export type EncodingKind = 'UTF8' | 'SJIS' | 'EUCJP'
export type RfcOptionsSpaceKind = '+' | '%20'

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

export const toJsEncodeUri = (options: {
  isSkipNewLine: boolean
}): ((editor: vscode.TextEditor, range: vscode.Range) => vscode.DecorationOptions[]) => {
  return toJsEncodeInternal({
    isPassChar: isJsEncodeUriPassChar,
    isSkipNewLine: options.isSkipNewLine,
  })
}

export const toJsEncodeUriComponent = (options: {
  isSkipNewLine: boolean
}): ((editor: vscode.TextEditor, range: vscode.Range) => vscode.DecorationOptions[]) => {
  return toJsEncodeInternal({
    isPassChar: isJsEncodeUriComponentPassChar,
    isSkipNewLine: options.isSkipNewLine,
  })
}

export const toPercentEncode = (options: {
  encoding: EncodingKind
  skipIfFailed: boolean
  upperCase: boolean
  space: RfcOptionsSpaceKind
  isPassUnreserveChars: boolean
  isSkipNewLine: boolean
}): ((editor: vscode.TextEditor, range: vscode.Range) => vscode.DecorationOptions[]) => {
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

  const pass = (_: number): CharConvertResult =>
    ({ status: false, failed: false, length: 1 })

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
    if (isAscii(charInfo.code)) {
      if (isSpace(charInfo.code)) return space(charInfo.code)
      if (isNewLine(charInfo.code)) return newLine(charInfo.code)
      if (isPass(charInfo.code)) return pass(charInfo.code)
      return { status: true, failed: false, length: 1, text: toFormat(charInfo.code) }
    }
    return other(charInfo)
  }

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

interface EncodeState {
  offset: number
  length: number
  text: string
}

type CharConvertResult =
  { status: false, failed: boolean, length: number } |
  { status: true, failed: boolean, length: number, text: string }

const isAscii = (code: number): boolean => code <= 0x7f

const isNewLine = (code: number): boolean => code === 0x0a || code === 0x0d

const isSpace = (code: number): boolean => code === 0x20

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

const toJsEncodeInternal = (options: {
  isPassChar: (code: number) => boolean
  isSkipNewLine: boolean
}): ((editor: vscode.TextEditor, range: vscode.Range) => vscode.DecorationOptions[]) => {
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

  const pass = (_: number): CharConvertResult =>
    ({ status: false, failed: false, length: 1 })

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

  const encodeCore = (charInfo: CharInfo): CharConvertResult => {
    if (isAscii(charInfo.code)) {
      if (isNewLine(charInfo.code)) return newLine(charInfo.code)
      if (isPassChar(charInfo.code)) return pass(charInfo.code)
      return { status: true, failed: false, length: 1, text: toFormat(charInfo.code) }
    }
    return other(charInfo)
  }

  return encodeInternal(encodeCore)
}

/*
export const toRfc = (options: {
  encoding: EncodingKind
  upperCase: boolean
  skipIfFailed: boolean
  space: RfcOptionsSpaceKind
  unreserve: boolean
  newline: boolean
}): ((editor: vscode.TextEditor, range: vscode.Range) => vscode.DecorationOptions[]) => {
  return (editor, range) => {
    const results = [] as vscode.DecorationOptions[]

    const toHex = options.upperCase
      ? (code: number): string => {
        const hex = code.toString(16).toUpperCase()
        if (hex.length >= 2) {
          return hex
        }
        return '0'.repeat(2 - hex.length) + hex
      }
      : (code: number): string => {
        const hex = code.toString(16)
        if (hex.length >= 2) {
          return hex
        }
        return '0'.repeat(2 - hex.length) + hex
      }

    const space = (_: CharInfo): CharConvertResult => {
      return { status: true, failed: false, length: 1, text: options.space }
    }
    const unreserve = (ch: CharInfo): CharConvertResult => {
      return { status: options.unreserve, failed: false, length: 1, text: `%${toHex(ch.code)}` }
    }
    const newLine = (ch: CharInfo): CharConvertResult => {
      return { status: options.newline, failed: false, length: 1, text: `%${toHex(ch.code)}` }
    }
    const ascii = (ch: CharInfo): CharConvertResult => {
      return { status: true, failed: false, length: 1, text: `%${toHex(ch.code)}` }
    }
    const other = (ch: CharInfo): CharConvertResult => {
      const binArray = ej.convert(ej.stringToCode(ch.char), options.encoding, 'UNICODE')
      if (binArray[0] === 0x3f) {
        return {
          status: !options.skipIfFailed,
          failed: true,
          length: ch.code <= 0xffff ? 1 : 2,
          text: `%${toHex(0x3f)}`,
        }
      }
      return {
        status: true,
        failed: false,
        length: ch.code <= 0xffff ? 1 : 2,
        text: binArray
          .map(c => `%${toHex(c)}`)
          .join(''),
      }
    }

    const conv = (ch: CharInfo): CharConvertResult => {
      const code = ch.code
      if (isAscii(code)) {
        if (isNewLine(code)) return newLine(ch)
        if (isSpace(code)) return space(ch)
        if (isRfcPassChar(code)) return unreserve(ch)
        return ascii(ch)
      }
      return other(ch)
    }

    let current: {
      offset: number
      length: number
      text: string
    } | undefined

    const pushCurrentToResults = (): void => {
      if (current == null) {
        return
      }
      const range = new vscode.Range(
        editor.document.positionAt(current.offset),
        editor.document.positionAt(current.offset + current.length))
      results.push({
        range,
        renderOptions: {
          after: {
            contentText: current.text,
          },
        },
      })
      current = undefined
    }

    const offset = editor.document.offsetAt(range.start)

    let i = 0
    editor.document
      .getText(range)
      .charInfos()
      .forEach((ch) => {
        const result = conv(ch)

        if (current != null) {
          if (result.status) {
            current.length += result.length
            current.text += result.text
          } else {
            pushCurrentToResults()
          }
        } else if (result.status) {
          current = {
            offset: offset + i,
            length: result.length,
            text: result.text,
          }
        }
        i += result.length
      })

    pushCurrentToResults()

    return results
  }
}
*/

export function encodeRfc (isRfc1866: boolean, isAll: boolean, encoding: ej.Encoding): (text: string) => { result: string, failed: number } {
  let failed = 0
  const sp = isRfc1866 ? '+' : '%20'
  const etc = isAll
    ? (ci: CharInfo) => `%${ci.code.toHex(2)}`
    : (ci: CharInfo) => ci.char
  const enc = (ci: CharInfo): string =>
    ej.convert(ej.stringToCode(ci.char), encoding, 'UNICODE')
      .map(c => `%${c.toHex(2)}`)
      .join('')

  return (text: string) => ({
    result: text.charInfos()
      .map(ci => {
        if (ci.isSpace) return sp
        if (ci.isRfc3986Unreserved) return etc(ci)
        if (ci.isAscii) return `%${ci.code.toHex(2)}`
        const ch = enc(ci)
        if (ch.startsWith('%3f')) {
          failed++
        }
        return ch
      })
      .join(''),
    failed: failed,
  })
}

export function decodeRfc (encoding: ej.Encoding): (text: string) => string {
  return (text: string): string => {
    const dec = (m: string): string => {
      const code = m.match(/%[0-9A-Fa-f]{2}/g)
        ?.map(m => Number.parseInt(m.substr(1), 16)) as number[]
      return ej.codeToString(ej.convert(code, 'UNICODE', encoding))
    }

    return text.replace(/[+]/g, ' ')
      .replace(/(%[0-9A-Fa-f]{2})+/g, dec)
  }
}
