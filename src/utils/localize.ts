import en from '../../package.nls.json'
import ja from '../../package.nls.ja.json'

export function getLocale (): string {
  return JSON.parse(process.env.VSCODE_NLS_CONFIG as string).locale as string
}

interface LocalizeEntry {
  [key: string]: string
}

function getLocalizeStrings (): LocalizeEntry {
  const map = { en, ja }
  const locale = getLocale()
  return (map as {[key: string]: LocalizeEntry})[locale] ?? {}
}

function loadMessageBundle (): LocalizeEntry {
  const localizeStrings = getLocalizeStrings()
  return { ...en, ...localizeStrings }
}

const localizeStrings = loadMessageBundle()

export const localize = (key: string): string => localizeStrings[`msg.${key}`] ?? key

export default localize
