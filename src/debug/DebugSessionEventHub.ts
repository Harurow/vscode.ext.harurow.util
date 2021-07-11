import * as vscode from 'vscode'
import { emptyDisposable } from '../utils'

export type DebugSessionEventKind = 'start' | 'stop'

export interface DebugSessionEvent {
  kind: DebugSessionEventKind
  session: vscode.DebugSession
}

export type Callback = (e: DebugSessionEvent) => void

export class DebugSessionEventHub implements vscode.Disposable {
  private readonly observers: Callback[] = []

  dispose = (): void => {
    this.observers.length = 0
    this.subscribe = (_callback: Callback): vscode.Disposable => emptyDisposable
    this.post = (_e: DebugSessionEvent): void => { /* nop */ }
  }

  reset = (): void => {
    this.observers.length = 0
  }

  subscribe = (callback: Callback): vscode.Disposable => {
    this.observers.push(callback)
    return vscode.Disposable.from({
      dispose: () => {
        const index = this.observers.indexOf(callback)
        if (index >= 0) {
          this.observers.splice(index, 1)
        }
      }
    })
  }

  post = (e: DebugSessionEvent): void => {
    Array
      .from(this.observers)
      .forEach((callback) => {
        callback(e)
      })
  }
}
