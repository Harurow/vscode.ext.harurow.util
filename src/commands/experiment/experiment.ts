import { Uri, window, workspace } from 'vscode'

export async function experiment (uri: Uri): Promise<void> {
  try {
    console.log(uri)
    const workspaceFolder = workspace.getWorkspaceFolder(uri)
    console.log(workspaceFolder)
  } catch (err) {
    console.warn(err)
    await window.showErrorMessage(err)
  }
}

const cmdTable = [
  { name: 'experiment', func: experiment }
]

export default cmdTable
