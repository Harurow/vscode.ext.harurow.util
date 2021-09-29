import * as vscode from 'vscode'

export interface Step {
  name: string
  show(): Promise<NextStep>
}

type NextStep = Step | string | undefined
type Resolve = (value: NextStep | PromiseLike<NextStep>) => void
type Reject = (reason?: any) => void

class StepReason extends Error {
  static readonly Cancel = new StepReason()
  private constructor () {
    super()
  }
}

export interface StepOptions {
  type: string
  name: string
}

export interface InputBoxOptions extends StepOptions {
  type: 'inputBox'
  title?: string
  step?: number
  totalSteps?: number
  ignoreFocusOut?: boolean
  placeholder?: string
  prompt?: string
  value?: string
  buttons?: vscode.QuickInputButton[]
  onWillShow?: (sender: vscode.InputBox) => void
  onDidChangeValue?: (sender: vscode.InputBox, e: string) => void
  onDidTriggerButton?: (sender: vscode.InputBox, e: vscode.QuickInputButton) => NextStep
  onDidTriggerBackButton?: (sender: vscode.InputBox) => NextStep
  onDidHide?: (sender: vscode.InputBox, e: void) => void
  onDidAccept?: (sender: vscode.InputBox, e: void) => NextStep
}

export interface QuickPickOptions<T extends vscode.QuickPickItem> extends StepOptions {
  type: 'quickPick'
  title?: string
  step?: number
  totalSteps?: number
  ignoreFocusOut?: boolean
  placeholder?: string
  value?: string
  buttons?: vscode.QuickInputButton[]
  items?: T[]
  activeItems?: T[]
  selectedItems?: T[]
  canSelectMany?: boolean
  matchOnDescription?: boolean
  matchOnDetail?: boolean
  onWillShow?: (sender: vscode.QuickPick<T>) => void
  onDidChangeValue?: (sender: vscode.QuickPick<T>, e: string) => void
  onDidChangeActive?: (sender: vscode.QuickPick<T>, e: readonly T[]) => void
  onDidChangeSelection?: (sender: vscode.QuickPick<T>, e: readonly T[]) => void
  onDidHide?: (sender: vscode.QuickPick<T>) => void
  onDidTriggerButton?: (sender: vscode.QuickPick<T>, e: vscode.QuickInputButton) => NextStep
  onDidTriggerBackButton?: (sender: vscode.QuickPick<T>) => NextStep
  onDidAccept?: (sender: vscode.QuickPick<T>) => NextStep
}

export type StepOption<T extends vscode.QuickPickItem> = InputBoxOptions | QuickPickOptions<T>

export const createStep = <T extends vscode.QuickPickItem>(options: StepOption<T>): Step => {
  return {
    name: options.name,
    show: async (): Promise<string | Step | undefined> => {
      return new Promise((resolve, reject) => {
        if (options.type === 'inputBox') {
          createInputBox(options, resolve, reject).show()
        } else if (options.type === 'quickPick') {
          createQuickPick(options, resolve, reject).show()
        } else {
          return undefined
        }
      })
    },
  }
}

const createInputBox = (options: InputBoxOptions, resolve: Resolve, reject: Reject): vscode.InputBox => {
  const inputBox = vscode.window.createInputBox()
  const disposables: vscode.Disposable[] = []

  const dispose = (): void => {
    disposables.forEach((obj) => obj.dispose())
    disposables.length = 0
    inputBox.dispose()
  }

  const onDidChangeValueInternal = (e: string): void => options.onDidChangeValue?.(inputBox, e)

  const onDidTriggerButtonInternal = (e: vscode.QuickInputButton): void => {
    const step = options.onDidTriggerButton?.(inputBox, e)
    if (step != null) {
      resolve(step)
      dispose()
      return
    }
    if (options.onDidTriggerBackButton != null && e === vscode.QuickInputButtons.Back) {
      const step = options.onDidTriggerBackButton(inputBox)
      if (step != null) {
        resolve(step)
        dispose()
      }
    }
  }

  const onDidAcceptInternal = (): void => {
    if (inputBox.validationMessage == null) {
      resolve(options.onDidAccept?.(inputBox) ?? undefined)
      dispose()
    }
  }

  const onDidHideInternal = (): void => {
    options.onDidHide?.(inputBox)
    reject(StepReason.Cancel)
    dispose()
  }

  inputBox.title = options.title
  inputBox.step = options.step
  inputBox.totalSteps = options.totalSteps
  inputBox.ignoreFocusOut = options.ignoreFocusOut ?? false
  inputBox.placeholder = options.placeholder
  inputBox.prompt = options.prompt
  inputBox.validationMessage = undefined
  inputBox.enabled = true
  inputBox.busy = false
  inputBox.value = options.value ?? ''
  inputBox.buttons = options.buttons ?? []
  inputBox.onDidChangeValue(onDidChangeValueInternal, undefined, disposables)
  inputBox.onDidTriggerButton(onDidTriggerButtonInternal, undefined, disposables)
  inputBox.onDidAccept(onDidAcceptInternal, undefined, disposables)
  inputBox.onDidHide(onDidHideInternal, undefined, disposables)

  options.onWillShow?.(inputBox)

  if ((options.onDidTriggerButton != null || options.onDidTriggerBackButton != null) &&
    inputBox.buttons.length === 0
  ) {
    inputBox.buttons = [vscode.QuickInputButtons.Back]
  }

  return inputBox
}

