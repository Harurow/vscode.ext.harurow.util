import * as vscode from 'vscode'

class Tracker implements vscode.DebugAdapterTracker {
  /**
  * A session with the debug adapter is about to be started.
  */
  onWillStartSession? (): void {
    console.log('onWillStartSession')
  }

  /**
  * The debug adapter is about to receive a Debug Adapter Protocol message from VS Code.
  */
  onWillReceiveMessage? (message: any): void {
    console.log('onWillReceiveMessage', message)
  }

  /**
  * The debug adapter has sent a Debug Adapter Protocol message to VS Code.
  */
  onDidSendMessage? (message: any): void {
    // console.log('onDidSendMessage', message)
    if (message.event === 'output' && message?.body?.category === 'stdout') {
      const body = message.body
      const output = body.output
      const source = body.source
      const path = source.path
      const line = body.line - 1

      const pathUri = vscode.Uri.file(path)
      console.log(`onDisSendMessage: ${pathUri.path}(${line}) > ${output}`)
    }
  }

  /**
  * The debug adapter session is about to be stopped.
  */
  onWillStopSession? (): void {
    console.log('onWillStopSession')
  }

  /**
  * An error with the debug adapter has occurred.
  */
  onError? (error: Error): void {
    console.log('onError', error)
  }

  /**
  * The debug adapter has exited with the given exit code or signal.
  */
  onExit? (code: number | undefined, signal: string | undefined): void {
    console.log('onExit', code, signal)
  }
}

class TrackerFactory implements vscode.DebugAdapterTrackerFactory {
  /**
   * The method 'createDebugAdapterTracker' is called at the start of a debug session in order
   * to return a "tracker" object that provides read-access to the communication between VS Code and a debug adapter.
   *
   * @param session The {@link DebugSession debug session} for which the debug adapter tracker will be used.
   * @return A {@link DebugAdapterTracker debug adapter tracker} or undefined.
   */
  createDebugAdapterTracker (session: vscode.DebugSession): vscode.ProviderResult<vscode.DebugAdapterTracker> {
    console.log('session', session)
    return new Tracker()
  }
}

export function activate (context: vscode.ExtensionContext): void {
  // const factory = new TrackerFactory()
  // context.subscriptions.push(vscode.debug.registerDebugAdapterTrackerFactory('*', factory))
}

export function deactivate (): void {
  // nop
}
