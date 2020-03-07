# Harurow Util README

[![Build Status](https://travis-ci.org/Harurow/vscode.ext.harurow.util.svg?branch=master)](https://travis-ci.org/Harurow/vscode.ext.harurow.util)

## 特徴

自分でプログラムを書くときに利用する機能をVisualStudioCodeの拡張として提供しています
[Github](https://github.com/Harurow/vscode.ext.harurow.util)でソースも公開しています

## エクスプローラーの拡張

### `エクスプローラーから除外`

エクスプローラーからファイルまたはフォルダを非表示にする  
ワークスペースの設定で選択中のファイル・フォルダを非表示に設定します。

![エクスプローラーから除外](screenshots/fileExclude.excludeFile.gif)

### `除外設定を一時的に解除` / `除外設定を元に戻す`

`除外設定を一時的に解除`はエクスプローラーの除外設定を退避してファイルまたはフォルダの非表示を解除します。

`除外設定を元に戻す`は`除外設定を一時的に解除`時に退避した設定を再度設定しファイルまたはフォルダの非表示を元に戻します。

![除外設定を一時的に解除 / 除外設定を元に戻す](screenshots/fileExclude.backup,restore.gif)


## コマンドパレット

コマンドパレットからテキストエディタ用の拡張機能です

### ケース変換関連

#### `キャメルケース(大文字)に変換` (Harurow: Transform to UpperCamelCase)

選択中の文字列をキャメルケース(大文字)に変換します

#### `キャメルケース(小文字)に変換` (Harurow: Transform to lowerCamelCase)

選択中の文字列をキャメルケース(小文字)に変換します

#### `スネークケース(大文字)に変換` (Harurow: Transform to UPPER_SNAKE_CASE)

選択中の文字列をスネークケース(大文字)に変換します

#### `スネークケース(小文字)に変換` (Harurow: Transform to lower_snake_case)

選択中の文字列をスネークケース(小文字)に変換します

#### `チェインケース(大文字)に変換` (Harurow: Transform to UPPER-CHAIN-CASE)

選択中の文字列をチェインケース(大文字)に変換します

#### `チェインケース(小文字)に変換` (Harurow: Transform to lower-chain-case)

選択中の文字列をチェインケース(小文字)に変換します

![ケース変換関連](screenshots/transformCase.gif)

### 行削除関連

#### `正規表現に一致する行を削除` (Harurow: Remove lines if matched)

選択中の行のうち正規表現に一致する行を削除します  
正規表現入力で最後に\\iを指定すると大文字小文字を区別しません

#### `正規表現に一致しない行を削除` (Harurow: Remove lines if unmatched)

選択中の行のうち正規表現に一致しない行を削除します
正規表現入力で最後に\\iを指定すると大文字小文字を区別しません

![行削除関連](screenshots/removeLines.gif)


#### エンコード, エスケープ関連

##### エンコード, エスケープ
* パーセントエンコード  
  文字パーセントエンコーディングします。
  ASCII領域外の文字についてはUTF8,SHIF-JIS, EUC-JPから文字コードが選択できます
  * URL Standard (RFC3986) は スペース ➡️ `%20`
  * Web Form (RFC1866)  スペース ➡️ `+`

* HTML, XML エスケープ  
  HTML, XML用にエスケープします。
  * 実体文字参照 `&` ➡️ `&#x26;`
  * 数値文字参照 `&` ➡️ `&amp;`

* UNICODE エスケープ
  javascriptなどの `\uXXXXX` 形式でエスケープします

##### デコード, アンエスケープ
* パーセントエンコード  
* HTML, XML エスケープ  
* UNICODE エスケープ


#### その他

##### `正規表現に一致する文字列を選択` (Harurow: Select string if matched)

選択中の文字列のうち正規表現に一致する文字列を選択状態にします
正規表現入力で最後に\\iを指定すると大文字小文字を区別しません

##### 左右の入れ替え

左右の変数を入れ替えます

##### 日付・時刻の変換
ISO8601 と C# の形式を相互変換します

```2017-04-27T15:00:00.000Z``` ↔️ ```\/Date(1493305200000)\/```  
```2017-04-28T00:00:00.000+0900``` ↔️ ```\/Date(1493305200000+0900)\/```  
```2017-04-28T00:00:00.000-0900``` ↔️ ```\/Date(1493305200000-0900)\/```  

##### 日付・時刻の挿入
日付・時刻を挿入します  
moment.jsの書式を設定に指定できます
書式は以下を参考に
https://momentjs.com/docs/#/displaying/

##### 重複の削除
選択している行のうち重複している行を一つの行にします

##### 採番
マルチカーソルに数値を採番します

##### 数式の評価
数式の計算結果を求めます
利用可能な数式は以下
http://bugwheels94.github.io/math-expression-evaluator/

##### 辞書検索
英和辞典を検索

## Release Notes
省略

--------------------------------------------------------------------------------
