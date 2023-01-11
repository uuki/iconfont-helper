# iconfont-helper

style extension lib based on [svgtofont](https://github.com/jaywcjlove/svgtofont).

## 概要

svgtofont やその他 iconfont generator 系のライブラリから出力されるCSSに対し汎用的な CSS Vars及び mixin を追加するヘルパー

## 使い方

**Step 1.**

```js
import iconfontHelper from 'iconfont-helper';
```

**Step 2.**

```js
// 上記に何らかのアイコンフォント生成処理があるとする
// ...
await iconfontHelper({
  src: path.resolve(process.cwd(), dist, fontName + '.css'), // 既にビルド済のアイコンフォントのCSS場所
  dist: path.resolve(process.cwd(), dist), // ヘルパーCSSの出力先
  // 以下はオプション（それぞれデフォルト値）
  fontName: "iconfont", // フォント名（font-familyに使用）
  fileName: "iconfont-helper", // ヘルパーCSSのファイル名
  classNamePrefix: "iconfont", // 変数のプレフィックス
});
```

## 追加されるスタイル

### CSS Vars

```
:root {
  --{{prefix}}-{{iconName}}: {{code}}
  ...
}
```

### Basic style for mixin

```scss
@mixin {{fontName}}-base-style {
	display: inline-block;
	font-family: '{{fontName}}';
	font-weight: normal;
  text-transform: none;
	line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
```

### icon mixin

アイコン名、ポジション（before, after）を引数に取り、基本スタイル、@content とともに出力

#### for css (vanilla)

**Step 1.**

```css
@import 'path/to/dist/_{{filename}}.css';
```

**Step 2.**

```css
// e.g.
.foo-style::before {
  content: var(--{{prefix}}-arrow);
}
```

#### for sass

**Step 1.**

```scss
@use 'path/to/dist/_{{filename}}.scss';
```

**Step 2.**

```scss
// e.g.
@include icon('arrow');
// or
@include icon('arrow', 'after') {
  color: #333;
  ...
};
```

#### for postcss-mixin

***Required plugins**  
- [postcss](https://github.com/postcss/postcss)
- [postcss-mixins](https://github.com/postcss/postcss-mixins)
- [postcss-map-get](https://github.com/Scrum/postcss-map-get)
- [postcss-simple-vars](https://github.com/postcss/postcss-simple-vars)

```shell
yarn add -D postcss postcss-mixins postcss-map-get postcss-simple-vars
```

**Step 1.**

```css
/* When using postcss-import */
@import 'path/to/dist/_{{filename}}.postcss';
```

**Step 2.**

```css
/* e.g. */
@mixin icon arrow;
/* or */
@mixin icon arrow, after {
  color: #333;
  ...
};
```
