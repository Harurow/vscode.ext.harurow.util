import { Uri, workspace } from 'vscode'

export function getfullWidthSpaceValue (uri: Uri): boolean {
  const conf = workspace.getConfiguration('harurow', uri)
  const values = conf.inspect('textEditor.fullWidthSpace')
  return (values?.workspaceValue ?? values?.defaultValue) as boolean
}
