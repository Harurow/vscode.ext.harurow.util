import * as assert from 'assert'
import * as vscode from 'vscode'

import * as encoding from '../src/encoding'
import * as encja from 'encoding-japanese'

suite("Decoding Tests", () => {

    test("fromRfc3986ShiftJis", () => {
        assert.equal("", encoding.fromRfc3986ShiftJis(""))
        
        assert.equal(":/?#[]@!$&'()*+,;=", encoding.fromRfc3986ShiftJis("%3a%2f%3f%23%5b%5d%40%21%24%26%27%28%29%2a%2b%2c%3b%3d"))
        assert.equal("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSUTVWXYZ0123456789-._~", encoding.fromRfc3986ShiftJis("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSUTVWXYZ0123456789-._~"))
        assert.equal(" !\"#$%&'()*+,-./", encoding.fromRfc3986ShiftJis("%20%21%22%23%24%25%26%27%28%29%2a%2b%2c-.%2f"))
        assert.equal("0123456789:;<=>?", encoding.fromRfc3986ShiftJis("0123456789%3a%3b%3c%3d%3e%3f"))
        assert.equal("@ABCDEFGHIJKLMNO", encoding.fromRfc3986ShiftJis("%40ABCDEFGHIJKLMNO"))
        assert.equal("PQRSTUVWXYZ[\\]^_", encoding.fromRfc3986ShiftJis("PQRSTUVWXYZ%5b%5c%5d%5e_"))
        assert.equal("`abcdefghijklmno", encoding.fromRfc3986ShiftJis("%60abcdefghijklmno"))
        assert.equal("pqrstuvwxyz{|}~", encoding.fromRfc3986ShiftJis("pqrstuvwxyz%7b%7c%7d~"))
       
        assert.equal("ウィキペディア", encoding.fromRfc3986ShiftJis("%83E%83B%83L%83y%83f%83B%83A"))
    })

    test("fromRfc3986EucJp", () => {
        assert.equal("", encoding.fromRfc3986EucJp(""))

        assert.equal(":/?#[]@!$&'()*+,;=", encoding.fromRfc3986EucJp("%3a%2f%3f%23%5b%5d%40%21%24%26%27%28%29%2a%2b%2c%3b%3d"))
        assert.equal("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSUTVWXYZ0123456789-._~", encoding.fromRfc3986EucJp("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSUTVWXYZ0123456789-._~"))
        assert.equal(" !\"#$%&'()*+,-./", encoding.fromRfc3986EucJp("%20%21%22%23%24%25%26%27%28%29%2a%2b%2c-.%2f"))
        assert.equal("0123456789:;<=>?", encoding.fromRfc3986EucJp("0123456789%3a%3b%3c%3d%3e%3f"))
        assert.equal("@ABCDEFGHIJKLMNO", encoding.fromRfc3986EucJp("%40ABCDEFGHIJKLMNO"))
        assert.equal("PQRSTUVWXYZ[\\]^_", encoding.fromRfc3986EucJp("PQRSTUVWXYZ%5b%5c%5d%5e_"))
        assert.equal("`abcdefghijklmno", encoding.fromRfc3986EucJp("%60abcdefghijklmno"))
        assert.equal("pqrstuvwxyz{|}~", encoding.fromRfc3986EucJp("pqrstuvwxyz%7b%7c%7d~"))
       
        assert.equal("ウィキペディア", encoding.fromRfc3986EucJp("%a5%a6%a5%a3%a5%ad%a5%da%a5%c7%a5%a3%a5%a2"))
    })
    
    test("fromRfc3986Utf8", () => {
        assert.equal("", encoding.fromRfc3986Utf8(""))

        assert.equal(":/?#[]@!$&'()*+,;=", encoding.fromRfc3986Utf8("%3a%2f%3f%23%5b%5d%40%21%24%26%27%28%29%2a%2b%2c%3b%3d"))
        assert.equal("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSUTVWXYZ0123456789-._~", encoding.fromRfc3986Utf8("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSUTVWXYZ0123456789-._~"))
        assert.equal(" !\"#$%&'()*+,-./", encoding.fromRfc3986Utf8("%20%21%22%23%24%25%26%27%28%29%2a%2b%2c-.%2f"))
        assert.equal("0123456789:;<=>?", encoding.fromRfc3986Utf8("0123456789%3a%3b%3c%3d%3e%3f"))
        assert.equal("@ABCDEFGHIJKLMNO", encoding.fromRfc3986Utf8("%40ABCDEFGHIJKLMNO"))
        assert.equal("PQRSTUVWXYZ[\\]^_", encoding.fromRfc3986Utf8("PQRSTUVWXYZ%5b%5c%5d%5e_"))
        assert.equal("`abcdefghijklmno", encoding.fromRfc3986Utf8("%60abcdefghijklmno"))
        assert.equal("pqrstuvwxyz{|}~", encoding.fromRfc3986Utf8("pqrstuvwxyz%7b%7c%7d~"))
        assert.equal("   ", encoding.fromRfc3986Utf8(" +%20"))
       
        assert.equal("ウィキペディア", encoding.fromRfc3986Utf8("%e3%82%a6%e3%82%a3%e3%82%ad%e3%83%9a%e3%83%87%e3%82%a3%e3%82%a2"))
        assert.equal("叱", encoding.fromRfc3986Utf8("%e5%8f%b1"))

        assert.equal("𩸽 \u{29e3d} \ud867\ude3d 𩸽", encoding.fromRfc3986Utf8("%F0%A9%B8%BD+\u{29e3d} \ud867\ude3d 𩸽"))
        assert.equal("𠮟 \u{20b9f} \ud842\udf9f 𠮟", encoding.fromRfc3986Utf8("%f0%a0%ae%9f+\u{20b9f} 𠮟 \ud842\udf9f"))

        assert.equal("wiki ウィキペディア pedia", encoding.fromRfc3986Utf8("wiki%20ウィキペディア%20pedia"))
        assert.equal("%shika 叱 ru%", encoding.fromRfc3986Utf8("%shika%20叱%20ru%"))
        assert.equal("%1sh%%ika 叱 ru%", encoding.fromRfc3986Utf8("%1sh%%ika%20叱%20ru%"))
        assert.equal("%%1shika 叱 ru%", encoding.fromRfc3986Utf8("%%1shika%20叱%20ru%"))
    })
})
