grammar grammarlang;

rulelist: start_symbol? rule_+ EOF;
start_symbol: START_SYMBOL_KEYWORD NONTERMINAL SEMICOLON;
rule_: l ASSIGN r SEMICOLON;
l: NONTERMINAL;
r: (NONTERMINAL | TERMINAL)*;

START_SYMBOL_KEYWORD: '_start_symbol';
ASSIGN: '->';
SEMICOLON: ';';
NONTERMINAL: ('A' ..'Z') ('A' ..'Z' | '0' ..'9')*;
TERMINAL: ('a' ..'z') ('a' ..'z' | '0' ..'9')*;

COMMENT: ( '//' ~[\r\n]* (('\r'? '\n') | EOF) | '/*' .*? '*/') -> skip;
WS: [ \r\n\t] -> skip;
