import * as vscode from 'vscode'
import * as editor from '../utils/editor'

export const regReplace = (name: string, replacer: (str: string) => string) =>
    vscode.commands.registerCommand(name, editor.getReplaceFunc(replacer))

export const regForEach = (name: string, each: (str: string, i: number) => void) =>
    vscode.commands.registerCommand(name, editor.getForEachFunc(each))

export const regWhole = (name: string, whole: () => any) =>
    vscode.commands.registerCommand(name, editor.getWholeFunc(whole))
