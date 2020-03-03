import { workspace, Uri, window } from 'vscode'
import path from 'path'
import { isNullOrEmpty } from '../../utils/string.extension'

export async function excludeFile (uri: Uri): Promise<void> {
  try {
    const workspaceFolder = workspace.getWorkspaceFolder(uri)

    if (workspaceFolder === undefined) {
      throw new Error('invalid uri')
    }

    const fileName = path.relative(workspaceFolder.uri.path, uri.path)
    if (isNullOrEmpty(fileName)) {
      return
    }
    const filesConf = workspace.getConfiguration('files', uri)

    const exclude = filesConf.inspect('exclude')
    const values: any = exclude?.workspaceValue ?? {}

    values[fileName] = true

    await filesConf.update('exclude', values, false)
  } catch (err) {
    console.warn(err)
    await window.showErrorMessage('excludeFile.failed'.toLocalize())
  }
}

export async function backup (uri: Uri): Promise<void> {
  try {
    const workspaceFolder = workspace.getWorkspaceFolder(uri)

    if (workspaceFolder === undefined) {
      throw new Error('invalid uri')
    }

    const filesConf = workspace.getConfiguration('files', uri)
    const harurowConf = workspace.getConfiguration('harurow', uri)

    const exclude = filesConf.inspect('exclude')
    if (exclude == null) {
      return
    }

    const values: any = exclude.workspaceValue ?? exclude.globalValue ?? exclude.defaultValue
    if (values == null) {
      return
    }

    const newValue = { ...values }
    Object.keys(newValue).forEach(key => { newValue[key] = false })

    await harurowConf.update('file.exclude.backup', values, false)
    await filesConf.update('exclude', newValue, false)
  } catch (ex) {
    console.warn(ex)
    await window.showErrorMessage('excludeFile.failed'.toLocalize())
  }
}

export async function restore (uri: Uri): Promise<void> {
  try {
    const workspaceFolder = workspace.getWorkspaceFolder(uri)

    if (workspaceFolder === undefined) {
      throw new Error('invalid uri')
    }

    const filesConf = workspace.getConfiguration('files', uri)
    const harurowConf = workspace.getConfiguration('harurow', uri)

    const exclude = harurowConf.inspect('file.exclude.backup')
    const values: any = exclude?.workspaceValue ?? {}

    await filesConf.update('exclude', values, false)
    await harurowConf.update('file.exclude.backup', undefined, false)
  } catch (ex) {
    console.warn(ex)
    await window.showErrorMessage('excludeFile.failed'.toLocalize())
  }
}

const cmdTable = [
  { name: 'fileExclude.excludeFile', func: excludeFile },
  { name: 'fileExclude.backup', func: backup },
  { name: 'fileExclude.restore', func: restore }
]

export default cmdTable
