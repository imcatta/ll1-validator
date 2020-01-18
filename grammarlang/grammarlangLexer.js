// Generated from grammarlang/grammarlang.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');



var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0002\bM\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002",
    "\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002",
    "\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0005\u0003\"\n\u0003\u0003\u0004\u0003\u0004\u0003\u0005\u0006\u0005",
    "\'\n\u0005\r\u0005\u000e\u0005(\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0007\u0006/\n\u0006\f\u0006\u000e\u00062\u000b\u0006\u0003",
    "\u0006\u0005\u00065\n\u0006\u0003\u0006\u0003\u0006\u0005\u00069\n\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0007\u0006?\n\u0006",
    "\f\u0006\u000e\u0006B\u000b\u0006\u0003\u0006\u0003\u0006\u0005\u0006",
    "F\n\u0006\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0003@\u0002\b\u0003\u0003\u0005\u0004\u0007\u0005\t\u0006",
    "\u000b\u0007\r\b\u0003\u0002\u0005\u0006\u00022;C\\aac|\u0004\u0002",
    "\f\f\u000f\u000f\u0005\u0002\u000b\f\u000f\u000f\"\"\u0002S\u0002\u0003",
    "\u0003\u0002\u0002\u0002\u0002\u0005\u0003\u0002\u0002\u0002\u0002\u0007",
    "\u0003\u0002\u0002\u0002\u0002\t\u0003\u0002\u0002\u0002\u0002\u000b",
    "\u0003\u0002\u0002\u0002\u0002\r\u0003\u0002\u0002\u0002\u0003\u000f",
    "\u0003\u0002\u0002\u0002\u0005!\u0003\u0002\u0002\u0002\u0007#\u0003",
    "\u0002\u0002\u0002\t&\u0003\u0002\u0002\u0002\u000bE\u0003\u0002\u0002",
    "\u0002\rI\u0003\u0002\u0002\u0002\u000f\u0010\u0007%\u0002\u0002\u0010",
    "\u0011\u0007u\u0002\u0002\u0011\u0012\u0007v\u0002\u0002\u0012\u0013",
    "\u0007c\u0002\u0002\u0013\u0014\u0007t\u0002\u0002\u0014\u0015\u0007",
    "v\u0002\u0002\u0015\u0016\u0007a\u0002\u0002\u0016\u0017\u0007u\u0002",
    "\u0002\u0017\u0018\u0007{\u0002\u0002\u0018\u0019\u0007o\u0002\u0002",
    "\u0019\u001a\u0007d\u0002\u0002\u001a\u001b\u0007q\u0002\u0002\u001b",
    "\u001c\u0007n\u0002\u0002\u001c\u0004\u0003\u0002\u0002\u0002\u001d",
    "\u001e\u0007/\u0002\u0002\u001e\"\u0007@\u0002\u0002\u001f \u0007?\u0002",
    "\u0002 \"\u0007@\u0002\u0002!\u001d\u0003\u0002\u0002\u0002!\u001f\u0003",
    "\u0002\u0002\u0002\"\u0006\u0003\u0002\u0002\u0002#$\u0007=\u0002\u0002",
    "$\b\u0003\u0002\u0002\u0002%\'\t\u0002\u0002\u0002&%\u0003\u0002\u0002",
    "\u0002\'(\u0003\u0002\u0002\u0002(&\u0003\u0002\u0002\u0002()\u0003",
    "\u0002\u0002\u0002)\n\u0003\u0002\u0002\u0002*+\u00071\u0002\u0002+",
    ",\u00071\u0002\u0002,0\u0003\u0002\u0002\u0002-/\n\u0003\u0002\u0002",
    ".-\u0003\u0002\u0002\u0002/2\u0003\u0002\u0002\u00020.\u0003\u0002\u0002",
    "\u000201\u0003\u0002\u0002\u000218\u0003\u0002\u0002\u000220\u0003\u0002",
    "\u0002\u000235\u0007\u000f\u0002\u000243\u0003\u0002\u0002\u000245\u0003",
    "\u0002\u0002\u000256\u0003\u0002\u0002\u000269\u0007\f\u0002\u00027",
    "9\u0007\u0002\u0002\u000384\u0003\u0002\u0002\u000287\u0003\u0002\u0002",
    "\u00029F\u0003\u0002\u0002\u0002:;\u00071\u0002\u0002;<\u0007,\u0002",
    "\u0002<@\u0003\u0002\u0002\u0002=?\u000b\u0002\u0002\u0002>=\u0003\u0002",
    "\u0002\u0002?B\u0003\u0002\u0002\u0002@A\u0003\u0002\u0002\u0002@>\u0003",
    "\u0002\u0002\u0002AC\u0003\u0002\u0002\u0002B@\u0003\u0002\u0002\u0002",
    "CD\u0007,\u0002\u0002DF\u00071\u0002\u0002E*\u0003\u0002\u0002\u0002",
    "E:\u0003\u0002\u0002\u0002FG\u0003\u0002\u0002\u0002GH\b\u0006\u0002",
    "\u0002H\f\u0003\u0002\u0002\u0002IJ\t\u0004\u0002\u0002JK\u0003\u0002",
    "\u0002\u0002KL\b\u0007\u0002\u0002L\u000e\u0003\u0002\u0002\u0002\n",
    "\u0002!(048@E\u0003\b\u0002\u0002"].join("");


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
grammarlangLexer.SYMBOL = 4;
grammarlangLexer.COMMENT = 5;
grammarlangLexer.WS = 6;

grammarlangLexer.prototype.channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];

grammarlangLexer.prototype.modeNames = [ "DEFAULT_MODE" ];

grammarlangLexer.prototype.literalNames = [ null, "'#start_symbol'", null, 
                                            "';'" ];

grammarlangLexer.prototype.symbolicNames = [ null, "START_SYMBOL_KEYWORD", 
                                             "ASSIGN", "SEMICOLON", "SYMBOL", 
                                             "COMMENT", "WS" ];

grammarlangLexer.prototype.ruleNames = [ "START_SYMBOL_KEYWORD", "ASSIGN", 
                                         "SEMICOLON", "SYMBOL", "COMMENT", 
                                         "WS" ];

grammarlangLexer.prototype.grammarFileName = "grammarlang.g4";



exports.grammarlangLexer = grammarlangLexer;

