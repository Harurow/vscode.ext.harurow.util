import * as cmd from '../../utils/commands'

import {
    encodeRfc1866EucJp,
    encodeRfc1866ShiftJis,
    encodeRfc1866Utf8,
    encodeRfc3986EucJp,
    encodeRfc3986ShiftJis,
    encodeRfc3986Utf8,
} from './encode'

import {
    decodeRfc1866EucJp,
    decodeRfc1866ShiftJis,
    decodeRfc1866Utf8,
    decodeRfc3986EucJp,
    decodeRfc3986ShiftJis,
    decodeRfc3986Utf8,
} from './decode'

export const encodeRfc1866EucJpCommand = (command: string) => cmd.regForEach(command, encodeRfc1866EucJp)
export const encodeRfc1866ShiftJisCommand = (command: string) => cmd.regForEach(command, encodeRfc1866ShiftJis)
export const encodeRfc1866Utf8Command = (command: string) => cmd.regForEach(command, encodeRfc1866Utf8)
export const encodeRfc3986EucJpCommand = (command: string) => cmd.regForEach(command, encodeRfc3986EucJp)
export const encodeRfc3986ShiftJisCommand = (command: string) => cmd.regForEach(command, encodeRfc3986ShiftJis)
export const encodeRfc3986Utf8Command = (command: string) => cmd.regForEach(command, encodeRfc3986Utf8)
export const decodeRfc1866EucJpCommand = (command: string) => cmd.regForEach(command, decodeRfc1866EucJp)
export const decodeRfc1866ShiftJisCommand = (command: string) => cmd.regForEach(command, decodeRfc1866ShiftJis)
export const decodeRfc1866Utf8Command = (command: string) => cmd.regForEach(command, decodeRfc1866Utf8)
export const decodeRfc3986EucJpCommand = (command: string) => cmd.regForEach(command, decodeRfc3986EucJp)
export const decodeRfc3986ShiftJisCommand = (command: string) => cmd.regForEach(command, decodeRfc3986ShiftJis)
export const decodeRfc3986Utf8Command = (command: string) => cmd.regForEach(command, decodeRfc3986Utf8)
