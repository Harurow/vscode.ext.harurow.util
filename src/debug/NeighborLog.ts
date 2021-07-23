import * as vscode from 'vscode'
import { DebugSessionEventHub, DebugSessionEvent } from './DebugSessionEventHub'
import { DebugLogStoreEventHub } from './DebugLogStoreEventHub'
import { DebugLogSummary, DebugLogStore, DebugLogStoreEvent } from './DebugLogStore'
import { DebugMetricsStore } from './DebugLogMetrics'
import { NeighborLogMessage } from './NeighborLogMessage'
import { NeighborLogCounter } from './NeighborLogCounter'
import { NeighborLogMetrics } from './NeighborLogMetrics'
import { onDidChangeVisibleTextEditors, toLineEndRange, VisibleTextEditorsChangeEvent } from '../utils'

export class NeighborLog implements vscode.Disposable {
  private readonly logStore: DebugLogStore
  private readonly metricsStore: DebugMetricsStore
  private readonly disposables: vscode.Disposable[]
  private readonly message: NeighborLogMessage
  private readonly counter: NeighborLogCounter
  private readonly metrics: NeighborLogMetrics

  constructor (
    sessionEventHub: DebugSessionEventHub,
    logStoreEventHub: DebugLogStoreEventHub,
    logStore: DebugLogStore,
    metricsStore: DebugMetricsStore
  ) {
    this.logStore = logStore
    this.metricsStore = metricsStore

    this.disposables = [
      sessionEventHub.subscribe(this.onDebugSessionEvent),
      logStoreEventHub.subscribe(this.onLogStoreEvent),
      vscode.workspace.onDidChangeTextDocument(this.onDidChangeTextDocument),
      onDidChangeVisibleTextEditors(this.onDidChangeVisibleTextEditors),
      this.message = new NeighborLogMessage(),
      this.counter = new NeighborLogCounter(),
      this.metrics = new NeighborLogMetrics(),
    ]
  }

  dispose = (): void => {
    this.draw()
    this.disposables.forEach((obj) => obj.dispose())
    this.disposables.length = 0
  }

  private readonly onDebugSessionEvent = (e: DebugSessionEvent): void => {
    if (e.session.parentSession == null && e.kind === 'start') {
      this.metricsStore.reset(e)
      this.logStore.reset()
    }
  }

  private readonly onLogStoreEvent = (e: DebugLogStoreEvent): void => {
    if (e.type === 'reset') {
      this.draw()
    } else if (e.type === 'set') {
      this.metricsStore.set(e)
      this.draw(e.path)
    }
  }

  private readonly onDidChangeTextDocument = (e: vscode.TextDocumentChangeEvent): void => {
    const doc = e.document
    const path = doc.uri.toString()

    const logLineNoMap = this.logStore.get(path)
    if (logLineNoMap == null) {
      return
    }

    let updated = false

    e.contentChanges.forEach((contentChange) => {
      const before = contentChange.range
      const after = new vscode.Range(
        doc.positionAt(contentChange.rangeOffset),
        doc.positionAt(contentChange.rangeOffset + contentChange.text.length)
      )

      const diff = (after.end.line - after.start.line) - (before.end.line - before.start.line)
      const deleteLines: number[] = []
      const moveLines: Array<{ lineNo: number, debugLogSummary: DebugLogSummary }> = []

      logLineNoMap.forEach((debugLogSummary, lineNo) => {
        if (before.contains(debugLogSummary.range.start) || before.contains(debugLogSummary.range.end)) {
          deleteLines.push(lineNo)
          updated = true
        } else {
          if (diff !== 0) {
            if (before.start.line <= lineNo) {
              moveLines.push({ lineNo, debugLogSummary })
              updated = true
            }
          } else if (before.end.line === lineNo) {
            debugLogSummary.range = toLineEndRange(doc, lineNo)
            updated = true
          }
        }
      })

      deleteLines.forEach((lineNo) => logLineNoMap.delete(lineNo))
      moveLines.forEach((i) => logLineNoMap.delete(i.lineNo))
      moveLines.forEach(({ lineNo, debugLogSummary }) => {
        const newLineNo = lineNo + diff
        debugLogSummary.range = toLineEndRange(doc, newLineNo)
        logLineNoMap.set(newLineNo, debugLogSummary)
      })
    })

    if (updated) {
      this.draw(path)
    }
  }

  private readonly createDecorationOptions = (doc: vscode.TextDocument): {
    message: vscode.DecorationOptions[]
    counter: vscode.DecorationOptions[]
    metrics: vscode.DecorationOptions[]
  } => {
    const logLineNoMap = this.logStore.get(doc.uri.toString())
    if (logLineNoMap == null) {
      return { counter: [], message: [], metrics: [] }
    }

    const message: vscode.DecorationOptions[] = []
    const counter: vscode.DecorationOptions[] = []
    const metrics: vscode.DecorationOptions[] = []

    logLineNoMap.forEach((debugLogSummary) => {
      message.push(this.message.debugLogSummaryToDecorationOptions(debugLogSummary))
      counter.push(this.counter.debugLogSummaryToDecorationOptions(debugLogSummary))
      metrics.push(this.metrics.debugLogSummaryToDecorationOptions(debugLogSummary))
    })

    return { message, counter, metrics }
  }

  private readonly draw = (path?: string): void => {
    if (path == null) {
      vscode.window.visibleTextEditors.forEach((editor) => {
        this.setDecorations(editor)
      })
    } else {
      vscode.window.visibleTextEditors.forEach((editor) => {
        if (editor.document.uri.toString() === path) {
          this.setDecorations(editor)
        }
      })
    }
  }

  private readonly onDidChangeVisibleTextEditors = (e: VisibleTextEditorsChangeEvent): void => {
    e.added.forEach((editor) => {
      this.setDecorations(editor)
    })
  }

  private readonly setDecorations = (editor: vscode.TextEditor): void => {
    const options = this.createDecorationOptions(editor.document)
    this.message.setDecorations(editor, options.message)
    this.counter.setDecorations(editor, options.counter)
    this.metrics.setDecorations(editor, options.metrics)
  }
}
