import * as vscode from 'vscode'
import { DebugLogSummary } from './DebugLogStore'

export class NeighborLogCounter implements vscode.Disposable {
  private readonly foreground: vscode.ThemeColor;
  private readonly background: vscode.ThemeColor;
  private readonly decorationType: vscode.TextEditorDecorationType;

  constructor () {
    this.foreground = new vscode.ThemeColor('badge.foreground')
    this.background = new vscode.ThemeColor('badge.background')
    this.decorationType = this.createDecorationType()
  }

  dispose = (): void => {
    this.decorationType.dispose()
  }

  debugLogSummaryToDecorationOptions = (debugLogSummary: DebugLogSummary): vscode.DecorationOptions => {
    const contentText = debugLogSummary.history.length > 1
      ? `${debugLogSummary.history.length.toLocaleString()} times`
      : ''
    return {
      range: debugLogSummary.range,
      renderOptions: {
        after: {
          contentText: contentText
        }
      }
    }
  }

  setDecorations = (editor: vscode.TextEditor, rangeOrOptions: vscode.Range[] | vscode.DecorationOptions[]): void => {
    editor.setDecorations(this.decorationType, rangeOrOptions)
  }

  private readonly createDecorationType = (): vscode.TextEditorDecorationType => {
    return vscode.window.createTextEditorDecorationType({
      after: {
        color: this.foreground,
        backgroundColor: this.background,
        fontWeight: '100',
        margin: '0 0 0 1.3em'
      }
    })
  }
}
