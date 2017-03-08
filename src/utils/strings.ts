
const wordRegex = /[a-zA-Z_][a-zA-Z_0-9]*/g

function enumIdentifiers(value: string, callback: (identifier: string) => string): string {
    return value.replace(/[a-zA-Z_][a-zA-Z_0-9]*/g, callback)
}

export declare type wordCallback = (word: string) => string
export declare type wordCallback2 = (word: string, i: number) => string

const incrementCallback = (callback: wordCallback2) => {
    let i = 0
    return (word) => callback(word, i++)
}

export const enumWords = (value: string, callback: wordCallback|wordCallback2) =>
    (callback as wordCallback)
        ? value.replace(wordRegex, callback)
        : value.replace(wordRegex, incrementCallback(callback))

export const splitWords = (value: string) =>
    value.match(wordRegex)
         .map(m => m)

export const toPascalWord = (value: string) =>
    (!value) ? '' : value[0].toUpperCase() + value.slice(1).toLowerCase()

export const toCamelWord = (value: string) =>
    (!value) ? '' : value.toLowerCase()

export const toUnderScore = (value: string) =>
    (!value) ? '' : '_'.repeat(value.length)