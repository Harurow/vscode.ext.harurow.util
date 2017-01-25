import * as assert from 'assert'
import * as vscode from 'vscode'

import * as replace from '../src/replace'

suite("Replace Tests", () => {

    test("leftsideRight", () => {
        assert.equal("v2=v1", replace.leftsideRight("v1=v2"))
        assert.equal("v2:v1", replace.leftsideRight("v1:v2"))
        assert.equal("    v2 = v1;", replace.leftsideRight("    v1 = v2;"))
        assert.equal("    v2  = v1;", replace.leftsideRight("    v1  = v2;"))
        assert.equal("    v2 =  v1;", replace.leftsideRight("    v1 =  v2;"))

        assert.equal("    v2 =  v1;", replace.leftsideRight("    v1 =  v2;"))
        assert.equal("    C2.v2 =  C1.v1;", replace.leftsideRight("    C1.v1 =  C2.v2;"))
    })
})
