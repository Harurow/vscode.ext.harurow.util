import * as vscode from 'vscode'
import * as words from './commands/wordCases'
import * as filters from './commands/lineFilters'

export const activate = (context: vscode.ExtensionContext) => {
    console.log('Harurow say "Hello!"')
    context.subscriptions.push(
        words.toPascalCaseCommand('commands.caseConverters.toPascalCase'),
        words.toCamelCaseCommand('commands.caseConverters.toCamelCase'),
        words.toUpperSnakeCaseCommand('commands.caseConverters.toUpperSnakeCase'),
        words.toLowerSnakeCaseCommand('commands.caseConverters.toLowerSnakeCase'),
    )

    context.subscriptions.push(
        filters.removeLineIfMatchCommand('commands.lineFilters.match'),
        filters.removeLineIfUnmatchCommand('commands.lineFilters.unmatch'),
        filters.removeLineIfContainsCommand('commands.lineFilters.contains'),
        filters.removeLineIfNotContainsCommand('commands.lineFilters.notContains'),
    )
}

export const deactivate = () => {
    console.log('Harurow say "see you next time!"')
}
