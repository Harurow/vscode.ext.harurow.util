/* eslint-disable no-extend-native */
export {}

type CodePoint = number

interface SurrogatePair {
  hi: number
  lo: number
}

export class CharInfo {
  readonly code: CodePoint
  readonly char: string

  constructor (char: string) {
    this.char = char
    this.code = char.codePointAt(0) as CodePoint
  }

  get isAscii (): boolean { return isAscii(this.code) }

  get isLatin (): boolean { return isLatin(this.code) }

  get isSurrogatePair (): boolean { return isSurrogatePair(this.code) }

  get isNewLine (): boolean { return isNewLine(this.code) }

  get isSpace (): boolean { return isSpace(this.code) }

  readonly toSurrogatePair = (): SurrogatePair => {
    if (this.code == null || this.code <= 0xffff) {
      throw new Error('invalid operation')
    }
    const cp = this.code - 0x10000
    return {
      hi: 0xd800 + (cp >> 10),
      lo: 0xdc00 + (cp & 0x3ff),
    }
  }
}

declare global {
  interface String {
    charInfos(): CharInfo[]
  }
}

String.prototype.charInfos = function (): CharInfo[] {
  return this.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g)
    ?.map(c => new CharInfo(c)) ?? []
}

export const isAscii = (code: number): boolean => code <= 0x7f

export const isLatin = (code: number): boolean => code <= 0xff

export const isSurrogatePair = (code: number): boolean => code > 0xffff

export const isNewLine = (code: number): boolean => code === 0x0a || code === 0x0d

export const isSpace = (code: number): boolean => code === 0x20
