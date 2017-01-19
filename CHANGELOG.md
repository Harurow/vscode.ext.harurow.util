# Change Log
All notable changes to this "harurow-util" extension will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
none

## [1.0.1] 2017-01-20

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

- `Remove Line If Contains String`  
入力文字が含まれる行を削除します

- `Remove Line If NOT Contains String`  
入力文字が含まれる行は残し、そうではない行を削除します

- `Remove Line If Matched Regex`  
正規表現に一致した行を削除します

- `Remove Line If Un-Matched Regex`  
正規表現に一致する行は残し、そうでない行を削除します


#### Encode Text
選択中の文字列を % エンコーディングします  

- RFC3986 は スペースを`%20`に
- RFC1866 は スペースを`+`に  
へ変換します。  

日本語のエンコーディングについては ShiftJIS, EUC-JP, UTF-8のいずれかを選べます
- `To Percent Encoding (RFC3986 ' ' => %20) / Shift_JIS`
- `To Percent Encoding (RFC3986 ' ' => %20) / EUC-JP`
- `To Percent Encoding (RFC3986 ' ' => %20) / UTF-8`  
- `To Percent Encoding (RFC1866 ' ' => +) / Shift_JIS`
- `To Percent Encoding (RFC1866 ' ' => +) / EUC-JP`
- `To Percent Encoding (RFC1866 ' ' => +) / UTF-8`  

#### Decode Text
選択中の % エンコーディングされた文字列をデコードし元へ戻します  
日本語のエンコーディングについては ShiftJIS, EUC-JP, UTF-8のいずれかを選べます  
- `From Percent Encoding (RFC3986, RFC1866) / Shift_JIS`
- `From Percent Encoding (RFC3986, RFC1866) / EUC-JP`
- `From Percent Encoding (RFC3986, RFC1866) / UTF-8`

#### Escape
エスケープ処理を実施します
- `To HTML Escape`
- `To HTML Escape All Charactors`
- `To Unicode Escape`
- `To Unicode Escape All Charactors`

#### Unescap
HTMLのエスケープされた文字を元に戻します
- `From HTML Escape`
- `From Unicode Eescape`

#### Selection
選択します
- `Select String`  
一致する文字列を選択します

- `Select If Matched Regex`  
正規表現に一致する文字列を選択します

#### Numbering
複数カーソルの位置に連番で番号を採番します
- `Insert Numbers to Multiple Cursors`  
範囲を複数選択しカーソルを複数設定してからこのコマンドを実行してください
入力エリアにはスペース区切りで数字を指定します  
start 以外は省略可能です  
start step?=1 radix?:[2|10|8|16]=10 len?=0

- start 最初の番号  
  省略不可
- step 増加する値  
  10進数で入力 マイナス可  
  省略した場合は1
- redix 番号のn進数を指定する  
  2, 10, 8, 16のいずれか  
  省略した場合は10
- len 長さ  
  全体の長さを指定し前ゼロを付加する  
  0を指定した場合は前ゼロを付加しない  
  省略した場合は0
