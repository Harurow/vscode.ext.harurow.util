
export const casePattern = /([A-Z]+[a-z]*|[a-z]+|[0-9]+|_)/g
export const snakePattern = /(_?[A-Z]+[a-z]*|_?[a-z]+|_)/g

export default class CaseConverterUtil {
    static toPascalWord = (value: string) =>
        (!value) ? '' : value[0].toUpperCase() + value.slice(1).toLowerCase()

    static toCamelWord = (value: string) =>
        (!value) ? '' : value.toLowerCase()

    static toUnderScore = (value: string) =>
        (!value) ? '' : '_'.repeat(value.length)
    
    static isUnderScore = (value: string) =>
        value === CaseConverterUtil.toUnderScore(value)

    static toCamelOrTrim = (value: string) =>
        value === '_' ? '' : CaseConverterUtil.toCamelWord(value)

    static toPascalOrTrim = (value: string) =>
        value === '_' ? '' : CaseConverterUtil.toPascalWord(value)

    static toSnakeWord = (value: string, i: number) =>
        (i === 0) ? ('_' + value) : value

    static convertCamelWord = (value: string, i: number) => {
        if (CaseConverterUtil.isUnderScore(value)) {
            return value
        } else if (i === 0) {
            return CaseConverterUtil.toCamelOrTrim(value)
        }
        return CaseConverterUtil.toPascalOrTrim(value)
    }
}