const createQuickPick = <T extends vscode.QuickPickItem>(options: QuickPickOptions<T>, resolve: Resolve, reject: Reject): vscode.QuickPick<T> => {
  const quickPickRaw = vscode.window.createQuickPick()
  const quickPick = quickPickRaw as vscode.QuickPick<T>
  const disposables: vscode.Disposable[] = []

  const dispose = (): void => {
    disposables.forEach((obj) => obj.dispose())
    disposables.length = 0
    quickPick.dispose()
  }

  const onDidChangeValueInternal = (e: string): void => options.onDidChangeValue?.(quickPick, e)
  const onDidChangeActiveInternal = (e: readonly T[]): void => options.onDidChangeActive?.(quickPick, e)
  const onDidChangeSelectionInternal = (e: readonly T[]): void => options.onDidChangeSelection?.(quickPick, e)

  const onDidTriggerButtonInternal = (e: vscode.QuickInputButton): void => {
    const step = options.onDidTriggerButton?.(quickPick, e)
    if (step != null) {
      resolve(step)
      dispose()
      return
    }
    if (options.onDidTriggerBackButton != null && e === vscode.QuickInputButtons.Back) {
      const step = options.onDidTriggerBackButton(quickPick)
      if (step != null) {
        resolve(step)
        dispose()
      }
    }
  }

  const onDidAcceptInternal = (): void => {
    resolve(options.onDidAccept?.(quickPick) ?? undefined)
    dispose()
  }

  const onDidHideInternal = (): void => {
    options.onDidHide?.(quickPick)
    reject(StepReason.Cancel)
    dispose()
  }

  quickPick.title = options.title
  quickPick.step = options.step
  quickPick.totalSteps = options.totalSteps
  quickPick.ignoreFocusOut = options.ignoreFocusOut ?? false
  quickPick.placeholder = options.placeholder
  quickPick.enabled = true
  quickPick.busy = false
  quickPick.value = options.value ?? ''
  quickPick.items = options.items ?? []
  quickPick.activeItems = options.activeItems ?? []
  quickPick.selectedItems = options.selectedItems ?? []
  quickPick.buttons = options.buttons ?? []
  quickPick.canSelectMany = options.canSelectMany ?? false
  quickPick.matchOnDescription = options.matchOnDescription ?? false
  quickPick.matchOnDetail = options.matchOnDetail ?? false
  quickPick.onDidChangeValue(onDidChangeValueInternal, undefined, disposables)
  quickPick.onDidChangeActive(onDidChangeActiveInternal, undefined, disposables)
  quickPick.onDidChangeSelection(onDidChangeSelectionInternal, undefined, disposables)
  quickPick.onDidTriggerButton(onDidTriggerButtonInternal, undefined, disposables)
  quickPick.onDidAccept(onDidAcceptInternal, undefined, disposables)
  quickPick.onDidHide(onDidHideInternal, undefined, disposables)

  options.onWillShow?.(quickPick)

  if ((options.onDidTriggerButton != null || options.onDidTriggerBackButton != null) &&
    quickPick.buttons.length === 0
  ) {
    quickPick.buttons = [vscode.QuickInputButtons.Back]
  }

  return quickPick
}

export const runSteps = async (steps: Step[], firstStep: number | string = 0): Promise<boolean> => {
  try {
    let step: NextStep = typeof firstStep === 'string' ? firstStep : steps[firstStep]
    while (step != null) {
      if (typeof step === 'string') {
        step = steps.find((s) => s.name === step)
      } else {
        step = await step.show()
      }
    }
  } catch (err) {
    if (err === StepReason.Cancel) {
      return false
    }
    throw err
  }

  return true
}

export const setActiveItems = <T extends vscode.QuickPickItem>(quickPick: vscode.QuickPick<T>, predicate: (value: T) => boolean): void => {
  const findItems = quickPick.items.filter(predicate)
  quickPick.activeItems = findItems
}
