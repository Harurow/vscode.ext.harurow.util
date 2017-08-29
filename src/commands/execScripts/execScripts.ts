import * as vscode from 'vscode'

let terminal = <vscode.Terminal>null
let hookedOnDidCloseTerminal = false

export const execScript = () => {
    let txtwnd = vscode.window.activeTextEditor

    if (txtwnd) {
        let doc = txtwnd.document

        if (doc.isClosed || doc.isUntitled) {
            return
        }

        let scriptPath = doc.fileName
        let script = ''
        switch (doc.languageId) {
            case 'csharp':
                script = `csharp ${scriptPath}`
                break
            case 'kotlin':
                script = `kotlinc -script ${scriptPath}`
                break
            case 'elixir':
                script = `elixir ${scriptPath}`
                break
            case 'erlang':
                script = `escript ${scriptPath}`
                break
            case 'go':
                script = `go run ${scriptPath}`
                break
            case 'haskell':
                script = `ghc ${scriptPath}`
                break
            case 'python':
                script = `python ${scriptPath}`
                break
            case 'r':
                script = `r --slave --vanilla < ${scriptPath}`
                break
//            case 'typescript':
//                script = `tsc ${scriptPath}`
//                break
            default:
                console.log(doc.languageId)
                vscode.window.showWarningMessage('Not supported file type.')
                return
        }

        if (doc.isDirty) {
            vscode.window.showWarningMessage('Please save this file.')
            return
        }

        if (terminal === null) {
            terminal = vscode.window.createTerminal('script')

            if (!hookedOnDidCloseTerminal) {
                vscode.window.onDidCloseTerminal(e => {
                    if (terminal.processId === e.processId) {
                        terminal = null
                    }
                })
                hookedOnDidCloseTerminal = true
            }
        }

        terminal.show(false)
        terminal.sendText(script, true)
    }
}
