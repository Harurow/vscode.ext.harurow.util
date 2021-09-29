import * as vscode from 'vscode'
import { createRender } from '../utils'
import { getVisibleRanges } from '../utils/vscode/enumTargetLines'

const IDEOGRAPHIC_SPACE = 0x3000
const NOBREAK_SPACE = 0x00A0

interface WhiteSpaceRenderResource {
  isEnabledFullWidthSpaceRender: boolean
  isEnabledNobreakSpaceRender: boolean
  decoType1: vscode.TextEditorDecorationType
  decoType2: vscode.TextEditorDecorationType
  dispose(): any
}

export class WhiteSpaceRender {
  public constructor (context: vscode.ExtensionContext) {
    context.subscriptions.push(
      createRender(this.createResource, this.setDecorations,
        ['harurow.editor.fullWidthSpaceRender', 'harurow.editor.nobreakSpaceRender']))
  }

  private readonly createResource = (editor: vscode.TextEditor): WhiteSpaceRenderResource => {
    const borderColor = new vscode.ThemeColor('editorWhitespace.foreground')
    const decoType1 = vscode.window.createTextEditorDecorationType({
      borderWidth: '1px',
      borderRadius: '4px',
      borderStyle: 'dashed',
      borderColor: borderColor,
    })
    const decoType2 = vscode.window.createTextEditorDecorationType({
      borderWidth: '1px',
      borderRadius: '4px',
      borderStyle: 'dashed',
      borderColor: borderColor,
    })
    return {
      decoType1: decoType1,
      decoType2: decoType2,
      isEnabledFullWidthSpaceRender: vscode.workspace.getConfiguration('harurow', editor.document).get('editor.fullWidthSpaceRender') === 'always',
      isEnabledNobreakSpaceRender: vscode.workspace.getConfiguration('harurow', editor.document).get('editor.nobreakSpaceRender') === 'always',
      dispose: (): void => {
        decoType1.dispose()
        decoType2.dispose()
      },
    }
  }

  private readonly setDecorations = (editor: vscode.TextEditor, resource: WhiteSpaceRenderResource): void => {
    if (resource.isEnabledFullWidthSpaceRender || resource.isEnabledNobreakSpaceRender) {
      const isWhiteSpace = this.getIsWhiteSpace(resource)
      const ranges: vscode.Range[][] = [[], []]
      const doc = editor.document

      let idx = 0
      getVisibleRanges(editor).forEach((r) => {
        for (let i = r.start.line; i <= r.end.line; i++) {
          const line = doc.lineAt(i)
          const offset = doc.offsetAt(line.range.start)
          const text = line.text
          for (let i = 0; i < text.length; i++) {
            const ch = text.charCodeAt(i)
            if (isWhiteSpace(ch)) {
              ranges[idx].push(new vscode.Range(
                doc.positionAt(offset + i),
                doc.positionAt(offset + i + 1)))
              idx = (idx + 1) & 1
            }
          }
        }
      })

      editor.setDecorations(resource.decoType1, ranges[0])
      editor.setDecorations(resource.decoType2, ranges[1])
    } else {
      editor.setDecorations(resource.decoType1, [])
      editor.setDecorations(resource.decoType2, [])
    }
  }

  private readonly getIsWhiteSpace = (resource: WhiteSpaceRenderResource): ((ch: number) => boolean) => {
    if (resource.isEnabledFullWidthSpaceRender) {
      if (resource.isEnabledNobreakSpaceRender) {
        return (ch: number) => {
          return ch === IDEOGRAPHIC_SPACE || ch === NOBREAK_SPACE
        }
      }
      return (ch: number) => ch === IDEOGRAPHIC_SPACE
    } else if (resource.isEnabledNobreakSpaceRender) {
      return (ch: number) => ch === NOBREAK_SPACE
    }
    return (_: number) => false
  }
}
