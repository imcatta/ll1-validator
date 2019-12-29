// Generated from grammarlang/grammarlang.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');



var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0002\tU\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002",
    "\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002",
    "\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0007\u0005\'\n\u0005",
    "\f\u0005\u000e\u0005*\u000b\u0005\u0003\u0006\u0003\u0006\u0007\u0006",
    ".\n\u0006\f\u0006\u000e\u00061\u000b\u0006\u0003\u0007\u0003\u0007\u0003",
    "\u0007\u0003\u0007\u0007\u00077\n\u0007\f\u0007\u000e\u0007:\u000b\u0007",
    "\u0003\u0007\u0005\u0007=\n\u0007\u0003\u0007\u0003\u0007\u0005\u0007",
    "A\n\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0007\u0007",
    "G\n\u0007\f\u0007\u000e\u0007J\u000b\u0007\u0003\u0007\u0003\u0007\u0005",
    "\u0007N\n\u0007\u0003\u0007\u0003\u0007\u0003\b\u0003\b\u0003\b\u0003",
    "\b\u0003H\u0002\t\u0003\u0003\u0005\u0004\u0007\u0005\t\u0006\u000b",
    "\u0007\r\b\u000f\t\u0003\u0002\u0006\u0004\u00022;C\\\u0004\u00022;",
    "c|\u0004\u0002\f\f\u000f\u000f\u0005\u0002\u000b\f\u000f\u000f\"\"\u0002",
    "[\u0002\u0003\u0003\u0002\u0002\u0002\u0002\u0005\u0003\u0002\u0002",
    "\u0002\u0002\u0007\u0003\u0002\u0002\u0002\u0002\t\u0003\u0002\u0002",
    "\u0002\u0002\u000b\u0003\u0002\u0002\u0002\u0002\r\u0003\u0002\u0002",
    "\u0002\u0002\u000f\u0003\u0002\u0002\u0002\u0003\u0011\u0003\u0002\u0002",
    "\u0002\u0005\u001f\u0003\u0002\u0002\u0002\u0007\"\u0003\u0002\u0002",
    "\u0002\t$\u0003\u0002\u0002\u0002\u000b+\u0003\u0002\u0002\u0002\rM",
    "\u0003\u0002\u0002\u0002\u000fQ\u0003\u0002\u0002\u0002\u0011\u0012",
    "\u0007a\u0002\u0002\u0012\u0013\u0007u\u0002\u0002\u0013\u0014\u0007",
    "v\u0002\u0002\u0014\u0015\u0007c\u0002\u0002\u0015\u0016\u0007t\u0002",
    "\u0002\u0016\u0017\u0007v\u0002\u0002\u0017\u0018\u0007a\u0002\u0002",
    "\u0018\u0019\u0007u\u0002\u0002\u0019\u001a\u0007{\u0002\u0002\u001a",
    "\u001b\u0007o\u0002\u0002\u001b\u001c\u0007d\u0002\u0002\u001c\u001d",
    "\u0007q\u0002\u0002\u001d\u001e\u0007n\u0002\u0002\u001e\u0004\u0003",
    "\u0002\u0002\u0002\u001f \u0007/\u0002\u0002 !\u0007@\u0002\u0002!\u0006",
    "\u0003\u0002\u0002\u0002\"#\u0007=\u0002\u0002#\b\u0003\u0002\u0002",
    "\u0002$(\u0004C\\\u0002%\'\t\u0002\u0002\u0002&%\u0003\u0002\u0002\u0002",
    "\'*\u0003\u0002\u0002\u0002(&\u0003\u0002\u0002\u0002()\u0003\u0002",
    "\u0002\u0002)\n\u0003\u0002\u0002\u0002*(\u0003\u0002\u0002\u0002+/",
    "\u0004c|\u0002,.\t\u0003\u0002\u0002-,\u0003\u0002\u0002\u0002.1\u0003",
    "\u0002\u0002\u0002/-\u0003\u0002\u0002\u0002/0\u0003\u0002\u0002\u0002",
    "0\f\u0003\u0002\u0002\u00021/\u0003\u0002\u0002\u000223\u00071\u0002",
    "\u000234\u00071\u0002\u000248\u0003\u0002\u0002\u000257\n\u0004\u0002",
    "\u000265\u0003\u0002\u0002\u00027:\u0003\u0002\u0002\u000286\u0003\u0002",
    "\u0002\u000289\u0003\u0002\u0002\u00029@\u0003\u0002\u0002\u0002:8\u0003",
    "\u0002\u0002\u0002;=\u0007\u000f\u0002\u0002<;\u0003\u0002\u0002\u0002",
    "<=\u0003\u0002\u0002\u0002=>\u0003\u0002\u0002\u0002>A\u0007\f\u0002",
    "\u0002?A\u0007\u0002\u0002\u0003@<\u0003\u0002\u0002\u0002@?\u0003\u0002",
    "\u0002\u0002AN\u0003\u0002\u0002\u0002BC\u00071\u0002\u0002CD\u0007",
    ",\u0002\u0002DH\u0003\u0002\u0002\u0002EG\u000b\u0002\u0002\u0002FE",
    "\u0003\u0002\u0002\u0002GJ\u0003\u0002\u0002\u0002HI\u0003\u0002\u0002",
    "\u0002HF\u0003\u0002\u0002\u0002IK\u0003\u0002\u0002\u0002JH\u0003\u0002",
    "\u0002\u0002KL\u0007,\u0002\u0002LN\u00071\u0002\u0002M2\u0003\u0002",
    "\u0002\u0002MB\u0003\u0002\u0002\u0002NO\u0003\u0002\u0002\u0002OP\b",
    "\u0007\u0002\u0002P\u000e\u0003\u0002\u0002\u0002QR\t\u0005\u0002\u0002",
    "RS\u0003\u0002\u0002\u0002ST\b\b\u0002\u0002T\u0010\u0003\u0002\u0002",
    "\u0002\n\u0002(/8<@HM\u0003\b\u0002\u0002"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

function grammarlangLexer(input) {
	antlr4.Lexer.call(this, input);
    this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
    return this;
}

grammarlangLexer.prototype = Object.create(antlr4.Lexer.prototype);
grammarlangLexer.prototype.constructor = grammarlangLexer;

Object.defineProperty(grammarlangLexer.prototype, "atn", {
        get : function() {
                return atn;
        }
});

grammarlangLexer.EOF = antlr4.Token.EOF;
grammarlangLexer.START_SYMBOL_KEYWORD = 1;
grammarlangLexer.ASSIGN = 2;
grammarlangLexer.SEMICOLON = 3;
grammarlangLexer.NONTERMINAL = 4;
grammarlangLexer.TERMINAL = 5;
grammarlangLexer.COMMENT = 6;
grammarlangLexer.WS = 7;

grammarlangLexer.prototype.channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];

grammarlangLexer.prototype.modeNames = [ "DEFAULT_MODE" ];

grammarlangLexer.prototype.literalNames = [ null, "'_start_symbol'", "'->'", 
                                            "';'" ];

grammarlangLexer.prototype.symbolicNames = [ null, "START_SYMBOL_KEYWORD", 
                                             "ASSIGN", "SEMICOLON", "NONTERMINAL", 
                                             "TERMINAL", "COMMENT", "WS" ];

grammarlangLexer.prototype.ruleNames = [ "START_SYMBOL_KEYWORD", "ASSIGN", 
                                         "SEMICOLON", "NONTERMINAL", "TERMINAL", 
                                         "COMMENT", "WS" ];

grammarlangLexer.prototype.grammarFileName = "grammarlang.g4";



exports.grammarlangLexer = grammarlangLexer;

