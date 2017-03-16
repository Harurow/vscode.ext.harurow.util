export const isValidStr = (str: string) => 
    !(!str)

export const hasChar = (str: string) =>
    isValidStr(str) && str.length > 0

export const isUnderscore = (str: string) =>
    hasChar(str)
        ? /^_+$/g.test(str)
        : false

export const isValidIdentifier = (str: string) =>
    (isValidStr(str) &&
     /^[A-Za-z_][A-Za-z0-9_]*$/g.test(str))

export const words = (str: string) => {
    if (!isValidIdentifier(str))
        return undefined

    let regex = /([_]+|[A-Z]+[a-z]*|[0-9]+|[a-z]+)/g

    let result:string[] = []
    let match: RegExpMatchArray

    while ((match = regex.exec(str)) !== null) {
        result.push(match[0])
    }

    return result
}

export const toPascalWord = (str: string) =>
    !hasChar(str)       ? str
    : isUnderscore(str) ? ''
    : str[0].toUpperCase() + str.slice(1).toLowerCase()

export const toLowerWord = (str: string) =>
    !hasChar(str)       ? str
    : isUnderscore(str) ? ''
    : str.toLowerCase()

export const toUpperWord = (str: string) =>
    !hasChar(str)       ? str
    : isUnderscore(str) ? ''
    : str.toUpperCase()

export const lines = (str: string) => {
    if (str == null)
        return undefined

    if (!str.match(/(\r\n|\r|\n)$/)) {
        str += '\n'
    }

    let result: string[] = []

    let regex = /^(.*)(\r\n|\r|\n)/mg
    let match: RegExpMatchArray
    while ((match = regex.exec(str)) !== null) {
        result.push(match[1])
    }

    return result
}

export const chars = (str: string) : string[] =>
    (str == null)
        ? []
        : str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || []

export const strLen = (str: string) =>
    chars(str).length

export interface charInfo {
    char: string
    code: number
}

export const codePoints = (str: string) =>
    chars(str).map(char => <charInfo>({
        char,
        code: char.codePointAt(0)
    }))

export const hex = (code: number, len: number = 2) => {
    if (code == null || code < 0) {
        return undefined
    }
    var str = code.toString(16)
    if (str.length < len) {
        str = '0'.repeat(len - str.length) + str
    }
    return str
}

export interface surrogatePair {
    hi: number
    lo: number
}

export const surrogatePair = (code: number) => {
    if (code == null || code <= 0xffff) {
        return undefined
    }
    let un = code - 0x10000
    return <surrogatePair>{
        hi: 0xd800 + Math.floor(un / 0x400),
        lo: 0xdc00 + un % 0x400
    }
}
