class LexerError extends Error { }
class ParserError extends Error { }
class SemanticError extends Error {}
class StartSymbolNotFound extends ParserError { }

module.exports = Object.freeze({
    LexerError, ParserError, StartSymbolNotFound, SemanticError
});