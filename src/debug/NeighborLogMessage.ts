import * as vscode from 'vscode'
import { DebugLogSummary } from './DebugLogStore'

export class NeighborLogMessage implements vscode.Disposable {
  private readonly foreground: vscode.ThemeColor;
  private readonly decorationType: vscode.TextEditorDecorationType;

  constructor () {
    this.foreground = new vscode.ThemeColor('descriptionForeground')
    this.decorationType = this.createDecorationType()
  }

  dispose = (): void => {
    this.decorationType.dispose()
  }

  debugLogSummaryToDecorationOptions = (debugLogSummary: DebugLogSummary): vscode.DecorationOptions => {
    return {
      range: debugLogSummary.range,
      renderOptions: {
        after: {
          contentText: debugLogSummary.recent.output
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
        margin: '0 0 0 2.3em'
      }
    })
  }
}
