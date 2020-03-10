import { window, TextEditorEdit, Selection, TextEditor, TextDocument } from 'vscode'
import { UserWarning, UserCanceled, UserInformation, UserError } from '../../utils'

function getEditor (): TextEditor {
  const editor = window.activeTextEditor
  if (editor == null || editor.document == null) {
    throw new UserWarning('noDocument'.toLocalize())
  }
  return editor
}

// #region selections

function getSelections (editor: TextEditor, isRequiredRegion: boolean): Selection[] {
  const selections = editor.selections.filter(sel => !sel.isEmpty)
  if (isRequiredRegion && selections.length === 0) {
    throw new UserWarning('noSelection'.toLocalize())
  }
  return selections
}

export function getSelectTextIfExists (): string | null {
  const editor = window.activeTextEditor
  if (editor == null || editor.document == null || editor.selection.isEmpty) {
    return null
  }
  return editor.document.getText(editor.selection)
}

export function validateSelection (isRequiredRegion: boolean = true): { editor: TextEditor, selections: Selection[], document: TextDocument } {
  const editor = getEditor()
  const selections = getSelections(editor, isRequiredRegion)
  return { editor, selections, document: editor.document }
}

// #endregion

interface TransformTemplateOptions<T = void> {
  getSelectionCallback: (editor: TextEditor) => Selection[]
  inputCallback?: () => Promise<T>
  replaceCallback: (doc: TextDocument, editBuilder: TextEditorEdit, selection: Selection, input: T) => void
  isRequiredRegion?: boolean
  failedMessage?: string | undefined
}

export async function handleError (err: any, failedMessage?: string): Promise<string | undefined> {
  if (err instanceof UserCanceled) {
    if (!err.silent) {
      return window.showInformationMessage(err.message)
    }
    // nop
  } else if (err instanceof UserInformation) {
    return window.showInformationMessage(err.message)
  } else if (err instanceof UserWarning) {
    return window.showWarningMessage(err.message)
  } else if (err instanceof UserError) {
    return window.showErrorMessage(err.message)
  } else {
    console.warn(err)
    return window.showErrorMessage(failedMessage ?? 'failed'.toLocalize())
  }
}

export async function tryCatch (process: () => Promise<void>, failedMessage?: string): Promise<void> {
  try {
    await process()
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    handleError(err, failedMessage)
  }
}

export async function transformTemplate<T> (options: TransformTemplateOptions<T>): Promise<void> {
  await tryCatch(async () => {
    const { editor } = validateSelection(options.isRequiredRegion ?? true)
    const selections = options.getSelectionCallback(editor)

    let input: T
    if (options.inputCallback != null) {
      input = await options.inputCallback()
    }

    await editor.edit((eb: TextEditorEdit) => {
      for (const sel of selections) {
        options.replaceCallback(editor.document, eb, sel, input)
      }
    })
  }, options.failedMessage)
}
