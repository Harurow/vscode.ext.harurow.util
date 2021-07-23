import { Uri } from 'vscode'
import { handleError } from '../editor/util'

export function experiment (uri: Uri): void {
  try {
    // const workspaceFolder = workspace.getWorkspaceFolder(uri)
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    handleError(err)
  }
}

export const cmdTable = [
  { name: 'experiment', func: experiment },
]
