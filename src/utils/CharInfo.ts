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

  get isSpace (): boolean {
    return this.code === 0x20
  }

  get isAscii (): boolean {
    return this.code <= 0xff
  }

  get isSurrogatePair (): boolean {
    return this.code > 0xffff
  }

  get isRfc3986Unreserved (): boolean {
    const code = this.code
    return (code >= 0x41 && code <= 0x5A) || // A-Z
      (code >= 0x61 && code <= 0x7A) || // a-z
      (code >= 0x30 && code <= 0x39) || // 0-9
      code === 0x2D || // - hyphen
      code === 0x2E || // . dot
      code === 0x5F || // _ under-scodeore
      code === 0x7E // ~ tilde
  }

  toSurrogatePair (): SurrogatePair {
    if (this.code == null || this.code <= 0xffff) {
      throw new Error('invalid operation')
    }
    const tmp = this.code - 0x10000
    return {
      hi: 0xd800 + Math.floor(tmp / 0x400),
      lo: 0xdc00 + tmp % 0x400,
    }
  }
}

declare global {
  interface String {
    charInfos(): CharInfo[]
  }
}

String.prototype.charInfos = function (): CharInfo[] {
  return this.chars()
    .map(c => new CharInfo(c))
}
