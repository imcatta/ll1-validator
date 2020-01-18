import test from 'ava';
const parser = require('../src/parser.js');
const errors = require('../src/errors');

test('simple case', t => {
    const input = `S -> a S;`
    t.deepEqual(parser.parseString(input), {
        grammar: {
            'S': [
                [
                    { type: parser.TERMINAL, value: 'a' },
                    { type: parser.NONTERMINAL, value: 'S' }
                ]
            ],
        },
        startSymbol: 'S',
        rulesNumber: 1,
        terminals: ['a'],
        nonTerminals: ['S'],
    });
});

test('simple case 2', t => {
    const input = `S => a S;`
    t.deepEqual(parser.parseString(input), {
        grammar: {
            'S': [
                [
                    { type: parser.TERMINAL, value: 'a' },
                    { type: parser.NONTERMINAL, value: 'S' }
                ]
            ],
        },
        startSymbol: 'S',
        rulesNumber: 1,
        terminals: ['a'],
        nonTerminals: ['S'],
    })
});

test('simple case with comments', t => {
    const input = `
    /* this is\n
    a multiline\n
    comment */\n
    \n
    S -> a S; // this is an inline comment`
    t.deepEqual(parser.parseString(input), {
        grammar: {
            'S': [
                [
                    { type: parser.TERMINAL, value: 'a' },
                    { type: parser.NONTERMINAL, value: 'S' }
                ]
            ],
        },
        startSymbol: 'S',
        rulesNumber: 1,
        terminals: ['a'],
        nonTerminals: ['S'],
    })
});

test('complex case', t => {
    const input = `
    S -> a D;
    S -> ;
    D -> b;
    `;
    t.deepEqual(parser.parseString(input), {
        grammar: {
            'S': [
                [
                    { type: parser.TERMINAL, value: 'a' },
                    { type: parser.NONTERMINAL, value: 'D' }
                ],
                []
            ],
            'D': [
                [
                    { type: parser.TERMINAL, value: 'b' }
                ]
            ],
        },
        startSymbol: 'S',
        rulesNumber: 3,
        terminals: ['a', 'b'],
        nonTerminals: ['D', 'S'],
    })
});

test('complex case 2', t => {
    const input = `
    s -> a d;
    s -> ;
    d -> b;
    `;
    t.deepEqual(parser.parseString(input), {
        grammar: {
            's': [
                [
                    { type: parser.TERMINAL, value: 'a' },
                    { type: parser.NONTERMINAL, value: 'd' }
                ],
                []
            ],
            'd': [
                [
                    { type: parser.TERMINAL, value: 'b' }
                ]
            ],
        },
        startSymbol: 's',
        rulesNumber: 3,
        terminals: ['a', 'b'],
        nonTerminals: ['d', 's'],
    })
});


test('custom start symbol case', t => {
    const input = `#start_symbol D; S -> a S; S -> ; D -> b S;`
    t.deepEqual(parser.parseString(input), {
        grammar: {
            'S': [
                [
                    { type: parser.TERMINAL, value: 'a' },
                    { type: parser.NONTERMINAL, value: 'S' }
                ],
                []
            ],
            'D': [
                [
                    { type: parser.TERMINAL, value: 'b' },
                    { type: parser.NONTERMINAL, value: 'S' }
                ],
            ]
        },
        startSymbol: 'D',
        rulesNumber: 3,
        terminals: ['a', 'b'],
        nonTerminals: ['D', 'S'],
    })
});

test('lexer error case 1', t => {
    const input = `#start_sybol D;\nS -> a S\n S -> ;\nD -> b S;\n`;
    const f = () => parser.parseString(input);
    t.throws(f, errors.LexerError);
});

test('parser error case 1', t => {
    const input = `#start_symbol D;\nS -> a S\n S -> ;\nD -> b S;\n`;
    const f = () => parser.parseString(input);
    t.throws(f, errors.ParserError);
});

test('parser error case 2', t => {
    const input = `S -> a S\n S -> ;\nD -> b S;\n /* unclosed comment`;
    const f = () => parser.parseString(input);
    t.throws(f, errors.ParserError);
});

test('parser error empty input', t => {
    const input = ``;
    const f = () => parser.parseString(input);
    t.throws(f, errors.ParserError);
});

test('parser error no rules input', t => {
    const input = `#start_symbol S;`;
    const f = () => parser.parseString(input);
    t.throws(f, errors.ParserError);
});

test('start symbol not found error', t => {
    const input = `
    #start_symbol P;
    S -> a D;
    S -> ;
    D -> b;
    `;
    const f = () => parser.parseString(input);
    t.throws(f, errors.StartSymbolNotFound);
});