import * as vscode from 'vscode'

const IDEOGRAPHIC_SPACE = 0x3000
const NOBREAK_SPACE = 0x00A0

const listenSections = [
  'harurow.editor.fullWidthSpaceReder',
  'harurow.editor.nobreakSpaceRender'
]

export class WhiteSpaceRender {
  private isEnableFullWidthSpaceRender: boolean = false
  private isEnableNobreakSpaceRender: boolean = false
  private readonly decoType1: vscode.TextEditorDecorationType
  private readonly decoType2: vscode.TextEditorDecorationType
  private readonly lastVisibleTextEditors = new Set<vscode.TextEditor>()

  public constructor (context: vscode.ExtensionContext) {
    vscode.workspace.onDidChangeConfiguration(this.onDidChangeConfiguration, context.subscriptions)
    vscode.workspace.onDidChangeTextDocument(this.onDidChangeTextDocument, context.subscriptions)
    vscode.window.onDidChangeVisibleTextEditors(this.onDidChangeVisibleTextEditors, context.subscriptions)

    const decorationRenderOptions = this.getDecorationRenderOptions()
    this.decoType1 = vscode.window.createTextEditorDecorationType(decorationRenderOptions)
    this.decoType2 = vscode.window.createTextEditorDecorationType(decorationRenderOptions)

    this.refreshFlags()
    this.refreshVisibleTextEditors()
  }

  private readonly onDidChangeConfiguration = (e: vscode.ConfigurationChangeEvent): void => {
    const scope = this.getConfigurationScope()
    if (listenSections.some((section) => e.affectsConfiguration(section, scope))) {
      this.refreshFlags()
      this.refreshVisibleTextEditors()
    }
  }

  private readonly onDidChangeTextDocument = (e: vscode.TextDocumentChangeEvent): void => {
    if (e.document != null) {
      const docUri = e.document.uri.toString()
      vscode.window.visibleTextEditors.forEach((editor) => {
        if (editor.document?.uri?.toString() === docUri) {
          this.refreshDecoratioins(editor)
        }
      })
    }
  }

  private readonly onDidChangeVisibleTextEditors = (visibleTextEditors: vscode.TextEditor[]): void => {
    const newVisibleTextEditors = new Set<vscode.TextEditor>()

    visibleTextEditors.forEach(editor => {
      if (!this.lastVisibleTextEditors.has(editor)) {
        this.refreshDecoratioins(editor)
        this.lastVisibleTextEditors.add(editor)
      }
      newVisibleTextEditors.add(editor)
    })

    const removedTextEditors: vscode.TextEditor[] = []
    this.lastVisibleTextEditors.forEach((editor) => {
      if (!newVisibleTextEditors.has(editor)) {
        removedTextEditors.push(editor)
      }
    })

    removedTextEditors.forEach(this.lastVisibleTextEditors.delete)
  }

  private readonly getConfigurationScope = (): vscode.WorkspaceFolder | undefined => {
    return vscode.workspace.workspaceFolders?.[0]
  }

  private readonly getConfiguration = (section: string): any => {
    const scope = this.getConfigurationScope()
    return vscode.workspace.getConfiguration('harurow', scope).get(section)
  }

  private readonly getDecorationRenderOptions = (): vscode.DecorationRenderOptions => {
    return {
      borderWidth: '1px',
      borderRadius: '4px',
      borderStyle: 'dashed',
      borderColor: new vscode.ThemeColor('harurow.whitespace')
    }
  }

  private readonly refreshFlags = (): void => {
    this.isEnableFullWidthSpaceRender = this.getConfiguration('editor.fullWidthSpaceReder') === 'always'
    this.isEnableNobreakSpaceRender = this.getConfiguration('editor.nobreakSpaceRender') === 'always'
  }

  private readonly getIsWhiteSpace = (): ((ch: number) => boolean) => {
    if (this.isEnableFullWidthSpaceRender) {
      if (this.isEnableNobreakSpaceRender) {
        return (ch: number) => {
          return ch === IDEOGRAPHIC_SPACE || ch === NOBREAK_SPACE
        }
      }
      return (ch: number) => ch === IDEOGRAPHIC_SPACE
    } else if (this.isEnableNobreakSpaceRender) {
      return (ch: number) => ch === NOBREAK_SPACE
    }
    return (_: number) => false
  }

  private readonly refreshDecoratioins = (editor: vscode.TextEditor): void => {
    const ranges: vscode.Range[][] = [[], []]

    if (this.isEnableFullWidthSpaceRender || this.isEnableNobreakSpaceRender) {
      const doc = editor.document

      const isWhiteSpace = this.getIsWhiteSpace()

      let idx = 0
      for (let i = 0; i < doc.lineCount; i++) {
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
    }

    editor.setDecorations(this.decoType1, ranges[0])
    editor.setDecorations(this.decoType2, ranges[1])
  }

  private readonly refreshVisibleTextEditors = (): void => {
    this.lastVisibleTextEditors.clear()

    vscode.window.visibleTextEditors.forEach((editor) => {
      this.refreshDecoratioins(editor)
      this.lastVisibleTextEditors.add(editor)
    })
  }
}
