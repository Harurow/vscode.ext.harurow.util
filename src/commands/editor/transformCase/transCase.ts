import 'util'
import { transformTemplate } from '../util'
import { TextDocument, TextEditorEdit, Selection } from 'vscode'

function isSeparator (str: string): boolean {
  return str === '_' || str === '-' || str === '.' || str === ' '
}

function preTransform (variable: string): { words: string[], prefix: string, suffix: string } | null {
  if (!variable.isVariableLoose()) {
    return null
  }

  const words = variable.words()
  const first = words[0]
  const last = words.length > 1 ? words.slice(-1)[0] : ''

  const prefix = first[0] === '_' ? first : ''
  const suffix = last[0] === '_' ? last : ''

  const body = words.slice(prefix === '' ? 0 : 1, suffix === '' ? undefined : -1)

  return { words: body, prefix, suffix }
}

function toPascalWord (str: string): string {
  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

export function transformToUpperCamel (variable: string): string {
  const result = preTransform(variable)

  if (result == null) {
    return variable
  }

  const { words, suffix, prefix } = result

  const body = words
    .filter(str => !isSeparator(str[0]))
    .map(str => toPascalWord(str))
    .join('')

  return `${prefix}${body}${suffix}`
}

export function transformToLowerCamel (variable: string): string {
  const result = preTransform(variable)

  if (result == null) {
    return variable
  }

  const { words, suffix, prefix } = result

  const body = words
    .filter(str => !isSeparator(str[0]))
    .map((str, idx) => idx === 0 ? str.toLowerCase() : toPascalWord(str))
    .join('')

  return `${prefix}${body}${suffix}`
}

export function transformToUpperSnake (variable: string): string {
  const result = preTransform(variable)

  if (result == null) {
    return variable
  }

  const { words, suffix, prefix } = result

  const body = words
    .filter(str => !isSeparator(str[0]))
    .map(str => str.toUpperCase())
    .join('_')

  return `${prefix}${body}${suffix}`
}

export function transformToLowerSnake (variable: string): string {
  const result = preTransform(variable)

  if (result == null) {
    return variable
  }

  const { words, suffix, prefix } = result

  const body = words
    .filter(str => !isSeparator(str[0]))
    .map(str => str.toLowerCase())
    .join('_')

  return `${prefix}${body}${suffix}`
}

export function transformToUpperChain (variable: string): string {
  const result = preTransform(variable)

  if (result == null) {
    return variable
  }

  const { words, suffix, prefix } = result

  const body = words
    .filter(str => !isSeparator(str[0]))
    .map(str => str.toUpperCase())
    .join('-')

  return `${prefix}${body}${suffix}`
}

export function transformToLowerChain (variable: string): string {
  const result = preTransform(variable)

  if (result == null) {
    return variable
  }

  const { words, suffix, prefix } = result

  const body = words
    .filter(str => !isSeparator(str[0]))
    .map(str => str.toLowerCase())
    .join('-')

  return `${prefix}${body}${suffix}`
}

async function transform (replace: (doc: TextDocument, editBuilder: TextEditorEdit, selection: Selection) => void, failedMessage?: string | undefined): Promise<void> {
  return transformTemplate({
    getSelectionCallback: (e) => e.selections,
    replaceCallback: replace,
    failedMessage: failedMessage
  })
}

function replaceCase (callback: (str: string) => string): () => Promise<void> {
  return async () => {
    await transform((doc, eb, sel) => {
      const before = doc.getText(sel)
      const after = callback(before)
      if (before !== after) {
        eb.replace(sel, after)
      }
    }, 'transformCase.failed'.toLocalize())
  }
}

export const cmdTable =
[
  { name: 'transformCase.ToUpperCamelCase', func: replaceCase(transformToUpperCamel) },
  { name: 'transformCase.ToLowerCamelCase', func: replaceCase(transformToLowerCamel) },
  { name: 'transformCase.ToUpperSnakeCase', func: replaceCase(transformToUpperSnake) },
  { name: 'transformCase.ToLowerSnakeCase', func: replaceCase(transformToLowerSnake) },
  { name: 'transformCase.ToUpperChainCase', func: replaceCase(transformToUpperChain) },
  { name: 'transformCase.ToLowerChainCase', func: replaceCase(transformToLowerChain) }
]

export default cmdTable
