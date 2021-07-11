import * as vscode from 'vscode'
import { DebugAdapterTracker } from './DebugAdapterTracker'

export class DebugAdapterTrackerFactory implements vscode.DebugAdapterTrackerFactory {
  private readonly debugAdapterTrackers: DebugAdapterTracker[] = []

  /**
   * The method 'createDebugAdapterTracker' is called at the start of a debug session in order
   * to return a "tracker" object that provides read-access to the communication between VS Code and a debug adapter.
   *
   * @param session The {@link DebugSession debug session} for which the debug adapter tracker will be used.
   * @return A {@link DebugAdapterTracker debug adapter tracker} or undefined.
   */
  createDebugAdapterTracker = (session: vscode.DebugSession): vscode.ProviderResult<vscode.DebugAdapterTracker> => {
    if (session.parentSession == null) {
      this.debugAdapterTrackers.forEach((obj) => obj.dispose())
      this.debugAdapterTrackers.length = 0
    }

    const debugLog = vscode.workspace.getConfiguration('harurow', session.workspaceFolder).get('debug.neighborLog') as string
    if (debugLog === 'always') {
      const debugAdapterTracker = new DebugAdapterTracker(session)
      this.debugAdapterTrackers.push(debugAdapterTracker)
      return debugAdapterTracker
    }

    return undefined
  }
}
