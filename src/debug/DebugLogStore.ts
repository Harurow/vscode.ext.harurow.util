import * as vscode from 'vscode'
import { DebugLogStoreEventHub } from './DebugLogStoreEventHub'

export interface DebugLog {
  at: number
  output: any
}

export interface DebugLogMetrics {
  count: number
  totalDuration: number
  averageDuration: number
}

export interface DebugLogSummary {
  range: vscode.Range
  recent: DebugLog
  history: DebugLog[]
  metrics?: DebugLogMetrics
}

export interface DebugLogStoreResetEvent {
  type: 'reset'
}

export interface DebugLogSetEvent {
  type: 'set'
  path: string
  lineNo: number
  debugLogSummary: DebugLogSummary
}

export type DebugLogStoreEvent = DebugLogStoreResetEvent | DebugLogSetEvent

export class DebugLogStore implements vscode.Disposable {
  private readonly logStoreEventHub: DebugLogStoreEventHub
  private readonly pathMap = new Map<string, Map<number, DebugLogSummary>>()
  private startAt = Date.now()

  constructor (logStoreEventHub: DebugLogStoreEventHub) {
    this.logStoreEventHub = logStoreEventHub
  }

  dispose = (): void => {
    this.pathMap.clear()
    this.reset = () => { /* nop */ }
    this.set = (_path: string, _line: number, _range: vscode.Range, _output: any): void => { /* nop */ }
    this.has = (_path: string): boolean => false
    this.get = (_path: string): Map<number, DebugLogSummary> | undefined => undefined
  }

  reset = (): void => {
    this.pathMap.clear()
    this.startAt = Date.now()
    this.logStoreEventHub.post({ type: 'reset' })
  }

  set = (path: string, lineNo: number, range: vscode.Range, output: any): void => {
    const lineNoMap = this.ensureLineNoMap(path)
    const debugLog: DebugLog = {
      at: Date.now() - this.startAt,
      output
    }

    let debugLogSummary = lineNoMap.get(lineNo)
    if (debugLogSummary == null) {
      debugLogSummary = {
        range,
        recent: debugLog,
        history: [debugLog]
      }
      lineNoMap.set(lineNo, debugLogSummary)
    } else {
      debugLogSummary.recent = debugLog
      debugLogSummary.history.push(debugLog)
    }

    this.logStoreEventHub.post({ type: 'set', path, lineNo, debugLogSummary })
  }

  has = (path: string): boolean => {
    return this.pathMap.has(path)
  }

  get = (path: string): Map<number, DebugLogSummary> | undefined => {
    return this.pathMap.get(path)
  }

  private readonly ensureLineNoMap = (path: string): Map<number, DebugLogSummary> => {
    let lineNoMap = this.pathMap.get(path)
    if (lineNoMap == null) {
      lineNoMap = new Map<number, DebugLogSummary>()
      this.pathMap.set(path, lineNoMap)
    }
    return lineNoMap
  }
}
