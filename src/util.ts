
export function safeReplace(value: string, from: string, to: string) {
    return value
        ? value.replace(from, to)
        : value
}

export function isHexChar(ch: string) {
    var num = ch.codePointAt(0)
    return 0x30 <= num && num <= 0x39
        || 0x41 <= num && num <= 0x46
        || 0x61 <= num && num <= 0x66
}

export function toHexFromChar(ch: string) {
    var num = ch.charCodeAt(0)
    if (0x30 <= num && num <= 0x39) {
        return num - 0x30;
    } else if (0x41 <= num && num <= 0x46) {
        return 10 + (num - 0x41);
    } else if (0x61 <= num && num <= 0x66) {
        return 10 + (num - 0x61);
    }
}

export function strToChars(value: string) : string[] {
    return value.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || []
}

export function strLen(value: string): number {
    return !value
        ? 0
        : strToChars(value).length
}

export function toHex(value: number, len: number = 2) {
    return ('0'.repeat(len) + value.toString(16)).slice(-len)
}

export function toSurrogatePair(code: number) : {hi: number, lo: number} {
    if (code <= 0xffff) {
        return undefined
    }
    let un = code - 0x10000
    return {
        hi: Math.floor(un / 0x400) + 0xd800,
        lo: un % 0x400 + 0xdc00
    }
}
