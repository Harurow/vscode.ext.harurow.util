import * as vscode from 'vscode'

export const getSafeRegex = (regexPattern: string): {
  status: 'ok'
  createRegex: () => RegExp
} | {
  status: 'ng'
} => {
  const ignoreCase = regexPattern.endsWith('\\i')
  const flags = ignoreCase ? 'gi' : 'g'
  const pattern = regexPattern.slice(0, ignoreCase ? -2 : undefined)
  if (pattern !== '') {
    try {
      // eslint-disable-next-line no-new
      new RegExp(pattern, flags)
      return {
        status: 'ok',
        createRegex: () => new RegExp(pattern, flags)
      }
    } catch {
    }
  }
  return { status: 'ng' }
}

export const pushMatchedTextRange = (ranges: vscode.Range[], regex: RegExp, line: vscode.TextLine): void => {
  const text = line.text
  let match = regex.exec(text)
  while (match != null) {
    if (match[0].length > 0) {
      const start = line.range.start
      ranges.push(new vscode.Range(
        new vscode.Position(start.line, start.character + match.index),
        new vscode.Position(start.line, start.character + match.index + match[0].length)
      ))
      match = regex.exec(text)
    } else {
      break
    }
  }
}
