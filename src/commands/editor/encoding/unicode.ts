import { CharInfo } from '../../../utils'

export function encodeUnicode (isAll: boolean): (text: string) => { result: string, failed: number } {
  const enc = (ci: CharInfo): string => `\\u${ci.code.toHex(4)}`
  const etc = isAll
    ? enc
    : (ci: CharInfo) => ci.char
  const surrogatePair = (ci: CharInfo): string => {
    const sp = ci.toSurrogatePair()
    return `\\u${sp.hi.toHex(4)}\\u${sp.lo.toHex(4)}`
  }
  const esc = (ci: CharInfo): string => {
    if (ci.isAscii) return etc(ci)
    if (ci.isSurrogatePair) return surrogatePair(ci)
    return enc(ci)
  }

  return (text: string) => ({
    result: text.charInfos()
      .map(ci => esc(ci))
      .join(''),
    failed: 0,
  })
}

export function decodeUnicode (): (text: string) => string {
  const parse = (str: string): RegExpMatchArray =>
    str.match(/\\u[0-9A-Fa-f]{4}|[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) ?? []

  const decHex = (str: string): string =>
    String.fromCodePoint(Number.parseInt(str.slice(2), 16))

  const dec = (str: string): string =>
    str.startsWith('\\u')
      ? decHex(str)
      : str

  return (text: string) =>
    parse(text)
      .map(dec)
      .join('')
}
