grammar grammarlang;

rulelist: rule_* EOF;
rule_: l ASSIGN r SEMICOLON;
l: NONTERMINAL;
r: (NONTERMINAL | TERMINAL)*;

ASSIGN: '->';
SEMICOLON: ';';
NONTERMINAL: ('A' ..'Z') ('A' ..'Z' | '0' ..'9')*;
TERMINAL: ('a' ..'z') ('a' ..'z' | '0' ..'9')*;

COMMENT: ( '//' ~[\r\n]* (('\r'? '\n') | EOF) | '/*' .*? '*/') -> skip;
WS: [ \r\n\t] -> skip;
