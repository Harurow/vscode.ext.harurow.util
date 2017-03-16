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

const encodeEncoding = (encoding: ej.Encoding) =>
    (char: string) =>
        ej.convert(ej.stringToCode(char), encoding, 'UNICODE')
          .map(c => '%' + hex(c))
          .join('')

const encodeChar = (space: string, enc: (char: string) => string) => 
    (info: charInfo) =>
        isSpace(info.code)        ? space
        : isUnreserved(info.code) ? info.char
        : isAscii(info.code)      ? '%' + info.code
        : enc(info.char)

const rcf3986 = (enc: (char: string) => string) =>
    encodeChar('%20', enc)

const rcf1866 = (enc: (char: string) => string) =>
    encodeChar('+', enc)

const encodeRcf3986ShiftJis = () =>
    rcf3986(encodeEncoding('SJIS'))

const encodeRcf3986EucJp = () =>
    rcf3986(encodeEncoding('EUCJP'))

const encodeRcf3986Utf8 = () =>
    rcf3986(encodeEncoding('UTF8'))

const encodeRcf1866ShiftJis = () =>
    rcf1866(encodeEncoding('SJIS'))

const encodeRcf1866EucJp = () =>
    rcf1866(encodeEncoding('EUCJP'))

const encodeRcf1866Utf8 = () =>
    rcf1866(encodeEncoding('UTF8'))

const encodeString = (str: string, encode: (info: charInfo) => string) =>
    (!str) ? str : codePoints(str).map(encode).join('')

