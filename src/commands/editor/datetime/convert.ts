import { window, TextDocument, TextEditorEdit, Selection } from 'vscode'
import { transformTemplate } from '../util'
import { getTimeZoneOffset, normalizeTimezone } from './util'

export async function converter (): Promise<void> {
  const result = await window.showQuickPick(
    [
      {
        func: toIso,
        label: 'datetime.convert.iso8601.label'.toLocalize(),
        description: 'datetime.convert.iso8601.description'.toLocalize()
      },
      {
        func: toCSharp,
        label: 'datetime.convert.csharp.label'.toLocalize(),
        description: 'datetime.convert.csharp.description'.toLocalize()
      }
    ],
    {
      placeHolder: 'datetime.convert.placeholder'.toLocalize(),
      matchOnDescription: true,
      matchOnDetail: true
    }
  )

  if (result != null) {
    const func = result.func
    await edit(func)
  }
}

export function toIso (text: string): string {
  const AdjustTimezone = (tick: number, timezone: string): Date =>
    new Date(tick + getTimeZoneOffset(timezone) * 60 * 1000)
  const getDateOfLocal = (tick: number, timezone: string): string =>
    AdjustTimezone(tick, timezone).toISOString().replace('Z', timezone)
  const toDate = (tick: number, timezone: string): string => timezone?.length > 0
    ? getDateOfLocal(tick, timezone)
    : new Date(tick).toISOString()
  const replace = (_: string, tick: string, timezone: string): string =>
    toDate(Number.parseInt(tick, 10), timezone)

  const regex = /\\\/Date\(([0-9]+)([+-][0-9]{4})?\)\\\//g
  return text.replace(regex, replace)
}

export function toCSharp (text: string): string {
  const inRange = (value: number, min: number, max: number): boolean =>
    min <= value && value <= max
  const isValidNum = (num: string, min: number, max: number): boolean =>
    num != null && num !== '' && inRange(Number.parseInt(num, 10), min, max)
  const isValid = (year: string, month: string, day: string, hour: string, min: string, sec: string, msec: string | undefined, timezone: string | undefined): boolean =>
    isValidNum(year, 1970, 9999) &&
    isValidNum(month, 1, 12) &&
    isValidNum(day, 1, 31) &&
    isValidNum(hour, 0, 23) &&
    isValidNum(min, 0, 59) &&
    isValidNum(sec, 0, 59) &&
    (msec === undefined || isValidNum(msec.substr(1), 0, 999))
  const toMsec = (msec: string): number =>
    msec?.length > 0
      ? Number.parseInt((msec + '00').substr(1, 3), 10)
      : 0

  const toDate = (_: string, year: string, month: string, day: string, hour: string, min: string, sec: string, msec: string, timezone: string): string => {
    const tick = Date.UTC(
      Number.parseInt(year),
      Number.parseInt(month) - 1,
      Number.parseInt(day),
      Number.parseInt(hour),
      Number.parseInt(min),
      Number.parseInt(sec),
      toMsec(msec)) - getTimeZoneOffset(timezone) * 60 * 1000

    return `\\/Date(${tick.toString()}${normalizeTimezone(timezone)})\\/`
  }

  const replace = (match: string, year: string, month: string, day: string, hour: string, min: string, sec: string, msec: string, timezone: string): string =>
    isValid(year, month, day, hour, min, sec, msec, timezone)
      ? toDate(match, year, month, day, hour, min, sec, msec, timezone)
      : match

  const regex = /([0-9]{4})[-/]?([0-9]{1,2})[-/]?([0-9]{1,2})T([0-9]{1,2}):?([0-9]{1,2}):?([0-9]{1,2})(\.[0-9]{1,3})?(Z|[+-][0-9]{2}:?[0-9]{2})/g
  return text.replace(regex, replace)
}

async function transform (replace: (doc: TextDocument, editBuilder: TextEditorEdit, selection: Selection) => void, failedMessage?: string | undefined): Promise<void> {
  return transformTemplate({
    getSelectionCallback: (e) => e.selections,
    replaceCallback: replace,
    failedMessage: failedMessage
  })
}

async function edit (callback: (str: string) => string): Promise<void> {
  await transform((doc, eb, sel) => {
    const before = doc.getText(sel)
    const after = callback(before)

    if (before !== after) {
      eb.replace(sel, after)
    }
  })
}

export const cmdTable = [
  { name: 'datetime.convert', func: converter }
]

export default cmdTable
