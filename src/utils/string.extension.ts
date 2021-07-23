/* eslint-disable no-extend-native */
import { localize, localizeTitle } from './localize'

export {}

declare global {
  interface String {
    toLocalize (...args: any[]): string
    toLocalizeTitle (...args: any[]): string
    hasCharactors(): boolean
    isVariable(): boolean
    isVariableLoose(): boolean
    chars(): string[]
    words(): string[]
    lines(): string[]
  }
}

String.prototype.toLocalize = function (...args: any[]): string {
  let msg = localize(this as string)
  if (msg != null) {
    for (let i = 0; i < args.length; i++) {
      msg = msg.replace(`{${i.toString()}}`, args[i].toString())
    }
  }
  return msg
}

String.prototype.toLocalizeTitle = function (...args: any[]): string {
  let msg = localizeTitle(this as string)
  if (msg != null) {
    for (let i = 0; i < args.length; i++) {
      msg = msg.replace(`{${i.toString()}}`, args[i].toString())
    }
  }
  return msg
}

String.prototype.hasCharactors = function (): boolean {
  return this.length > 0
}

String.prototype.isVariable = function (): boolean {
  return /^[A-Za-z_][A-Za-z0-9_]*$/g.test(this as string)
}

String.prototype.isVariableLoose = function (): boolean {
  return /^[A-Za-z_][A-Za-z0-9_-]*$/g.test(this as string)
}

String.prototype.chars = function (): string[] {
  return (this != null)
    ? this.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) ?? []
    : []
}

String.prototype.words = function (): string[] {
  const result: string[] = []
  const str = this as string

  const regex = /([ ]+|[_]+|[-]+|[.]+|([A-Z]{2,})(?![a-z])|([A-Z][a-z]+)|[A-Z]|[a-z]+|[0-9]+)/g
  let match: RegExpMatchArray | null

  while ((match = regex.exec(str)) != null) {
    result.push(match[0])
  }

  return result
}

String.prototype.lines = function (): string[] {
  if (this === '') {
    return []
  }

  const str = trimEndNewLine(this as string)
  return str.split(/\r\n|\r|\n/)
}

const CR = '\r'
const LF = '\n'
const CRLF = CR + LF

function trimEndNewLine (str: string): string {
  const lastChar = str.slice(-1)
  if (lastChar === CR) {
    return str.slice(0, -1)
  } else if (lastChar === LF) {
    if (str.slice(-2) === CRLF) {
      return str.slice(0, -2)
    }
    return str.slice(0, -1)
  }
  return str
}
