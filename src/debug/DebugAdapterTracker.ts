import * as vscode from 'vscode'
import { DebugSessionEventHub } from './DebugSessionEventHub'
import { DebugLogStoreEventHub } from './DebugLogStoreEventHub'
import { DebugLogStore } from './DebugLogStore'
import { NeighborLog } from './NeighborLog'
import { lineNoToRange } from '../utils'
import { DebugMetricsStore } from './DebugLogMetrics'

export class DebugAdapterTracker implements vscode.DebugAdapterTracker, vscode.Disposable {
  private readonly session: vscode.DebugSession
  private readonly sessionEventHub: DebugSessionEventHub
  private readonly logStoreEventHub: DebugLogStoreEventHub
  private readonly logStore: DebugLogStore
  private readonly metricsStore: DebugMetricsStore
  private readonly disposables: vscode.Disposable[]
  private readonly textDocumentMap = new Map<string, vscode.TextDocument>()

  constructor (session: vscode.DebugSession) {
    this.session = session
    this.disposables = [
      this.sessionEventHub = new DebugSessionEventHub(),
      this.logStoreEventHub = new DebugLogStoreEventHub(),
      this.logStore = new DebugLogStore(this.logStoreEventHub),
      this.metricsStore = new DebugMetricsStore(),
      new NeighborLog(this.sessionEventHub, this.logStoreEventHub, this.logStore, this.metricsStore)
    ]
  }

  dispose = (): void => {
    this.disposables.forEach((obj) => obj.dispose())
    this.disposables.length = 0

    this.onWillStartSession = (): void => { /* nop */ }
    this.onWillStopSession = (): void => { /* nop */ }
    this.onDidSendMessage = (): void => { /* nop */ }
  }

  onWillStartSession = (): void => {
    this.sessionEventHub.post({ kind: 'start', session: this.session })
    this.textDocumentMap.clear()
    vscode.workspace.textDocuments.forEach((doc) => {
      this.textDocumentMap.set(doc.uri.toString(), doc)
    })
  }

  onWillStopSession = (): void => {
    this.sessionEventHub.post({ kind: 'stop', session: this.session })
  }

  onDidSendMessage = (message: any): void => {
    if (message.type === 'event') {
      if (message.event === 'output' && message.body != null) {
        if (message.body.category === 'stdout') {
          this.onDidSendStdoutMessage(message)
        }
      }
    }
  }

  private readonly onDidSendStdoutMessage = (message: any): void => {
    const path = vscode.Uri.file(message.body.source.path).toString()
    const lineNo = message.body.line as number - 1
    const output = message.body.output

    const doc = this.textDocumentMap.get(path)
    if (doc != null) {
      const range = lineNoToRange(doc, lineNo)
      this.logStore.set(path, lineNo, range, output)
    }
  }
}
