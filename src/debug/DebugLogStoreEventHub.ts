import * as vscode from 'vscode'
import { DebugLogStoreEvent } from './DebugLogStore'

export type Callback = (e: DebugLogStoreEvent) => void

export class DebugLogStoreEventHub implements vscode.Disposable {
  private readonly observers: Callback[] = []

  dispose = (): void => {
    this.observers.length = 0
    this.subscribe = (_callback: Callback): vscode.Disposable => ({ dispose: () => { /* nop */ } })
    this.post = (_e: DebugLogStoreEvent): void => { /* nop */ }
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
      },
    })
  }

  post = (e: DebugLogStoreEvent): void => {
    Array
      .from(this.observers)
      .forEach((callback) => {
        callback(e)
      })
  }
}
