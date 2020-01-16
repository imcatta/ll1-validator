const antlr4 = require('antlr4');
const GrammarlangLexer = require('../grammarlang/grammarlangLexer').grammarlangLexer;
const GrammarlangParser = require('../grammarlang/grammarlangParser').grammarlangParser;
const errors = require('./errors');

class Visitor {
  visitChildren(ctx) {
    return this.visitRuleList(ctx);
  }

  visitRuleList(ctx) {
    const rules = [];
    let _start_symbol = 'S';
    ctx.children.forEach(child => {
      if (child.constructor.name === 'Rule_Context') {
        rules.push(this.visitRule(child))
      } else if (child.constructor.name === 'Start_symbolContext') {
        _start_symbol = this.visitStartSymbol(child);
      }
    });

    const result = { _start_symbol };
    rules.forEach(rule => {
      const tmp = result[rule.l] || [];
      tmp.push(rule.r);
      result[rule.l] = tmp;
    });
    return result;
  }

  visitStartSymbol(ctx) {
    return ctx.children
      .find(child => child.symbol.type === GrammarlangParser.NONTERMINAL)
      .getText();
  }

  visitRule(ctx) {
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
    return ctx.children.map(child => ({
      type: child.symbol.type,
      value: child.getText()
    }));
  }
}

class LexerErrorListener extends antlr4.error.ErrorListener {
  syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
    throw new errors.LexerError(`[${line}:${column}] ${msg}`);
  }
}
class ParserErrorListener extends antlr4.error.ErrorListener {
  syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
    throw new errors.ParserError(`[${line}:${column}] ${msg}`);
  }
}

module.exports.parseString = function (input) {
  const chars = new antlr4.InputStream(input);

  const lexer = new GrammarlangLexer(chars);
  lexer.removeErrorListeners();
  lexer.addErrorListener(new LexerErrorListener());

  const tokens = new antlr4.CommonTokenStream(lexer);
  const parser = new GrammarlangParser(tokens);
  parser.removeErrorListeners();
  parser.addErrorListener(new ParserErrorListener());

  parser.buildParseTrees = true;
  const tree = parser.rulelist();
  return tree.accept(new Visitor());
}
