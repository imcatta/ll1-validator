// Generated from grammarlang/grammarlang.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');
var grammarlangListener = require('./grammarlangListener').grammarlangListener;
var grammarFileName = "grammarlang.g4";


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\b \u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t\u0004",
    "\u0004\u0005\t\u0005\u0003\u0002\u0007\u0002\f\n\u0002\f\u0002\u000e",
    "\u0002\u000f\u000b\u0002\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0004\u0003\u0004\u0003\u0005",
    "\u0007\u0005\u001b\n\u0005\f\u0005\u000e\u0005\u001e\u000b\u0005\u0003",
    "\u0005\u0002\u0002\u0006\u0002\u0004\u0006\b\u0002\u0003\u0003\u0002",
    "\u0005\u0006\u0002\u001d\u0002\r\u0003\u0002\u0002\u0002\u0004\u0012",
    "\u0003\u0002\u0002\u0002\u0006\u0017\u0003\u0002\u0002\u0002\b\u001c",
    "\u0003\u0002\u0002\u0002\n\f\u0005\u0004\u0003\u0002\u000b\n\u0003\u0002",
    "\u0002\u0002\f\u000f\u0003\u0002\u0002\u0002\r\u000b\u0003\u0002\u0002",
    "\u0002\r\u000e\u0003\u0002\u0002\u0002\u000e\u0010\u0003\u0002\u0002",
    "\u0002\u000f\r\u0003\u0002\u0002\u0002\u0010\u0011\u0007\u0002\u0002",
    "\u0003\u0011\u0003\u0003\u0002\u0002\u0002\u0012\u0013\u0005\u0006\u0004",
    "\u0002\u0013\u0014\u0007\u0003\u0002\u0002\u0014\u0015\u0005\b\u0005",
    "\u0002\u0015\u0016\u0007\u0004\u0002\u0002\u0016\u0005\u0003\u0002\u0002",
    "\u0002\u0017\u0018\u0007\u0005\u0002\u0002\u0018\u0007\u0003\u0002\u0002",
    "\u0002\u0019\u001b\t\u0002\u0002\u0002\u001a\u0019\u0003\u0002\u0002",
    "\u0002\u001b\u001e\u0003\u0002\u0002\u0002\u001c\u001a\u0003\u0002\u0002",
    "\u0002\u001c\u001d\u0003\u0002\u0002\u0002\u001d\t\u0003\u0002\u0002",
    "\u0002\u001e\u001c\u0003\u0002\u0002\u0002\u0004\r\u001c"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'->'", "';'" ];

var symbolicNames = [ null, "ASSIGN", "SEMICOLON", "NONTERMINAL", "TERMINAL", 
                      "COMMENT", "WS" ];

var ruleNames =  [ "rulelist", "rule_", "l", "r" ];

function grammarlangParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

grammarlangParser.prototype = Object.create(antlr4.Parser.prototype);
grammarlangParser.prototype.constructor = grammarlangParser;

Object.defineProperty(grammarlangParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

grammarlangParser.EOF = antlr4.Token.EOF;
grammarlangParser.ASSIGN = 1;
grammarlangParser.SEMICOLON = 2;
grammarlangParser.NONTERMINAL = 3;
grammarlangParser.TERMINAL = 4;
grammarlangParser.COMMENT = 5;
grammarlangParser.WS = 6;

grammarlangParser.RULE_rulelist = 0;
grammarlangParser.RULE_rule_ = 1;
grammarlangParser.RULE_l = 2;
grammarlangParser.RULE_r = 3;


function RulelistContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = grammarlangParser.RULE_rulelist;
    return this;
}

RulelistContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
RulelistContext.prototype.constructor = RulelistContext;

RulelistContext.prototype.EOF = function() {
    return this.getToken(grammarlangParser.EOF, 0);
};

RulelistContext.prototype.rule_ = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(Rule_Context);
    } else {
        return this.getTypedRuleContext(Rule_Context,i);
    }
};

RulelistContext.prototype.enterRule = function(listener) {
    if(listener instanceof grammarlangListener ) {
        listener.enterRulelist(this);
	}
};

