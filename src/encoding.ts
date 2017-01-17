'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as encja from 'encoding-japanese';

function isUnReservedChar(c: number): boolean {
    return 0x41 <= c && c <= 0x5A   // A-Z
        || 0x61 <= c && c <= 0x7A   // a-z
        || 0x30 <= c && c <= 0x39   // 0-9
        || c == 0x2D                // -
        || c == 0x2E                // .
        || c == 0x5F                // _
        || c == 0x7E                // ~
        ;
}

function hex(c: number) : string {
    return "%" + ("0" + c.toString(16)).slice(-2);
}

function encode(value: string, sp: string, enc:(ch: string) => string): string {
    var result = "";

    value.split('').forEach(ch => {
        let c = ch.charCodeAt(0);
        if (c <= 0xff) {
            if (isUnReservedChar(c)) {
                result += ch;
            } else if (c == 0x20) {
                result += sp;
            } else {
                result += hex(c);;
            }
        } else {
            result += enc(ch);
        }
    });

    return result;
}

function decode(value: string, encoding): string {
    return encja.codeToString(encja.convert(encja.urlDecode(value), "UNICODE", encoding));
}

function encodeUnicode(ch: string, encoding: string) {
    var result = "";
    var arr = [];
    arr.push(ch.charCodeAt(0));

    encja.convert(arr, encoding, "UNICODE").forEach((c) => {
        result += isUnReservedChar(c)
            ? String.fromCharCode(c)
            : hex(c);
    });

    return result;
}

function encShiftJis(ch: string): string {
    return encodeUnicode(ch, "SJIS");
}

function encEucJp(ch: string): string {
    return encodeUnicode(ch, "EucJp");
}

function encUtf8(ch: string): string {
    return encodeUnicode(ch, "UTF8");
}

export function toRfc3986ShiftJis(value: string): string {
    return encode(value, "%20", encShiftJis);
}

export function toRfc3986EucJp(value: string): string {
    return encode(value, "%20", encEucJp);
}

export function toRfc3986Utf8(value: string): string {
    return encode(value, "%20", encUtf8);
}

export function toRfc1866ShiftJis(value: string): string {
    return encode(value, "+", encShiftJis);
}

export function toRfc1866EucJp(value: string): string {
    return encode(value, "+", encEucJp);
}

export function toRfc1866Utf8(value: string): string {
    return encode(value, "+", encUtf8);
}

export function fromRfc3986ShiftJis(value: string): string {
    return decode(value, "SJIS");
}

export function fromRfc3986EucJp(value: string): string {
    return decode(value, "EUCJP");
}

export function fromRfc3986Utf8(value: string): string {
    return decode(value, "UTF8");
}

export function fromRfc1866ShiftJis(value: string): string {
    return decode(value.replace("+", " "), "SJIS");
}

export function fromRfc1866EucJp(value: string): string {
    return decode(value.replace("+", " "), "EUCJP");
}

export function fromRfc1866Utf8(value: string): string {
    return decode(value.replace("+", " "), "UTF8");
}

export function toBase64Url(value: string): string {
    return value.replace("+", "-")
                .replace("/", "_");
}

export function toBase64(value: string): string {
    return value.replace("-", "+")
                .replace("_", "/");
}
