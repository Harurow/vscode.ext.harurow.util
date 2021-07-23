import { CharInfo } from '../../../utils'
import * as ej from 'encoding-japanese'

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
