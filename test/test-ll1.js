import test from 'ava';
const GrammarlangLexer = require('../grammarlang/grammarlangLexer').grammarlangLexer;
const ll1 = require('../src/ll1');

test('calculate nullables case 1', t => {
    const grammar = {
        'S': [
            [
                { type: GrammarlangLexer.TERMINAL, value: 'a' },
                { type: GrammarlangLexer.NONTERMINAL, value: 'S' }
            ]
        ]
    };
    t.deepEqual(ll1.calculateNullables(grammar), {
        nullableRules: { S: [false] },
        nullableNonTerminals: { S: false }
    });
});


test('calculate nullables case 2', t => {
    const grammar = {
        'S': [
            [
                { type: GrammarlangLexer.TERMINAL, value: 'a' },
                { type: GrammarlangLexer.NONTERMINAL, value: 'S' }
            ],
            []
        ]
    };
    t.deepEqual(ll1.calculateNullables(grammar), {
        nullableRules: { S: [false, true] },
        nullableNonTerminals: { S: true }
    });
});


test('calculate nullables case 3', t => {
    const grammar = {
        'S': [
            [{ type: GrammarlangLexer.NONTERMINAL, value: 'D' }]
        ],
        'D': [
            []
        ]
    };
    t.deepEqual(ll1.calculateNullables(grammar), {
        nullableRules: { S: [true], D: [true] },
        nullableNonTerminals: { S: true, D: true }
    });
});

test('calculate nullables case 4', t => {
    const grammar = {
        'S': [
            [
                { type: GrammarlangLexer.NONTERMINAL, value: 'D' },
                { type: GrammarlangLexer.NONTERMINAL, value: 'S' }
            ],
            []
        ],
        'D': [
            [
                { type: GrammarlangLexer.NONTERMINAL, value: 'D' },
                { type: GrammarlangLexer.NONTERMINAL, value: 'E' }
            ],
            [
                { type: GrammarlangLexer.TERMINAL, value: 'a' },
            ],
            [
                { type: GrammarlangLexer.NONTERMINAL, value: 'E' },
            ]
        ],
        'E': [
            [
                { type: GrammarlangLexer.TERMINAL, value: 'b' },
            ],
            [],

        ]
    };
    t.deepEqual(ll1.calculateNullables(grammar), {
        nullableRules: { S: [true, true], D: [true, false, true], E: [false, true] },
        nullableNonTerminals: { S: true, D: true, E: true }
    });
});