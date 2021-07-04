import * as vscode from 'vscode'

const IDEOGRAPHIC_SPACE = 0x3000
const NOBREAK_SPACE = 0x00A0

function getConfiguration (section: string | undefined, key: string, doc: vscode.TextDocument): unknown {
  const config = vscode.workspace.getConfiguration(section, doc)
  return config.get(key)
}

const whiteSpaceDecorationRenderOptions: vscode.DecorationRenderOptions = {
  borderWidth: '1px',
  borderRadius: '4px',
  borderStyle: 'dashed',
  light: {
    borderColor: 'rgba(58, 70, 101, 0.4)',
  },
  dark: {
    borderColor: 'rgba(117, 141, 203, 0.4)',
  }
}

class WhitespaceRender {
  private readonly editor: vscode.TextEditor
  private readonly whiteSpaceDeco1: vscode.TextEditorDecorationType
  private readonly whiteSpaceDeco2: vscode.TextEditorDecorationType

  constructor (editor: vscode.TextEditor) {
    this.editor = editor
    this.whiteSpaceDeco1 = vscode.window.createTextEditorDecorationType(whiteSpaceDecorationRenderOptions)
    this.whiteSpaceDeco2 = vscode.window.createTextEditorDecorationType(whiteSpaceDecorationRenderOptions)
  }

  setDecoration (): void {
    const whiteSpaceDeco1: vscode.Range[] = []
    const whiteSpaceDeco2: vscode.Range[] = []
    const doc = this.editor.document

    const fullWidthSpace = getConfiguration('harurow', 'editor.fullWidthSpaceReder', doc) === 'always'
    const nobreakSpace = getConfiguration('harurow', 'editor.nobreakSpaceReder', doc) === 'always'

    if (fullWidthSpace || nobreakSpace) {
      const deco = [whiteSpaceDeco1, whiteSpaceDeco2]
      let idx = 0
      for (let i = 0; i < doc.lineCount; i++) {
        const line = doc.lineAt(i)
        const offset = doc.offsetAt(line.range.start)
        const text = line.text

        for (let i = 0; i < text.length; i++) {
          const chCode = text.charCodeAt(i)
          if (chCode === IDEOGRAPHIC_SPACE || chCode === NOBREAK_SPACE) {
            deco[idx].push(new vscode.Range(
              doc.positionAt(offset + i),
              doc.positionAt(offset + i + 1)))
            idx = (idx + 1) & 1
          }
        }
      }
    }

    this.editor.setDecorations(this.whiteSpaceDeco1, whiteSpaceDeco1)
    this.editor.setDecorations(this.whiteSpaceDeco2, whiteSpaceDeco2)
  }
}

export function activate (context: vscode.ExtensionContext): void {
  const renders = new Map<vscode.TextEditor, WhitespaceRender>()

  if (vscode.window.activeTextEditor != null) {
    const editor = vscode.window.activeTextEditor
    if (!renders.has(editor)) {
      renders.set(editor, new WhitespaceRender(editor))
    }

    renders.get(editor)?.setDecoration()
  }

  vscode.window.onDidChangeActiveTextEditor(editor => {
    if (editor == null) {
      return
    }

    if (!renders.has(editor)) {
      renders.set(editor, new WhitespaceRender(editor))
    }

    renders.get(editor)?.setDecoration()
  }, null, context.subscriptions)

  vscode.workspace.onDidChangeTextDocument(e => {
    const editor = vscode.window.activeTextEditor
    if (editor != null && e.document === editor.document) {
      renders.get(editor)?.setDecoration()
    }
  }, null, context.subscriptions)

  vscode.window.onDidChangeTextEditorVisibleRanges(e => {
    renders.get(e.textEditor)?.setDecoration()
  })
}

export function deactivate (): void {
  // nop
}
