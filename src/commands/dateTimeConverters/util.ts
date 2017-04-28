export const getLocalTimezoneOffset = () =>
    new Date().getTimezoneOffset()

export const getTimezoneOffset = (timezone) =>
    toMin(toNumTimezone(normalizeTimezone(timezone)))

export const normalizeTimezone = (timezone) =>
    timezone.replace('Z', '')
            .replace(':', '')

const toNumTimezone = (tz) =>
    tz ? Number.parseInt(tz)
       : 0

const toMin = (ntz) =>
    Math.sign(ntz) * toMinFromHhMm(Math.abs(ntz))

const toMinFromHhMm = (hhmm) =>
    (((hhmm / 100) * 60) + (hhmm % 100))

