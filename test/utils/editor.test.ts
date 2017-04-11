import * as assert from 'assert'
import * as vscode from 'vscode'

import TextEditor from './textEditor'
import * as $ from '../../src/utils/editor'

suite('editor tests', () => {
    test('replace', async () => {
        let editor = await TextEditor.init()
        await editor.clearText()

        await editor.setText('abc ABC 123')
        assert.equal('abc ABC 123', editor.getText())

        let func = $.getReplaceFunc(str => str.replace('ABC', 'xyz'))
        func().then(result => {
            console.log('aa')
            assert.equal('abc xyz 123', editor.getText())
            console.log('bb')
        })

        console.log('zzzz')
    })
})
