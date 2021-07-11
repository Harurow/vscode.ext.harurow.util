import * as vscode from 'vscode'
import { DebugLogSetEvent } from './DebugLogStore'
import { DebugSessionEvent } from './DebugSessionEventHub'

export class DebugMetricsStore implements vscode.Disposable {
  private readonly pathMap = new Map<string, Map<string, number>>()
  private startPrefix: string
  private stopPrefix: string

  constructor () {
    const config = vscode.workspace.getConfiguration('harurow')
    this.startPrefix = config.get('debug.metricsStartPrefix') as string
    this.stopPrefix = config.get('debug.metricsStopPrefix') as string
  }

  dispose = (): void => {
    this.pathMap.clear()
  }

  reset = (e: DebugSessionEvent): void => {
    this.pathMap.clear()
    const config = vscode.workspace.getConfiguration('harurow', e.session.workspaceFolder)
    this.startPrefix = config.get('debug.metricsStartPrefix') as string
    this.stopPrefix = config.get('debug.metricsStopPrefix') as string
  }

  set = (e: DebugLogSetEvent): void => {
    if (typeof e.debugLogSummary.recent.output !== 'string') {
      return
    }

    const message = e.debugLogSummary.recent.output
    const now = new Date().getTime()

    if (message.startsWith(this.startPrefix)) {
      const metricsMap = this.ensureMetricsMap(e.path)
      const id = message.substring(this.startPrefix.length).trim()
      metricsMap.set(id, now)
    } else if (message.startsWith(this.stopPrefix)) {
      const metricsMap = this.ensureMetricsMap(e.path)
      const id = message.substring(this.stopPrefix.length).trim()

      const startAt = metricsMap.get(id)
      if (startAt != null) {
        const duration = (now - startAt)

        if (e.debugLogSummary.metrics == null) {
          e.debugLogSummary.metrics = {
            count: 1,
            totalDuration: duration,
            averageDuration: duration
          }
        } else {
          e.debugLogSummary.metrics.count++
          e.debugLogSummary.metrics.totalDuration += duration
          e.debugLogSummary.metrics.averageDuration = Math.round(e.debugLogSummary.metrics.totalDuration / e.debugLogSummary.metrics.count)
        }

        metricsMap.delete(id)
      }
    }
  }

  private readonly ensureMetricsMap = (path: string): Map<string, number> => {
    let metricsMap = this.pathMap.get(path)
    if (metricsMap == null) {
      metricsMap = new Map<string, number>()
      this.pathMap.set(path, metricsMap)
    }

    return metricsMap
  }
}
