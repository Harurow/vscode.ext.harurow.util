import * as assert from 'assert'
import * as vscode from 'vscode'

import * as encoding from '../src/encoding'
import * as encja from 'encoding-japanese'

suite("Encoding Tests", () => {

    test("toRfc3986ShiftJis", () => {
        assert.equal("", encoding.toRfc3986ShiftJis(""))
        
        assert.equal("%3a%2f%3f%23%5b%5d%40%21%24%26%27%28%29%2a%2b%2c%3b%3d", encoding.toRfc3986ShiftJis(":/?#[]@!$&'()*+,;="))
        assert.equal("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSUTVWXYZ0123456789-._~",
                     encoding.toRfc3986ShiftJis("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSUTVWXYZ0123456789-._~"))
        assert.equal("%20%21%22%23%24%25%26%27%28%29%2a%2b%2c-.%2f", encoding.toRfc3986ShiftJis(" !\"#$%&'()*+,-./"))
        assert.equal("0123456789%3a%3b%3c%3d%3e%3f", encoding.toRfc3986ShiftJis("0123456789:;<=>?"))
        assert.equal("%40ABCDEFGHIJKLMNO", encoding.toRfc3986ShiftJis("@ABCDEFGHIJKLMNO"))
        assert.equal("PQRSTUVWXYZ%5b%5c%5d%5e_", encoding.toRfc3986ShiftJis("PQRSTUVWXYZ[\\]^_"))
        assert.equal("%60abcdefghijklmno", encoding.toRfc3986ShiftJis("`abcdefghijklmno"))
        assert.equal("pqrstuvwxyz%7b%7c%7d~", encoding.toRfc3986ShiftJis("pqrstuvwxyz{|}~"))
       
        assert.equal("%83E%83B%83L%83y%83f%83B%83A", encoding.toRfc3986ShiftJis("ウィキペディア"))
    })

    test("toRfc3986EucJp", () => {
        assert.equal("", encoding.toRfc3986EucJp(""))
        
        assert.equal("%3a%2f%3f%23%5b%5d%40%21%24%26%27%28%29%2a%2b%2c%3b%3d", encoding.toRfc3986EucJp(":/?#[]@!$&'()*+,;="))
        assert.equal("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSUTVWXYZ0123456789-._~",
                     encoding.toRfc3986EucJp("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSUTVWXYZ0123456789-._~"))
        assert.equal("%20%21%22%23%24%25%26%27%28%29%2a%2b%2c-.%2f", encoding.toRfc3986EucJp(" !\"#$%&'()*+,-./"))
        assert.equal("0123456789%3a%3b%3c%3d%3e%3f", encoding.toRfc3986EucJp("0123456789:;<=>?"))
        assert.equal("%40ABCDEFGHIJKLMNO", encoding.toRfc3986EucJp("@ABCDEFGHIJKLMNO"))
        assert.equal("PQRSTUVWXYZ%5b%5c%5d%5e_", encoding.toRfc3986EucJp("PQRSTUVWXYZ[\\]^_"))
        assert.equal("%60abcdefghijklmno", encoding.toRfc3986EucJp("`abcdefghijklmno"))
        assert.equal("pqrstuvwxyz%7b%7c%7d~", encoding.toRfc3986EucJp("pqrstuvwxyz{|}~"))
       
        assert.equal("%a5%a6%a5%a3%a5%ad%a5%da%a5%c7%a5%a3%a5%a2", encoding.toRfc3986EucJp("ウィキペディア"))
    })
    
    test("toRfc3986Utf8", () => {
        assert.equal("", encoding.toRfc3986Utf8(""))

        assert.equal("%3a%2f%3f%23%5b%5d%40%21%24%26%27%28%29%2a%2b%2c%3b%3d", encoding.toRfc3986Utf8(":/?#[]@!$&'()*+,;="))
        assert.equal("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSUTVWXYZ0123456789-._~",
                     encoding.toRfc3986Utf8("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSUTVWXYZ0123456789-._~"))
        assert.equal("%20%21%22%23%24%25%26%27%28%29%2a%2b%2c-.%2f", encoding.toRfc3986Utf8(" !\"#$%&'()*+,-./"))
        assert.equal("0123456789%3a%3b%3c%3d%3e%3f", encoding.toRfc3986Utf8("0123456789:;<=>?"))
        assert.equal("%40ABCDEFGHIJKLMNO", encoding.toRfc3986Utf8("@ABCDEFGHIJKLMNO"))
        assert.equal("PQRSTUVWXYZ%5b%5c%5d%5e_", encoding.toRfc3986Utf8("PQRSTUVWXYZ[\\]^_"))
        assert.equal("%60abcdefghijklmno", encoding.toRfc3986Utf8("`abcdefghijklmno"))
        assert.equal("pqrstuvwxyz%7b%7c%7d~", encoding.toRfc3986Utf8("pqrstuvwxyz{|}~"))
       
        assert.equal("%e3%82%a6%e3%82%a3%e3%82%ad%e3%83%9a%e3%83%87%e3%82%a3%e3%82%a2", encoding.toRfc3986Utf8("ウィキペディア"))
    })

    test("toRfc1866ShiftJis", () => {
        assert.equal("", encoding.toRfc1866ShiftJis(""))

        assert.equal("%3a%2f%3f%23%5b%5d%40%21%24%26%27%28%29%2a%2b%2c%3b%3d", encoding.toRfc1866ShiftJis(":/?#[]@!$&'()*+,;="))
        assert.equal("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSUTVWXYZ0123456789-._~",
                     encoding.toRfc1866ShiftJis("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSUTVWXYZ0123456789-._~"))
        assert.equal("+%21%22%23%24%25%26%27%28%29%2a%2b%2c-.%2f", encoding.toRfc1866ShiftJis(" !\"#$%&'()*+,-./"))
        assert.equal("0123456789%3a%3b%3c%3d%3e%3f", encoding.toRfc1866ShiftJis("0123456789:;<=>?"))
        assert.equal("%40ABCDEFGHIJKLMNO", encoding.toRfc1866ShiftJis("@ABCDEFGHIJKLMNO"))
        assert.equal("PQRSTUVWXYZ%5b%5c%5d%5e_", encoding.toRfc1866ShiftJis("PQRSTUVWXYZ[\\]^_"))
        assert.equal("%60abcdefghijklmno", encoding.toRfc1866ShiftJis("`abcdefghijklmno"))
        assert.equal("pqrstuvwxyz%7b%7c%7d~", encoding.toRfc1866ShiftJis("pqrstuvwxyz{|}~"))
       
        assert.equal("%83E%83B%83L%83y%83f%83B%83A", encoding.toRfc1866ShiftJis("ウィキペディア"))
    })

    test("toRfc1866EucJp", () => {
        assert.equal("", encoding.toRfc1866EucJp(""))

        assert.equal("%3a%2f%3f%23%5b%5d%40%21%24%26%27%28%29%2a%2b%2c%3b%3d", encoding.toRfc1866EucJp(":/?#[]@!$&'()*+,;="))
        assert.equal("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSUTVWXYZ0123456789-._~",
                     encoding.toRfc1866EucJp("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSUTVWXYZ0123456789-._~"))
        assert.equal("+%21%22%23%24%25%26%27%28%29%2a%2b%2c-.%2f", encoding.toRfc1866EucJp(" !\"#$%&'()*+,-./"))
        assert.equal("0123456789%3a%3b%3c%3d%3e%3f", encoding.toRfc1866EucJp("0123456789:;<=>?"))
        assert.equal("%40ABCDEFGHIJKLMNO", encoding.toRfc1866EucJp("@ABCDEFGHIJKLMNO"))
        assert.equal("PQRSTUVWXYZ%5b%5c%5d%5e_", encoding.toRfc1866EucJp("PQRSTUVWXYZ[\\]^_"))
        assert.equal("%60abcdefghijklmno", encoding.toRfc1866EucJp("`abcdefghijklmno"))
        assert.equal("pqrstuvwxyz%7b%7c%7d~", encoding.toRfc1866EucJp("pqrstuvwxyz{|}~"))
       
        assert.equal("%a5%a6%a5%a3%a5%ad%a5%da%a5%c7%a5%a3%a5%a2", encoding.toRfc1866EucJp("ウィキペディア"))
    })
    
    test("toRfc1866Utf8", () => {
        assert.equal("", encoding.toRfc1866Utf8(""))

        assert.equal("%3a%2f%3f%23%5b%5d%40%21%24%26%27%28%29%2a%2b%2c%3b%3d", encoding.toRfc1866Utf8(":/?#[]@!$&'()*+,;="))
        assert.equal("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSUTVWXYZ0123456789-._~",
                     encoding.toRfc1866Utf8("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSUTVWXYZ0123456789-._~"))
        assert.equal("+%21%22%23%24%25%26%27%28%29%2a%2b%2c-.%2f", encoding.toRfc1866Utf8(" !\"#$%&'()*+,-./"))
        assert.equal("0123456789%3a%3b%3c%3d%3e%3f", encoding.toRfc1866Utf8("0123456789:;<=>?"))
        assert.equal("%40ABCDEFGHIJKLMNO", encoding.toRfc1866Utf8("@ABCDEFGHIJKLMNO"))
        assert.equal("PQRSTUVWXYZ%5b%5c%5d%5e_", encoding.toRfc1866Utf8("PQRSTUVWXYZ[\\]^_"))
        assert.equal("%60abcdefghijklmno", encoding.toRfc1866Utf8("`abcdefghijklmno"))
        assert.equal("pqrstuvwxyz%7b%7c%7d~", encoding.toRfc1866Utf8("pqrstuvwxyz{|}~"))
       
        assert.equal("%e3%82%a6%e3%82%a3%e3%82%ad%e3%83%9a%e3%83%87%e3%82%a3%e3%82%a2", encoding.toRfc1866Utf8("ウィキペディア"))

        assert.equal("%f0%a0%ae%9f+%f0%a0%ae%9f", encoding.toRfc1866Utf8("\u{20b9f} 𠮟"))
        assert.equal("%f0%a9%b8%bd+%f0%a9%b8%bd", encoding.toRfc1866Utf8("\u{29e3d} 𩸽"))
    })
})
