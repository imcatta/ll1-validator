import test from 'ava';
const parser = require('../src/parser.js');
const errors = require('../src/errors');
const warnings = require('../src/warnings');

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
        warnings: [],
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
        warnings: [],
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
        warnings: [],
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
        warnings: [],
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
        warnings: [],
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
        warnings: [],
    });
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

test('duplicated rule case 1', t => {
    const input = `
    S -> a;
    S -> a;
    `;
    t.deepEqual(parser.parseString(input), {
        grammar: {
            'S': [
                [
                    { type: parser.TERMINAL, value: 'a' }
                ],
                [
                    { type: parser.TERMINAL, value: 'a' }
                ],
            ],
        },
        startSymbol: 'S',
        rulesNumber: 2,
        terminals: ['a'],
        nonTerminals: ['S'],
        warnings: [new warnings.DuplicatedRuleWarning('S', 1)],
    });
});

test('duplicated rule case 2', t => {
    const input = `
    S -> a A;
    S -> ;
    S -> a A;
    S -> a A;
    A -> b;
    `;
    t.deepEqual(parser.parseString(input), {
        grammar: {
            'S': [
                [
                    { type: parser.TERMINAL, value: 'a' },
                    { type: parser.NONTERMINAL, value: 'A' }
                ],
                [],
                [
                    { type: parser.TERMINAL, value: 'a' },
                    { type: parser.NONTERMINAL, value: 'A' }
                ],
                [
                    { type: parser.TERMINAL, value: 'a' },
                    { type: parser.NONTERMINAL, value: 'A' }
                ],
            ],
            'A': [
                [{ type: parser.TERMINAL, value: 'b' }]
            ]
        },
        startSymbol: 'S',
        rulesNumber: 5,
        terminals: ['a', 'b'],
        nonTerminals: ['A', 'S'],
        warnings: [
            new warnings.DuplicatedRuleWarning('S', 2),
            new warnings.DuplicatedRuleWarning('S', 3),
        ],
    });
});

test('duplicated rule case 3', t => {
    const input = `
    S -> A;
    A -> a;
    A -> a;
    `;
    t.deepEqual(parser.parseString(input), {
        grammar: {
            'S': [
                [
                    { type: parser.NONTERMINAL, value: 'A' }
                ],
            ],
            'A': [
                [{ type: parser.TERMINAL, value: 'a' }],
                [{ type: parser.TERMINAL, value: 'a' }],
            ],
        },
        startSymbol: 'S',
        rulesNumber: 3,
        terminals: ['a'],
        nonTerminals: ['A', 'S'],
        warnings: [new warnings.DuplicatedRuleWarning('A', 1)],
    });
});

test('unused rules case 1', t => {
    const input = `
    S -> ;
    A -> a;
    `;
    t.deepEqual(parser.parseString(input), {
        grammar: {
            'S': [[]],
            'A': [
                [{ type: parser.TERMINAL, value: 'a' }],
            ],
        },
        startSymbol: 'S',
        rulesNumber: 2,
        terminals: ['a'],
        nonTerminals: ['A', 'S'],
        warnings: [new warnings.UnreachableRuleWarning('A')],
    });
});

test('unused rules case 2', t => {
    const input = `
    S -> A S;
    A -> B C;
    B -> b;
    C -> c;
    D -> d;
    `;
    t.deepEqual(parser.parseString(input), {
        grammar: {
            'S': [
                [
                    { type: parser.NONTERMINAL, value: 'A' },
                    { type: parser.NONTERMINAL, value: 'S' }
                ]
            ],
            'A': [
                [
                    { type: parser.NONTERMINAL, value: 'B' },
                    { type: parser.NONTERMINAL, value: 'C' }
                ]
            ],
            'B': [
                [{ type: parser.TERMINAL, value: 'b' }],
            ],
            'C': [
                [{ type: parser.TERMINAL, value: 'c' }],
            ],
            'D': [
                [{ type: parser.TERMINAL, value: 'd' }],
            ],
        },
        startSymbol: 'S',
        rulesNumber: 5,
        terminals: ['b', 'c', 'd'],
        nonTerminals: ['A', 'B', 'C', 'D', 'S'],
        warnings: [new warnings.UnreachableRuleWarning('D')],
    });
});

test('unused rules case 3', t => {
    const input = `
    S -> A B;
    A -> ;
    B -> C S;
    B -> ;
    C -> ;
    D -> A;
    E -> ;
    `;
    t.deepEqual(parser.parseString(input), {
        grammar: {
            'S': [
                [
                    { type: parser.NONTERMINAL, value: 'A' },
                    { type: parser.NONTERMINAL, value: 'B' }
                ]
            ],
            'A': [[]],
            'B': [
                [
                    { type: parser.NONTERMINAL, value: 'C' },
                    { type: parser.NONTERMINAL, value: 'S' }
                ],
                []
            ],
            'C': [[]],
            'D': [[{ type: parser.NONTERMINAL, value: 'A' }]],
            'E': [[]]
        },
        startSymbol: 'S',
        rulesNumber: 7,
        terminals: [],
        nonTerminals: ['A', 'B', 'C', 'D', 'E', 'S'],
        warnings: [
            new warnings.UnreachableRuleWarning('D'),
            new warnings.UnreachableRuleWarning('E'),
        ],
    });
});