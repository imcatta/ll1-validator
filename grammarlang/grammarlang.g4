grammar grammarlang;

rulelist: start_symbol? rule_+ EOF;
start_symbol: START_SYMBOL_KEYWORD SYMBOL SEMICOLON;
rule_: l ASSIGN r SEMICOLON;
l: SYMBOL;
r: SYMBOL*;

START_SYMBOL_KEYWORD: '#start_symbol';
ASSIGN: '->' | '=>';
SEMICOLON: ';';
SYMBOL: ('A' ..'Z' | 'a' .. 'z' | '0' ..'9' | '_')+;
COMMENT: ('//' ~[\r\n]* (('\r'? '\n') | EOF) | '/*' .*? '*/') -> skip;
WS: [ \r\n\t] -> skip;
