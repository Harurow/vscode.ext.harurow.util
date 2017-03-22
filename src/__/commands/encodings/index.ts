import {
    encodeString,
    encodingEucJp,
    encodingShiftJis,
    encodingUtf8,
    rfc3986,
    rfc1866,
} from './encode'

export const encodeRfc1866EucJp = (str: string) => encodeString(str, rfc1866(encodingEucJp))
export const encodeRfc1866ShiftJis = (str: string) => encodeString(str, rfc1866(encodingShiftJis))
export const encodeRfc1866Utf8 = (str: string) => encodeString(str, rfc1866(encodingUtf8))

export const encodeRfc3986EucJp = (str: string) => encodeString(str, rfc3986(encodingEucJp))
export const encodeRfc3986ShiftJis = (str: string) => encodeString(str, rfc3986(encodingShiftJis))
export const encodeRfc3986Utf8 = (str: string) => encodeString(str, rfc3986(encodingUtf8))

