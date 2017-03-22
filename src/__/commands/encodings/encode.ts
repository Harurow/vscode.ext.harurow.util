import * as ej from 'encoding-japanese'
import { codePoints, charInfo, hex } from '../../utils/string'

const isUnreserved = (code: number) =>
    0x41 <= code && code <= 0x5A ||     // A-Z
    0x61 <= code && code <= 0x7A ||     // a-z
    0x30 <= code && code <= 0x39 ||     // 0-9
    code == 0x2D                 ||     // - hyphen
    code == 0x2E                 ||     // . dot
    code == 0x5F                 ||     // _ under-scodeore
    code == 0x7E                        // ~ tilde

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

const encodeChar = (space: string, enc: (char: string) => string) => 
    (info: charInfo) =>
        isSpace(info.code)        ? space
        : isUnreserved(info.code) ? info.char
        : isAscii(info.code)      ? '%' + hex(info.code)
        : enc(info.char)

export const encodeString = (str: string, encode: (info: charInfo) => string) =>
    (!str) ? str : codePoints(str).map(encode).join('')

export const encodingEucJp = encodeEncoding('EUCJP')
export const encodingShiftJis = encodeEncoding('SJIS')
export const encodingUtf8 = encodeEncoding('UTF8')

export const rfc3986 = (enc: (char: string) => string) => encodeChar('%20', enc)
export const rfc1866 = (enc: (char: string) => string) => encodeChar('+', enc)

