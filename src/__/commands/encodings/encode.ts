import * as encja from 'encoding-japanese'

export const isUnreserved = (code: number) =>
    0x41 <= code && code <= 0x5A ||     // A-Z
    0x61 <= code && code <= 0x7A ||     // a-z
    0x30 <= code && code <= 0x39 ||     // 0-9
    code == 0x2D                 ||     // - hyphen
    code == 0x2E                 ||     // . dot
    code == 0x5F                 ||     // _ under-scodeore
    code == 0x7E                        // ~ tilde

export const isSpace = (code: number) =>
    code === 0x20

export const isAscii = (code: number) =>
    code <= 0xff
