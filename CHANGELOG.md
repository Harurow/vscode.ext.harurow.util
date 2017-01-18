# Change Log
All notable changes to this "harurow-util" extension will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added
#### Numbering
複数カーソルの位置に連番で番号を採番します
- `Numbering to Multiple Cursors`

## [1.0.1] 2017-01-xx

### Added
#### Convert Word Case
選択中の文字列をのケースを変換します

- `ToPascalCase`  
    パスカルケース(PascalCase)へ変換します

- `toCamelCase`  
    キャメルケースへ(camelCase)変換します

- `TO_UPPER_SNAKE_CASE`  
    大文字のスネークケース(SNAKE_CASE)へ変換します

- `to_lower_snake_case`  
    小文字のスネークケース(snake_case)へ変換します

#### Remove Lines
選択中の行をフィルタンリングします
正規表現または単純な検索が条件として利用できます

- `Remove Line If Matched Regex`  
    正規表現に一致した行を削除します

- `Remove Line If Un-Matched Regex`  
    正規表現に一致する行は残し、そうでない行を削除します

- `Remove Line If Contains String`  
    入力文字が含まれる行を削除します

- `Remove Line If NOT Contains String`  
    入力文字が含まれる行は残し、そうではない行を削除します

#### Encode Text
選択中の文字列を % エンコーディングします  
スペースは
- URL Encodingは '%20'
- application/x-www-form-urlencodedは '+'  
へ変換します。  
日本語のエンコーディングについては ShiftJIS, EUC-JP, UTF-8のいずれかを選べます
- `To URL Encoding (RFC3986) / Shift_JIS`
- `To URL Encoding (RFC3986) / EUC-JP`
- `To URL Encoding (RFC3986) / UTF-8`
- `To application/x-www-form-urlencoded (RFC1866) / Shift_JIS`
- `To application/x-www-form-urlencoded (RFC1866) / EUC-JP`
- `To application/x-www-form-urlencoded (RFC1866) / UTF-8`  

#### Decode Text
選択中の % エンコーディングされた文字列をデコードし元へ戻します  
日本語のエンコーディングについては ShiftJIS, EUC-JP, UTF-8のいずれかを選べます  
コマンドは次の通りです
- `From URL Encoding, x-www-form-urlencoded (RFC3986, RFC1866) / Shift_JIS`
- `From URL Encoding, x-www-form-urlencoded (RFC3986, RFC1866) / EUC-JP`
- `From URL Encoding, x-www-form-urlencoded (RFC3986, RFC1866) / UTF-8`

#### Escape
エスケープ処理を実施します
- `HTML Escape`
- `HTML Escape All Charactors`
- `Unicode Escape`

#### Unescap
HTMLのエスケープされた文字を元に戻します
- `HTML Unescape`
- `Unicode Unescape`

