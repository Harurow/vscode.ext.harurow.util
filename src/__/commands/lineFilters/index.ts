import * as vscode from 'vscode'
import {
    removeLineIfMatch,
    removeLineIfUnmatch,
    removeLineIfContains,
    removeLineIfNotContains
} from './removeLine'
import filter from './filter'

export const removeLineIfMatchCommand = (command: string) =>
    vscode.commands.registerCommand(command, () =>
        filter(removeLineIfMatch, {
            placeHolder: 'Pattern',
            prompt: 'Remove lines if it matched input pattern.'
        }))

export const removeLineIfUnmatchCommand = (command: string) =>
    vscode.commands.registerCommand(command, () =>
        filter(removeLineIfUnmatch, {
            placeHolder: 'Pattern',
            prompt: 'Remove lines if it un-matched input pattern.'
        }))

export const removeLineIfContainsCommand = (command: string) =>
    vscode.commands.registerCommand(command, () =>
        filter(removeLineIfContains, {
            placeHolder: 'Text',
            prompt: 'Remove lines if it contains input text.'
        }))

export const removeLineIfNotContainsCommand = (command: string) =>
    vscode.commands.registerCommand(command, () =>
        filter(removeLineIfNotContains, {
            placeHolder: 'Text',
            prompt: 'Remove lines if it not contains input text.'
        }))