RulelistContext.prototype.exitRule = function(listener) {
    if(listener instanceof grammarlangListener ) {
        listener.exitRulelist(this);
	}
};




grammarlangParser.RulelistContext = RulelistContext;

grammarlangParser.prototype.rulelist = function() {

    var localctx = new RulelistContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, grammarlangParser.RULE_rulelist);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 11;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===grammarlangParser.NONTERMINAL) {
            this.state = 8;
            this.rule_();
            this.state = 13;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 14;
        this.match(grammarlangParser.EOF);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function Rule_Context(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = grammarlangParser.RULE_rule_;
    return this;
}

Rule_Context.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Rule_Context.prototype.constructor = Rule_Context;

Rule_Context.prototype.l = function() {
    return this.getTypedRuleContext(LContext,0);
};

Rule_Context.prototype.ASSIGN = function() {
    return this.getToken(grammarlangParser.ASSIGN, 0);
};

Rule_Context.prototype.r = function() {
    return this.getTypedRuleContext(RContext,0);
};

Rule_Context.prototype.SEMICOLON = function() {
    return this.getToken(grammarlangParser.SEMICOLON, 0);
};

Rule_Context.prototype.enterRule = function(listener) {
    if(listener instanceof grammarlangListener ) {
        listener.enterRule_(this);
	}
};

Rule_Context.prototype.exitRule = function(listener) {
    if(listener instanceof grammarlangListener ) {
        listener.exitRule_(this);
	}
};




grammarlangParser.Rule_Context = Rule_Context;

grammarlangParser.prototype.rule_ = function() {

    var localctx = new Rule_Context(this, this._ctx, this.state);
    this.enterRule(localctx, 2, grammarlangParser.RULE_rule_);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 16;
        this.l();
        this.state = 17;
        this.match(grammarlangParser.ASSIGN);
        this.state = 18;
        this.r();
        this.state = 19;
        this.match(grammarlangParser.SEMICOLON);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function LContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = grammarlangParser.RULE_l;
    return this;
}

LContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
LContext.prototype.constructor = LContext;

LContext.prototype.NONTERMINAL = function() {
    return this.getToken(grammarlangParser.NONTERMINAL, 0);
};

LContext.prototype.enterRule = function(listener) {
    if(listener instanceof grammarlangListener ) {
        listener.enterL(this);
	}
};

LContext.prototype.exitRule = function(listener) {
    if(listener instanceof grammarlangListener ) {
        listener.exitL(this);
	}
};




grammarlangParser.LContext = LContext;

grammarlangParser.prototype.l = function() {

    var localctx = new LContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, grammarlangParser.RULE_l);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 21;
        this.match(grammarlangParser.NONTERMINAL);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function RContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = grammarlangParser.RULE_r;
    return this;
}

RContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
RContext.prototype.constructor = RContext;

RContext.prototype.NONTERMINAL = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(grammarlangParser.NONTERMINAL);
    } else {
        return this.getToken(grammarlangParser.NONTERMINAL, i);
    }
};


RContext.prototype.TERMINAL = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(grammarlangParser.TERMINAL);
    } else {
        return this.getToken(grammarlangParser.TERMINAL, i);
    }
};


RContext.prototype.enterRule = function(listener) {
    if(listener instanceof grammarlangListener ) {
        listener.enterR(this);
	}
};

RContext.prototype.exitRule = function(listener) {
    if(listener instanceof grammarlangListener ) {
        listener.exitR(this);
	}
};




grammarlangParser.RContext = RContext;

grammarlangParser.prototype.r = function() {

    var localctx = new RContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, grammarlangParser.RULE_r);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 26;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===grammarlangParser.NONTERMINAL || _la===grammarlangParser.TERMINAL) {
            this.state = 23;
            _la = this._input.LA(1);
            if(!(_la===grammarlangParser.NONTERMINAL || _la===grammarlangParser.TERMINAL)) {
            this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            this.state = 28;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


exports.grammarlangParser = grammarlangParser;
