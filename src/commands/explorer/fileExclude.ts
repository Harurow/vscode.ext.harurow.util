import { workspace, Uri } from 'vscode'
import path from 'path'
import { handleError } from '../editor/util'

export async function excludeFile (uri: Uri): Promise<void> {
  try {
    const workspaceFolder = workspace.getWorkspaceFolder(uri)

    if (workspaceFolder === undefined) {
      throw new Error('invalid uri')
    }

    const fileName = path.relative(workspaceFolder.uri.path, uri.path)
    if (fileName == null || fileName === '') {
      return
    }
    const filesConf = workspace.getConfiguration('files', uri)

    const exclude = filesConf.inspect('exclude')
    const values: any = exclude?.workspaceValue ?? {}

    values[fileName] = true

    await filesConf.update('exclude', values, false)
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    handleError(err, 'excludeFile.failed'.toLocalize())
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
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    handleError(err, 'excludeFile.failed'.toLocalize())
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
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    handleError(err, 'excludeFile.failed'.toLocalize())
  }
}

export const cmdTable = [
  { name: 'fileExclude.excludeFile', func: excludeFile },
  { name: 'fileExclude.backup', func: backup },
  { name: 'fileExclude.restore', func: restore },
]
