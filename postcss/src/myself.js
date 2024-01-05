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