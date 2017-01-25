'use strict'

import * as vscode from 'vscode'

interface NumbersOptions {
    stt: number
    stp: number
    rdx: number
    len: number
}

function parse(input: string) : NumbersOptions {
    let values = input.split(' ')
    if (values.length > 4) throw "invalid format"

    let sttstr = values[0]
    let stpstr = values.length > 1 ? values[1] : "1"
    let rdxstr = values.length > 2 ? values[2] : "10"
    let lenstr = values.length > 3 ? values[3] : "0"

    let stt = Number.parseInt(sttstr)
    if (stt === NaN) throw "start was invalid."

    let stp = Number.parseInt(stpstr, 10)
    if (stp === NaN) throw "step was invalid."

    let rdx = Number.parseInt(rdxstr, 10)
    if (rdx === NaN) throw "radix was invalid."
    if (rdx !== 2 && rdx !== 8 && rdx !== 10 && rdx !== 16) {
        throw "radix is must be 2, 8, 10 or 16."
    }

    let len = Number.parseInt(lenstr, 10)
    if (len === NaN) throw "len was invalid."
    if (len < 0) throw "len is must be 0 or greater"

    return {
        stt: stt,
        stp: stp,
        rdx: rdx,
        len: len
    }
}

export function numbers(editor: vscode.TextEditor) {
    if (!editor.selections || editor.selections.length == 1) {
        vscode.window.showWarningMessage("has no multiple cursors")
        return
    }

    let options = {
        value: "0",
        placeHolder: "start step?=1 radix?:[2|10|8|16]=10 len?=0",
        prompt: "input number setting > start step?=1 radix?:[2|10|8|16]=10 len?=0",
    }

    vscode.window.showInputBox(options).then((input) => {
        if (input === undefined) {
            return
        }
        if (!input) {
            vscode.window.showWarningMessage("Must be input number.")
            return
        }

        try
        {
            const {stt, stp, rdx, len} = parse(input)

            editor.edit((builder) => {
                let i = stt
                let pref = "0".repeat(len)

                editor.selections.forEach(sel => {
                    let num = i.toString(rdx)
                    if (len > 0) {
                        num = (pref + num).slice(-len)
                    }
                    builder.replace(sel, num)
                    i += stp
                })
            })
        }
        catch (err)
        {
            vscode.window.showWarningMessage(err)
            return
        }
    })
}
