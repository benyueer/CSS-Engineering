# PostCSS

## PostCSS是什么
PostCSS 是一个用于转换和处理 CSS 的工具，它通过插件系统提供了丰富的功能和扩展性。PostCSS 的目标是提供一种可扩展的方式来处理 CSS，以满足开发人员在编写样式时的各种需求。

PostCSS 的作用主要包括以下几个方面：

- 转换 CSS：PostCSS 可以解析 CSS，并通过插件链来转换 CSS 的结构和样式。它允许你在 CSS 中使用未来的 CSS 语法和特性，然后通过插件将其转换为当前浏览器支持的语法。
- 浏览器兼容性：PostCSS 插件可以根据需要自动添加浏览器前缀，以确保你的样式在各种浏览器中具有一致的表现。这消除了手动添加和维护浏览器前缀的繁琐过程，提高了开发效率。
- 代码优化：PostCSS 可以通过插件对 CSS 进行优化，例如删除未使用的样式、合并和压缩 CSS 规则、优化选择器等。这有助于减小 CSS 文件的大小，提高页面加载性能。
- 扩展功能：PostCSS 提供了丰富的插件生态系统，可以通过插件来添加额外的功能和扩展，例如自定义属性、嵌套规则、内联图片等。这使得开发人员可以根据项目需求自定义和扩展 CSS 的功能。

PostCSS 并没有直接替代以前的工具，而是为 CSS 处理提供了一种新的、可扩展的方式。它与传统的 CSS 预处理器（如 Less、Sass）和自动添加浏览器前缀的工具（如 Autoprefixer）相比具有更大的灵活性和可定制性。PostCSS 的插件系统使开发人员能够根据具体需求选择和配置功能，并将其集成到构建工具或开发流程中。

## PostCSS 的使用
### 安装
```sh
npm install postcss
```
在不同平台配合不同的包使用

### 配置
创建`postcss.config.js`
```js
module.exports = {
  "plugins": {   // 插件
    "autoprefixer": {},
    "postcss-plugin-example": {
      "option1": true,
      "option2": "value"
    }
  },
  "syntax": "postcss-scss",
  "parser": "sugarss",
  "stringifier": "custom-stringifier",
  "map": {
    "inline": true
  },
  "syntaxPlugins": [
    "postcss-plugin-syntax-example"
  ],
  "stringifierPlugins": [
    "postcss-plugin-stringifier-example"
  ]
}
```

以上是 PostCSS 的配置项，含义如下：
- plugins：用于定义要使用的 PostCSS 插件列表。每个插件可以是一个字符串，表示插件的名称，或者是一个对象，包含插件名称和相关配置。
- syntax：指定用于解析 CSS 的语法解析器。默认情况下，PostCSS 使用其内置的解析器，但你可以通过指定其他语法解析器来处理不同类型的 CSS，如 SCSS、SugarSS 等。
- parser：指定用于解析 CSS 的解析器。你可以选择不同的解析器，例如 postcss-scss 或 postcss-less，以处理相应类型的 CSS。
- stringifier：指定用于将 CSS 对象转换回字符串的字符串化器。默认情况下，PostCSS 使用其内置的字符串化器，但你可以通过指定其他字符串化器来自定义输出的格式。
- map：指定是否生成源映射文件以及源映射的类型。源映射文件可以帮助调试和定位样式问题。
- syntaxPlugins：用于定义要使用的语法解析器插件列表。这些插件可以自定义解析器的行为，例如添加额外的语法支持或解析器扩展。
- stringifierPlugins：用于定义要使用的字符串化器插件列表。这些插件可以自定义字符串化器的行为，例如添加自定义输出格式或样式处理。


### 使用
使用`postcss-cli`，创建好配置文件后使用命令：
```sh
npx postcss surce.css -o out.css --config postcss.config.js
```

使用 js API
编写js文件：
```js
const autoprefixer = require('autoprefixer')
const postcss = require('postcss')
const precss = require('precss')
const penv = require('postcss-preset-env')
const fs = require('fs')
const mysqlf = require('./myself')

fs.readFile('./src/test.less', (err, css) => {
  postcss([mysqlf(), precss, autoprefixer, penv()])
    .process(css, { from: './src/test.less', to: './out.css' })
    .then(result => {
      // console.log(result.css)
      fs.writeFile('./out.css', result.css, () => {})
      // if ( result.map ) fs.writeFile('dest/app.css.map', result.map)
    })
})
```

运行脚本后即可完成运行

### 插件
已有的插件可以查看[插件文档](https://www.postcss.parts/)

### 自定义插件
postcss 提供插件系统，我们可以自己定义一个插件
只需要返回一个符合规定的插件配置对象，即可作为一个插件
详见[文档](https://www.postcss.com.cn/docs/writing-a-postcss-plugin)
这里给出一个`acolor`的例子，虽然这个插件实际上并没有任何作用，但可以帮助我们理解怎么定义一个插件：
```js
module.exports = () => {

  const didRule = new Set()

  return {
    postcssPlugin: 'myself',

    Declaration(decl) {
      if (decl.prop === 'dcoler') {
        console.log(decl)
        decl.prop = 'color'
      }
    },

    AtRule: {
      '*': (atRule, { Rule, Node }) => {
        if (didRule.has(atRule) || atRule.name != 'acolor') return
        didRule.add(atRule)
        console.log(atRule)
        let newRule = new Rule({ selector: 'a', source: atRule.source })
        atRule.root().append(newRule)
        newRule.append({ prop: 'color', value: atRule.params })
        atRule.remove()
      }
    }
  }
}
module.exports.postcss = true
```

这个插件的作用是，碰到css中的`@acolor #333;`等类似的设置，会添加一个`a {color: #333;}`的样式
使用它：
jsAPI使用时将插件加到`postcss`的参数数组里
其他方式则在配置文件的插件数组里引入即可

这里是相关的[API文档](https://www.postcss.com.cn/api/)

## 项目中的应用
在项目中我们可能不需要进行过多的postcss配置，现在的打包工具基本上都已经集成了postcss，并且做好了配置，例如在vite中，预先定义了css-module等配置，也可以直接使用预处理器，他能选择的`css.transformer`只有`postcss`和`lightningcss`