import {
    isValidStr
} from '../../utils'

export const toIsoDateTime = (content: string) => {
    if (!isValidStr(content)) {
        return content
    }

    let regex = /\\\/Date\(([0-9]+)([+-][0-9]{4})?\)\\\//g

    return content.replace(regex,
        (match, g1, g2: string) => {
            let tick = Number.parseInt(g1, 10)

            if (g2) {
                let utc = new Date()
                utc.setTime(tick - utc.getTimezoneOffset() * 60 * 1000)
                return utc.toISOString().replace('Z', g2)
            }

            let utc = new Date(tick)
            return utc.toISOString()
        })
}
