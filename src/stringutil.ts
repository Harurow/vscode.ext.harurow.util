'use strict'

import * as vscode from 'vscode'

function enumIdentifiers(value: string, callback: (identifier: string) => string): string {
    return value.replace(/[a-zA-Z_][a-zA-Z_0-9]*/g, callback)
}

export function toUpperCaseWhenFirstChar(value: string): string {
    return (!value)
        ? ""
        : value[0].toUpperCase() + value.slice(1).toLowerCase()
}

export function toUpperCaseFirstChar(value: string): string {
    return (!value)
        ? ""
        : value[0].toUpperCase() + value.slice(1)
}

export function toLowerCaseFirstChar(value: string): string {
    return (!value)
        ? ""
        : value[0].toLowerCase() + value.slice(1)
}

function toCase(value: string, callback: (value: string) => string): string {
    return enumIdentifiers(value, (identifier) => {
        if (identifier === "_".repeat(identifier.length)) {
            return identifier
        }
        return callback(identifier.replace(/([A-Z]+[a-z]*|[a-z]+|[0-9]+|_)/g, (word) =>
            word === "_"
                ? ""
                : toUpperCaseWhenFirstChar(word)))
    })
}

function toSnake(value: string): string {
    return enumIdentifiers(value, (identifier) => {
        var i = 0;
        return identifier.replace(/(_?[A-Z]+[a-z]*|_?[a-z]+|_)/g, (word) => {
            i++
            return word.startsWith("_")
                ? word
                : (i > 1 ? "_" : "") + word
        })
    })
}

export function toUpperSnakeCase(value: string): string {
    return toSnake(value).toUpperCase()
}

export function toLowerSnakeCase(value: string): string {
    return toSnake(value).toLowerCase()
}

export function toPascalCase(value: string): string {
    return toCase(value, toUpperCaseFirstChar)
}

export function toCamelCase(value: string): string {
    return toCase(value, toLowerCaseFirstChar);
}
