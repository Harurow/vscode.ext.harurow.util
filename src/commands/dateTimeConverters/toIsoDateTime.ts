import {
    getTimezoneOffset,
} from './util'

import {
    isValidStr
} from '../../utils'

export const toIsoDateTime = (content: string) =>
    isValidStr(content)
        ? content.replace(/\\\/Date\(([0-9]+)([+-][0-9]{4})?\)\\\//g, replacer)
        : content

const replacer = (match, tick, timezone) =>
    toDate(Number.parseInt(tick, 10), timezone)

const toDate = (tick, timezone) =>
    timezone ? getDateOfLocal(tick, timezone)
       : getDateOfUtc(tick)

const getDateOfLocal = (tick, timezone) =>
    AdjustTimezone(tick, timezone).toISOString().replace('Z', timezone)

const AdjustTimezone = (tick, timezone) =>
    new Date(tick + getTimezoneOffset(timezone) * 60 * 1000 )

const getDateOfUtc = (tick) =>
    new Date(tick).toISOString()
