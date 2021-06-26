import { Uri, window } from 'vscode'
import * as ts from 'typescript'
import * as fs from 'fs'
import * as path from 'path'
import { handleError } from '../editor/util'

export async function generateDts (uri: Uri): Promise<void> {
  const options: ts.CompilerOptions = {
    allowJs: true,
    declaration: true,
    emitDeclarationOnly: true
  }
  const jsFile = uri.fsPath
  const dtsFile = jsFile.slice(0, -3) + '.d.ts'
  const dtsBaseFileName = path.basename(dtsFile)
  try {
    const createdFiles: any = {}

    const host = ts.createCompilerHost(options)
    host.writeFile = (fileName, contents, bom): void => {
      createdFiles[fileName] = (bom ? '\uFEFF' : '') + contents
    }

    const program = ts.createProgram([jsFile], options, host)
    program.emit()

    host.readFile(jsFile)

    if (createdFiles[dtsFile] != null) {
      fs.writeFileSync(dtsFile, createdFiles[dtsFile])
      await window.showInformationMessage('generateDts.succeeded'.toLocalize(dtsBaseFileName))
    }
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    handleError(err, 'generateDts.failed'.toLocalize(dtsBaseFileName))
  }
}

export const cmdTable = [
  { name: 'generator.generateDts', func: generateDts }
]
