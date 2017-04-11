import * as vscode from 'vscode'

import * as encodings from './commands/encodings'
import * as escapes from './commands/escapes'
import * as lineFilters from './commands/lineFilters'
import * as numberings from './commands/numberings'
import * as selectors from './commands/selectors'
import * as swaps from './commands/swaps'
import * as words from './commands/wordCases'

export function activate(context: vscode.ExtensionContext): void {
    console.log('Harurow say "Have a good time!"')
    context.subscriptions.push(
        encodings.encodeRfc1866EucJpCommand('commands.encodings.encodeRfc1866EucJp'),
        encodings.encodeRfc1866ShiftJisCommand('commands.encodings.encodeRfc1866ShiftJis'),
        encodings.encodeRfc1866Utf8Command('commands.encodings.encodeRfc1866Utf8'),

        encodings.encodeRfc3986EucJpCommand('commands.encodings.encodeRfc3986EucJp'),
        encodings.encodeRfc3986ShiftJisCommand('commands.encodings.encodeRfc3986ShiftJis'),
        encodings.encodeRfc3986Utf8Command('commands.encodings.encodeRfc3986Utf8'),

        encodings.decodeRfc1866EucJpCommand('commands.encodings.decodeRfc1866EucJp'),
        encodings.decodeRfc1866ShiftJisCommand('commands.encodings.decodeRfc1866ShiftJis'),
        encodings.decodeRfc1866Utf8Command('commands.encodings.decodeRfc1866Utf8'),

        encodings.decodeRfc3986EucJpCommand('commands.encodings.decodeRfc3986EucJp'),
        encodings.decodeRfc3986ShiftJisCommand('commands.encodings.decodeRfc3986ShiftJis'),
        encodings.decodeRfc3986Utf8Command('commands.encodings.decodeRfc3986Utf8'),
    )

    context.subscriptions.push(
        escapes.escapeHtmlCommand('commands.escapes.escapeHtml'),
        escapes.escapeHtmlAllCommand('commands.escapes.escapeHtmlAll'),
        escapes.unescapeHtmlCommand('commands.escapes.unescapeHtml'),

        escapes.escapeUnicodeCommand('commands.escapes.escapeUnicode'),
        escapes.escapeUnicodeAllCommand('commands.escapes.escapeUnicodeAll'),
        escapes.unescapeUnicodeCommand('commands.escapes.unescapeUnicode'),
    )

    context.subscriptions.push(
        lineFilters.removeLineIfMatchCommand('commands.lineFilters.match'),
        lineFilters.removeLineIfUnmatchCommand('commands.lineFilters.unmatch'),
        lineFilters.removeLineIfContainsCommand('commands.lineFilters.contains'),
        lineFilters.removeLineIfNotContainsCommand('commands.lineFilters.notContains'),
    )

    context.subscriptions.push(
        numberings.numberingCommand('commands.numberings.numbering'),
    )

    context.subscriptions.push(
        selectors.selectWhenMatchSubstringCommand('commands.selectors.substring'),
        selectors.selectWhenMatchPatternCommand('commands.selectors.pattern'),
        selectors.selectWhenMatchPatternIgnoreCaseCommand('commands.selectors.patternIgnoreCase'),
    )

    context.subscriptions.push(
        swaps.swapLrCommand('commands.swaps.swapLr'),
    )

    context.subscriptions.push(
        words.toPascalCaseCommand('commands.caseConverters.toPascalCase'),
        words.toCamelCaseCommand('commands.caseConverters.toCamelCase'),
        words.toUpperSnakeCaseCommand('commands.caseConverters.toUpperSnakeCase'),
        words.toLowerSnakeCaseCommand('commands.caseConverters.toLowerSnakeCase'),
    )
}

export function deactivate(): void {
    console.log('Harurow say "see you next time!"')
}
