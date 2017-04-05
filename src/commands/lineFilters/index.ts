import * as vscode from 'vscode'
import {
    removeLineIfMatch,
    removeLineIfUnmatch,
    removeLineIfContains,
    removeLineIfNotContains
} from './removeLine'

import { lineFilter } from './lineFilter'

export const removeLineIfMatchCommand = (command: string) =>
    vscode.commands.registerCommand(command, () =>
        lineFilter(removeLineIfMatch, {
            placeHolder: 'Pattern',
            prompt: 'Remove lines if it matched input pattern.',
            emptyMessage: 'Must be input text.'
        }))

export const removeLineIfUnmatchCommand = (command: string) =>
    vscode.commands.registerCommand(command, () =>
        lineFilter(removeLineIfUnmatch, {
            placeHolder: 'Pattern',
            prompt: 'Remove lines if it un-matched input pattern.',
            emptyMessage: 'Must be input text.'
        }))

export const removeLineIfContainsCommand = (command: string) =>
    vscode.commands.registerCommand(command, () =>
        lineFilter(removeLineIfContains, {
            placeHolder: 'Text',
            prompt: 'Remove lines if it contains input text.',
            emptyMessage: 'Must be input text.'
        }))

export const removeLineIfNotContainsCommand = (command: string) =>
    vscode.commands.registerCommand(command, () =>
        lineFilter(removeLineIfNotContains, {
            placeHolder: 'Text',
            prompt: 'Remove lines if it not contains input text.',
            emptyMessage: 'Must be input text.'
        }))
