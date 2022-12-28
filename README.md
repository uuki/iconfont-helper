# iconfont-helper

style extension lib based on [svgtofont](https://github.com/jaywcjlove/svgtofont).

## 概要

svgtofontやその他iconfont generator系のライブラリから出力されるCSSに汎用mixinを追加するヘルパー

## 追加されるスタイル

### CSS Vars

```
:root {
  --{{prefix}}-{{iconName}}: {{code}}
  ...
}
```

### 基本スタイル（mixin用）

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

### icon Mixin

アイコン名、ポジション（before, after）を引数に取り、基本スタイル、@content とともに出力

```scss
@mixin icon($iconName, $position: before) {
	&:#{$position} {
    @include {{fontName}}-base-style;
    content: "#{map-get(${{fontName}}-icons, $iconName)}";
    @content;
	}
}
```
