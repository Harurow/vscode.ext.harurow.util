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
    borderColor: 'rgba(58, 70, 101, 0.4)'
  },
  dark: {
    borderColor: 'rgba(117, 141, 203, 0.4)'
  }
}

class WhitespaceRender {
  private readonly editor: vscode.TextEditor
  private readonly whiteSpaceDeco1: vscode.TextEditorDecorationType
  private readonly whiteSpaceDeco2: vscode.TextEditorDecorationType
  private isDisposed = false

  constructor (editor: vscode.TextEditor) {
    this.editor = editor
    this.whiteSpaceDeco1 = vscode.window.createTextEditorDecorationType(whiteSpaceDecorationRenderOptions)
    this.whiteSpaceDeco2 = vscode.window.createTextEditorDecorationType(whiteSpaceDecorationRenderOptions)
    this.setDecoration()
  }

  dispose (): void {
    if (!this.isDisposed) {
      this.whiteSpaceDeco1.dispose()
      this.whiteSpaceDeco2.dispose()
      this.isDisposed = true
    }
  }

  setDecoration (): void {
    if (this.isDisposed) {
      return
    }

    const whiteSpaceDeco1Range: vscode.Range[] = []
    const whiteSpaceDeco2Range: vscode.Range[] = []
    const doc = this.editor.document

    const fullWidthSpace = getConfiguration('harurow', 'editor.fullWidthSpaceReder', doc) === 'always'
    const nobreakSpace = getConfiguration('harurow', 'editor.nobreakSpaceReder', doc) === 'always'

    if (fullWidthSpace || nobreakSpace) {
      const deco = [whiteSpaceDeco1Range, whiteSpaceDeco2Range]
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

    this.editor.setDecorations(this.whiteSpaceDeco1, whiteSpaceDeco1Range)
    this.editor.setDecorations(this.whiteSpaceDeco2, whiteSpaceDeco2Range)
  }
}

export function activate (context: vscode.ExtensionContext): void {
  const editors = new Map<vscode.TextEditor, WhitespaceRender>()

  vscode.window.visibleTextEditors.forEach(editor => {
    const render = new WhitespaceRender(editor)
    editors.set(editor, render)
    context.subscriptions.push(render)
  })

  vscode.workspace.onDidChangeTextDocument(e => {
    if (e.document != null) {
      editors.forEach((v, k) => {
        if (k.document === e.document) {
          v.setDecoration()
        }
      })
    }
  }, null, context.subscriptions)

  vscode.window.onDidChangeVisibleTextEditors(_ => {
    const textEditors = new Set<vscode.TextEditor>()

    vscode.window.visibleTextEditors.forEach(editor => {
      if (!editors.has(editor)) {
        const render = new WhitespaceRender(editor)
        editors.set(editor, render)
        context.subscriptions.push(render)
      }
      textEditors.add(editor)
    })

    const removedTextEditors = new Set<vscode.TextEditor>()

    editors.forEach((_, view) => {
      if (!textEditors.has(view)) {
        removedTextEditors.add(view)
      }
    })

    removedTextEditors.forEach((view) => {
      editors.get(view)?.dispose()
      editors.delete(view)
    })
  }, null, context.subscriptions)
}

export function deactivate (): void {
  // nop
}
