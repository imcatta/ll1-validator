// Generated from grammarlang/grammarlang.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by grammarlangParser.
function grammarlangListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

grammarlangListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
grammarlangListener.prototype.constructor = grammarlangListener;

// Enter a parse tree produced by grammarlangParser#rulelist.
grammarlangListener.prototype.enterRulelist = function(ctx) {
};

// Exit a parse tree produced by grammarlangParser#rulelist.
grammarlangListener.prototype.exitRulelist = function(ctx) {
};


// Enter a parse tree produced by grammarlangParser#rule_.
grammarlangListener.prototype.enterRule_ = function(ctx) {
};

// Exit a parse tree produced by grammarlangParser#rule_.
grammarlangListener.prototype.exitRule_ = function(ctx) {
};


// Enter a parse tree produced by grammarlangParser#l.
grammarlangListener.prototype.enterL = function(ctx) {
};

// Exit a parse tree produced by grammarlangParser#l.
grammarlangListener.prototype.exitL = function(ctx) {
};


// Enter a parse tree produced by grammarlangParser#r.
grammarlangListener.prototype.enterR = function(ctx) {
};

// Exit a parse tree produced by grammarlangParser#r.
grammarlangListener.prototype.exitR = function(ctx) {
};



exports.grammarlangListener = grammarlangListener;