import { QuickPickItem, window, Disposable, QuickInput, QuickInputButtons, QuickPick, InputBox, InputBoxOptions } from 'vscode'
import { UserCanceled } from './UserCanceled'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class InputFlowAction extends Error {
  static readonly back = new InputFlowAction()
  static readonly cancel = new InputFlowAction()
  private constructor () {
    super()
  }
}

type InputStep = (input: MultiStepInput) => Promise<InputStep | void>

interface QuickPickParameters<T extends QuickPickItem> {
  title?: string
  step?: number
  totalSteps?: number
  value?: string
  items: T[]
  activeItem?: T
  matchOnDescription?: boolean
  matchOnDetail?: boolean
  placeholder: string
  onDidChangeActive?: (item: T) => void
  onDidChangeValue?: (sender: QuickPick<T>, filter: string) => void
}

interface InputBoxParameters extends InputBoxOptions {
  title?: string
  step?: number
  totalSteps?: number
}

export class MultiStepInput {
  static async run (start: InputStep): Promise<boolean> {
    const input = new MultiStepInput()
    return input.stepThrough(start)
  }

  private current?: QuickInput
  private readonly steps: InputStep[] = []

  private async stepThrough (start: InputStep): Promise<boolean> {
    let step: InputStep | void = start

    while (step != null) {
      this.steps.push(step)
      if (this.current != null) {
        this.current.enabled = false
        this.current.busy = true
      }
      try {
        step = await step(this)
      } catch (err) {
        if (err === InputFlowAction.back) {
          this.steps.pop()
          step = this.steps.pop()
        } else if (err === InputFlowAction.cancel) {
          step = undefined
          return false
        } else {
          throw err
        }
      }
    }

    this.current?.dispose()
    return true
  }

  private initQuickPick<T extends QuickPickItem> (input: QuickPick<T>, resolve: (value: T) => void, reject: (reason?: any) => void, p: QuickPickParameters<T>): Disposable[] {
    input.title = p.title
    input.step = p.step
    input.matchOnDescription = p.matchOnDescription ?? false
    input.matchOnDetail = p.matchOnDetail ?? false
    input.totalSteps = p.totalSteps
    input.placeholder = p.placeholder
    input.value = p.value ?? ''
    input.items = p.items
    input.activeItems = (p.activeItem != null) ? [p.activeItem] : []
    input.buttons = [
      ...(this.steps.length > 1 ? [QuickInputButtons.Back] : [])
    ]

    const disposables: Disposable[] = []

    disposables.push(
      input.onDidChangeValue((filter) => {
        p.onDidChangeValue?.(input, filter)
      }),
      input.onDidChangeActive((items) => {
        p.onDidChangeActive?.(items[0])
      }),
      input.onDidChangeSelection((items) => {
        resolve(items[0])
      }),
      input.onDidHide(() => {
        reject(new UserCanceled())
      }),
      input.onDidTriggerButton(item => {
        if (item === QuickInputButtons.Back) {
          reject(InputFlowAction.back)
        }
      })
    )

    return disposables
  }

  async showQuickPick<T extends QuickPickItem = QuickPickItem>(p: QuickPickParameters<T>): Promise<T | undefined> {
    const disposables: Disposable[] = []
    try {
      return await new Promise<T | undefined>((resolve, reject) => {
        const input = window.createQuickPick<T>()

        disposables.push(...this.initQuickPick(input, resolve, reject, p))

        this.current?.dispose()
        this.current = input
        this.current.show()
      })
    } finally {
      disposables?.forEach(d => d.dispose())
    }
  }

  private initInputBox (input: InputBox, resolve: (value: string) => void, reject: (reason?: any) => void, p: InputBoxParameters): Disposable[] {
    input.title = p.title
    input.step = p.step
    input.totalSteps = p.totalSteps
    input.placeholder = p.placeHolder
    input.prompt = p.prompt
    input.password = p.password ?? false
    input.value = p.value ?? ''
    input.buttons = [
      ...(this.steps.length > 1 ? [QuickInputButtons.Back] : [])
    ]

    const disposables: Disposable[] = []

    disposables.push(
      input.onDidAccept(() => {
        resolve(input.value)
      }),
      input.onDidChangeValue(async val => {
        if (p.validateInput != null) {
          input.validationMessage = await p.validateInput(val) ?? undefined
        }
      }),
      input.onDidHide(() => {
        reject(new UserCanceled())
      }),
      input.onDidTriggerButton(item => {
        if (item === QuickInputButtons.Back) {
          reject(InputFlowAction.back)
        }
      })
    )

    return disposables
  }

  async showInputBox (p: InputBoxParameters): Promise<string | undefined> {
    const disposables: Disposable[] = []
    try {
      return await new Promise<string | undefined>((resolve, reject) => {
        const input = window.createInputBox()

        disposables.push(...this.initInputBox(input, resolve, reject, p))

        this.current?.dispose()
        this.current = input
        this.current.show()
      })
    } finally {
      disposables?.forEach(d => d.dispose())
    }
  }
}
