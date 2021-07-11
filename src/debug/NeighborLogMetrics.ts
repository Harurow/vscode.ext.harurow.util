import * as vscode from 'vscode'
import { DebugLogSummary } from './DebugLogStore'

export class NeighborLogMetrics implements vscode.Disposable {
  private readonly decorationType: vscode.TextEditorDecorationType;

  constructor () {
    this.decorationType = this.createDecorationType()
  }

  dispose = (): void => {
    this.decorationType.dispose()
  }

  debugLogSummaryToDecorationOptions = (debugLogSummary: DebugLogSummary): vscode.DecorationOptions => {
    if (debugLogSummary.metrics == null) {
      return {
        range: debugLogSummary.range
      }
    }

    const metrics = debugLogSummary.metrics
    const markdown = (metrics.count === 1)
      ? `${metrics.totalDuration.toLocaleString()} ms`
      : `${metrics.totalDuration.toLocaleString()} ms, ` +
        `avg: ${metrics.averageDuration.toLocaleString()} ms, ` +
        `${metrics.count.toLocaleString()} times`

    return {
      range: debugLogSummary.range,
      hoverMessage: new vscode.MarkdownString(markdown)
    }
  }

  setDecorations = (editor: vscode.TextEditor, rangeOrOptions: vscode.Range[] | vscode.DecorationOptions[]): void => {
    editor.setDecorations(this.decorationType, rangeOrOptions)
  }

  private readonly createDecorationType = (): vscode.TextEditorDecorationType => {
    return vscode.window.createTextEditorDecorationType({})
  }
}
