import * as vscode from 'vscode'

const IDEOGRAPHIC_SPACE = 0x3000

function getConfiguration (section: string | undefined, key: string, doc: vscode.TextDocument): unknown {
  const config = vscode.workspace.getConfiguration(section, doc)
  return config.get(key)
}

const renderOptions: vscode.DecorationRenderOptions = {
  borderWidth: '1.5px',
  outlineWidth: '0px',
  borderRadius: '5px',
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
  private readonly decoration: vscode.TextEditorDecorationType

  constructor (editor: vscode.TextEditor) {
    this.editor = editor
    this.decoration = vscode.window.createTextEditorDecorationType(renderOptions)
  }

  getRenderOptions (): vscode.DecorationRenderOptions {
    return {
      borderWidth: '1.5px',
      outlineWidth: '0px',
      borderRadius: '5px',
      borderStyle: 'dashed',
      light: {
        borderColor: 'rgba(58, 70, 101, 0.4)'
      },
      dark: {
        borderColor: 'rgba(117, 141, 203, 0.4)'
      }
    }
  }

  setDecoration (): void {
    const whitespaces: vscode.Range[] = []
    const doc = this.editor.document

    const value = getConfiguration('harurow', 'editor.fullWidthSpaceReder', doc)

    if (value === 'always') {
      for (let i = 0; i < doc.lineCount; i++) {
        const line = doc.lineAt(i)
        const offset = doc.offsetAt(line.range.start)
        const text = line.text

        for (let i = 0; i < text.length; i++) {
          const chCode = text.charCodeAt(i)
          if (chCode === IDEOGRAPHIC_SPACE) {
            whitespaces.push(new vscode.Range(
              doc.positionAt(offset + i),
              doc.positionAt(offset + i + 1)))
          }
        }
      }
    }

    this.editor.setDecorations(this.decoration, whitespaces)
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
