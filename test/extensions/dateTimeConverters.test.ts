import * as assert from 'assert'
import * as vscode from 'vscode'

import TextEditor from '../utils/textEditor'

suite('extensions dateTimeConverters', () => {
    test('commands.dateTimeConverters.toIsoDateTime', async () => {
        let editor = await TextEditor.init()

        let command = 'commands.dateTimeConverters.toIsoDateTime'

        let before = '\\/Date(1493305200000)\\/ \\/Date(1493305200000+0900)\\/ \\/Date(1493305200000-0900)\\/ \\/Date(1493305200321)\\/'
        let after = '2017-04-27T15:00:00.000Z 2017-04-28T00:00:00.000+0900 2017-04-28T00:00:00.000-0900 2017-04-27T15:00:00.321Z'
        await editor.clearText()
        await editor.setText(before)
        assert.equal(before, editor.getText())
        editor.execCommand(command)
            .then(_ => assert.equal(after, editor.getText()))
    })
})
