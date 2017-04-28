import {
    isValidStr
} from '../../utils'

export const toIsoDateTime = (content: string) =>
    isValidStr(content)
        ? content.replace(/\\\/Date\(([0-9]+)([+-][0-9]{4})?\)\\\//g, replacer)
        : content

const replacer = (match, g1, g2) =>
    toDate(Number.parseInt(g1, 10), g2)

const toDate = (tick, g2) =>
    g2 ? getDateOfTimezone(tick, g2)
       : getDateOfUtc(tick)

const getDateOfTimezone = (tick, g2) =>
    AdjustTimezone(tick).toISOString().replace('Z', g2)

const getTimezoneOffset = () =>
    -(new Date().getTimezoneOffset() * 60 * 1000)

const AdjustTimezone = (tick) =>
    new Date(tick + getTimezoneOffset())

const getDateOfUtc = (tick) =>
    new Date(tick).toISOString()
