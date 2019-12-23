const antlr4 = require('antlr4');
const GrammarlangLexer = require('../grammarlang/grammarlangLexer').grammarlangLexer;
const GrammarlangParser = require('../grammarlang/grammarlangParser').grammarlangParser;


class Visitor {
  visitChildren(ctx) {
    return this.visitRuleList(ctx);
  }

  visitRuleList(ctx) {
    console.assert(ctx && ctx.children);

    const rules = [];
    ctx.children.forEach(child => {
      if (child.constructor.name === 'Rule_Context') {
        rules.push(this.visitRule(child))
      }
    });
    
    const result = {};
    rules.forEach(rule => {
      const tmp = result[rule.l] || [];
      tmp.push(rule.r);
      result[rule.l] = tmp;
    });
    return result;
  }

  visitRule(ctx) {
    if (!ctx || !ctx.children) {
      return null;
    }

    let l;
    let r = [];
    ctx.children.forEach(element => {
      if (element.constructor.name === 'LContext') {
        l = this.visitL(element);
      } else if (element.constructor.name === 'RContext' && element.children) {
        r = this.visitR(element);
      }
    });
    return { l: l, r: r };
  }

  visitL(ctx) {
    return ctx.children[0].getText();
  }

  visitR(ctx) {
    if (!ctx || !ctx.children) {
      return [];
    }

    return ctx.children.map(child => ({
      type: child.symbol.type,
      value: child.getText()
    }));
  }
}

module.exports = function (input) {
  const chars = new antlr4.InputStream(input);
  const lexer = new GrammarlangLexer(chars);
  const tokens = new antlr4.CommonTokenStream(lexer);
  const parser = new GrammarlangParser(tokens);
  parser.buildParseTrees = true;
  const tree = parser.rulelist();
  return tree.accept(new Visitor());
}
