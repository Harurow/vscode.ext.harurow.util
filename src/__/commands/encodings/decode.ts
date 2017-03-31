import * as ej from 'encoding-japanese'
import { percentEncodedCodePoints, CharInfo, hex } from '../../utils/string'

const isUnreserved = (code: number) =>
    0x41 <= code && code <= 0x5A ||     // A-Z
    0x61 <= code && code <= 0x7A ||     // a-z
    0x30 <= code && code <= 0x39 ||     // 0-9
    code === 0x2D                ||     // - hyphen
    code === 0x2E                ||     // . dot
    code === 0x5F                ||     // _ under-scodeore
    code === 0x7E                       // ~ tilde

const isSpace = (code: number) =>
    code === 0x20

const isAscii = (code: number) =>
    code <= 0xff

const mapCode = (code: number) =>
    isUnreserved(code)
        ? String.fromCodePoint(code)
        : '%' + hex(code)

const encodeEncoding = (encoding: ej.Encoding) =>
    (char: string) =>
        (char == null)
            ? char
            : ej.convert(ej.stringToCode(char), encoding, 'UNICODE')
                .map(mapCode)
                .join('')

const decodeEncoding = (encoding: ej.Encoding) =>
    (code: number[]) =>
        ej.codeToString(ej.convert(code, 'UNICODE', encoding))

export const encodingEucJp = decodeEncoding('EUCJP')
export const encodingShiftJis = decodeEncoding('SJIS')
export const encodingUtf8 = decodeEncoding('UTF8')

export const rfc3986 = (info: CharInfo) => info.char

export const decodeString = (str: string, dec: (code: number[]) => string) =>
    (!str)
        ? str
        : dec(percentEncodedCodePoints(str).map(info => info.code))

/*
*/
