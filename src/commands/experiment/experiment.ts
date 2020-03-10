import { Uri, workspace } from 'vscode'
import { handleError } from '../editor/util'

export function experiment (uri: Uri): void {
  try {
    console.log(uri)
    const workspaceFolder = workspace.getWorkspaceFolder(uri)
    console.log(workspaceFolder)
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    handleError(err)
  }
}

const cmdTable = [
  { name: 'experiment', func: experiment }
]

export default cmdTable
