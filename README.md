# Harurow Util README

[![Marketplace Version](https://vsmarketplacebadge.apphb.com/version/harurow.harurow-util.svg)](https://marketplace.visualstudio.com/items?itemName=harurow.harurow-util)
[![Build Status](https://dev.azure.com/motoharucamellia/vscode.ext.harurow.util/_apis/build/status/Harurow.vscode.ext.harurow.util?branchName=master)](https://dev.azure.com/motoharucamellia/vscode.ext.harurow.util/_build/latest?definitionId=1&branchName=master)
[![Build Status](https://travis-ci.com/Harurow/vscode.ext.harurow.util.svg?branch=master)](https://travis-ci.com/Harurow/vscode.ext.harurow.util)

## 特徴

自分でプログラムを書くときに利用する機能をVisualStudioCodeの拡張として提供しています
[Github](https://github.com/Harurow/vscode.ext.harurow.util)でソースも公開しています

## エクスプローラーの拡張

### `エクスプローラーから除外`

エクスプローラーからファイルまたはフォルダを非表示にする  
ワークスペースの設定で選択中のファイル・フォルダを非表示に設定します。

![エクスプローラーから除外](https://github.com/harurow/vscode.ext.harurow.util/blob/master/screenshots/fileExclude.excludeFile.gif?raw=true)

### `除外設定を一時的に解除` / `除外設定を元に戻す`

`除外設定を一時的に解除`はエクスプローラーの除外設定を退避してファイルまたはフォルダの非表示を解除します。

`除外設定を元に戻す`は`除外設定を一時的に解除`時に退避した設定を再度設定しファイルまたはフォルダの非表示を元に戻します。

![除外設定を一時的に解除 / 除外設定を元に戻す](https://github.com/harurow/vscode.ext.harurow.util/blob/master/screenshots/fileExclude.backup,restore.gif?raw=true)

### `.d.ts ファイルを作成`

エクスプローラーで選択した.jsファイルから.d.tsファイルを作成します。

![.d.ts ファイルを作成](https://github.com/harurow/vscode.ext.harurow.util/blob/master/screenshots/generator.generateDts.gif?raw=true)

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

![ケース変換関連](https://github.com/harurow/vscode.ext.harurow.util/blob/master/screenshots/transformCase.gif?raw=true)

### 行削除関連

#### `正規表現に一致する行を削除` (Harurow: remove lines where matches regular expression)

選択中の行のうち正規表現に一致する行を削除します  
正規表現入力で最後に`\i`を指定すると大文字小文字を区別しません

#### `正規表現に一致しない行を削除` (Harurow: remove lines where un-matches regular expression)

選択中の行のうち正規表現に一致しない行を削除します
正規表現入力で最後に`\i`を指定すると大文字小文字を区別しません

![行削除関連](https://github.com/harurow/vscode.ext.harurow.util/blob/master/screenshots/removeLines.gif?raw=true)

### エンコード, エスケープ関連

#### エンコード, エスケープ

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

#### デコード, アンエスケープ

* パーセントエンコード  
* HTML, XML エスケープ  
* UNICODE エスケープ

![エンコード, エスケープ関連](https://github.com/harurow/vscode.ext.harurow.util/blob/master/screenshots/encoding.gif?raw=true)

### その他

#### `正規表現に一致する箇所を選択する` (Harurow: Select where matches regex)

正規表現に一致した範囲を選択状態にする

#### 左右の入れ替え

左右の変数を入れ替えます

#### 日付・時刻の変換

ISO8601 と C# の形式を相互変換します

```2017-04-27T15:00:00.000Z``` ↔️ ```\/Date(1493305200000)\/```  
```2017-04-28T00:00:00.000+0900``` ↔️ ```\/Date(1493305200000+0900)\/```  
```2017-04-28T00:00:00.000-0900``` ↔️ ```\/Date(1493305200000-0900)\/```  

![日付・時刻の変換](https://github.com/harurow/vscode.ext.harurow.util/blob/master/screenshots/edit.convertDate.gif?raw=true)

#### `日付・時刻の挿入` (Harurow: insert date-time)

日付・時刻を挿入します  
moment.jsの書式を設定に指定できます。
また設定`harurow.edit.insertDate.format`に書式を指定することで選択リストをカスタマイズできます。
書式は以下を参考に[Moment.js](https://momentjs.com/docs/#/displaying/)

![日付・時刻の挿入](https://github.com/harurow/vscode.ext.harurow.util/blob/master/screenshots/edit.insertDate.gif?raw=true)

#### `重複行の削除` (Harurow: remove duplicate lines)

選択している行のうち重複している行を一つの行にします。

![重複行の削除](https://github.com/harurow/vscode.ext.harurow.util/blob/master/screenshots/edit.distinct.gif?raw=true)

#### `採番` (Harurow: numbering)

マルチカーソルに数値を採番します。

![採番](https://github.com/harurow/vscode.ext.harurow.util/blob/master/screenshots/edit.numbering.gif?raw=true)

#### `数式の評価` (Harurow: evaluate math expression)

数式の計算結果を求めます。
利用可能な数式は[Math-expression-evaluator](http://bugwheels94.github.io/math-expression-evaluator/)

![数式の評価](https://github.com/harurow/vscode.ext.harurow.util/blob/master/screenshots/edit.evaluate.gif?raw=true)

#### `辞書検索` (Harrow: consult a dictionary)

英和辞典を検索します。
辞書はパブリックドメインの辞書[ejdic-hand](https://kujirahand.com/web-tools/EJDictFreeDL.php)を利用しています。

![辞書検索](https://github.com/harurow/vscode.ext.harurow.util/blob/master/screenshots/edit.dictionary.gif?raw=true)

#### アクティブファイルをサイドバーに表示を無効化/有効化

開いているファイルを切り替えた時にエクスプローラー上でもアクティブにする設定を切り替えます

## エディタのデコレーション

### 全角スペース/ノーブレイクスペースのデコレーション

全角スペース/ノーブレイクスーペースを波線で囲みます。設定で有効・無効を切り替えられます。規定は有効です。

![空白のレンダリング拡張](https://github.com/harurow/vscode.ext.harurow.util/blob/master/screenshots/whitespace.gif?raw=true)

### デバッグログをコードの行に描画する

デバッグログ出力をコード行に描画します。2回以上実行される場合は、実行回数も描画します。規定では有効です。

### デバッグログの実行時間を計測する

指定のプレフィックスで出力されたデバッグログの時間を計測します。マウスオーバー時に表示されます。規定では有効です。
規定では `@>:`から始まるデバッグログと `@<:` で始まるデバッグログの間を計測します。それぞれ設定で変更可能です。

![デバッグログの拡張](https://github.com/harurow/vscode.ext.harurow.util/blob/master/screenshots/debuglog.gif?raw=true)

## Thank you

[Zenkaku](https://github.com/mosapride/vscode-zenkaku)  
[whitespace-plus](https://github.com/davidhouchin/whitespace-plus)  

## License

MIT
