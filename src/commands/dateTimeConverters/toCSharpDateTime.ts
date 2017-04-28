import {
    getLocalTimezoneOffset,
    getTimezoneOffset,
    normalizeTimezone,
} from './util'

import {
    isValidStr
} from '../../utils'


export const toCSharpDateTime = (content: string) =>
    isValidStr(content)
        ? content.replace(/([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(\.[0-9]{1,3})(Z|[+-][0-9]{2}:?[0-9]{2})/g, replacer)
        : content

const replacer = (match, year, month, day, hour, min, sec, msec, timezone) =>
    isValid(year, month, day, hour, min, sec, msec, timezone)
        ? toDate(match, year, month, day, hour, min, sec, msec, timezone)
        : match

const isValid = (year, month, day, hour, min, sec, msec, timezone) =>
    isValidNum(year, 1970, 9999) &&
    isValidNum(month, 1, 12) &&
    isValidNum(day, 1, 31) &&
    isValidNum(hour, 0, 23) &&
    isValidNum(min, 0, 59) &&
    isValidNum(sec, 0, 59) &&
    (msec === undefined || isValidNum(msec.substr(1), 0, 999))

const isValidNum = (num, min, max) =>
    num && inRange(Number.parseInt(num, 10), min, max)

const inRange = (value, min, max) =>
    min <= value && value <= max

const toDate = (match, year, month, day, hour, min, sec, msec, timezone) => {
    let tick = Date.UTC(year, month - 1, day, hour, min, sec, toMsec(msec))
    let offset = getTimezoneOffset(timezone) * 60 * 1000
    tick -= offset

    return `\\/Date(${tick}${normalizeTimezone(timezone)})\\/`
}

const toMsec = (msec) =>
    msec ? Number.parseInt((msec + '00').substr(1, 3), 10)
         : 0

const getTimezoneAdjustOffset = (tz) =>
    getAdjustTime(tz ? Number.parseInt(tz, 10) : 0)

const getAdjustTime = (num) =>
    Math.sign(num) * getAdjust(Math.abs(num))

const getAdjust = (hhmm) =>
    (((hhmm / 100) * 60) + (hhmm % 100)) * 60 * 1000

