# Change Log
All notable changes to this "harurow-util" extension will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

### [1.3.0] 2017-xx-xx
日付の変換機能を追加

## [1.2.3] 2017-04-18
変数の左右入れ替えの機能を拡張
終端が','でも入れ替えられるように対応した

## [1.2.2] 2017-04-17
- テストケースの追加と修正

## [1.2.1] 2017-04-14
- テストケースの最適化

## [1.2.0] 2017-04-11
- 正規表現選択で大文字小文字の無視を追加
- リファクタリング
- Travis Ci, codecov 対応

## [1.1.2] 2017-02-28
### Changed
- readme.mdを修正
  プレビューの画像を圧縮

## [1.1.1] 2017-01-26
### Changed
- package.jsonを修正
  リポジトリへのリンクを正しくした

## [1.1.0] 2017-01-25
### Added
#### Leftside Right
左右の変数を入れ替える機能を追加
- `Leftside Right`

## [1.0.3] 2017-01-21

### Added
#### Convert Word Case
選択中の文字列をのケースを変換します
- `ToPascalCase`  
- `toCamelCase`  
- `TO_UPPER_SNAKE_CASE`  
- `to_lower_snake_case`  

#### Remove Lines
選択中の行をフィルタンリングします
正規表現または単純な検索が条件として利用できます
- `Remove Line If Contains String`  
- `Remove Line If NOT Contains String`  
- `Remove Line If Matched Regex`  
- `Remove Line If Un-Matched Regex`  

#### Encode Text
選択中の文字列を % エンコーディングします  
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
正規表現または指定した文字に一致する範囲を選択します
- `Select String`  
- `Select If Matched Regex`  

#### Numbering
複数カーソルの位置に連番で番号を採番します
- `Insert Numbers to Multiple Cursors`  
