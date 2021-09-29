import moment from 'moment'
import { getLocale } from './extension'

export function normalizeTimezone (timezone: string): string {
  return timezone
    .replace('Z', '')
    .replace(':', '')
}

export function getTimeZoneOffset (timezone: string): number {
  const toNumTimezone = (tz: string): number =>
    (tz?.length > 0) ? Number.parseInt(tz) : 0

  const toMin = (ntz: number): number =>
    Math.sign(ntz) * toMinFromHhMm(Math.abs(ntz))

  const toMinFromHhMm = (hhmm: number): number =>
    (((hhmm / 100) * 60) + (hhmm % 100))

  return toMin(toNumTimezone(normalizeTimezone(timezone)))
}

export function formatDate (datetime: Date, format: string): string {
  moment.locale(getLocale())
  return moment(datetime).format(format)
}
