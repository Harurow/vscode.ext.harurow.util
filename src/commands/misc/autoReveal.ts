import { Uri, workspace, commands } from 'vscode'
import { handleError } from '../editor/util'

export async function autoRevealOff (uri: Uri): Promise<void> {
  try {
    const conf = workspace.getConfiguration('explorer')
    await conf.update('autoReveal', false, true)
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    handleError(err)
  }
}

export async function autoRevealOn (uri: Uri): Promise<void> {
  try {
    const conf = workspace.getConfiguration('explorer')
    await conf.update('autoReveal', true, true)
    await commands.executeCommand('workbench.files.action.showActiveFileInExplorer')
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    handleError(err)
  }
}

export const cmdTable = [
  { name: 'autoReveal.off', func: autoRevealOff },
  { name: 'autoReveal.on', func: autoRevealOn }
]
