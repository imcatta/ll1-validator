import test from 'ava';
const GrammarlangLexer = require('../grammarlang/grammarlangLexer').grammarlangLexer;
const parser = require('../src/parser.js');

// test('empty string', t => {
//     t.deepEqual(parser.parseString(''), {})
// });

test('simple case', t => {
    const grammar = `S -> a S;`
    t.deepEqual(parser.parseString(grammar), {
        'S': [
            [
                { type: GrammarlangLexer.TERMINAL, value: 'a' },
                { type: GrammarlangLexer.NONTERMINAL, value: 'S' }
            ]
        ],
        '_start_symbol': 'S'
    })
});

test('simple case with comments', t => {
    const grammar = `
    /* this is\n
    a multiline\n
    comment */\n
    \n
    S -> a S; // this is an inline comment`
    t.deepEqual(parser.parseString(grammar), {
        'S': [
            [
                { type: GrammarlangLexer.TERMINAL, value: 'a' },
                { type: GrammarlangLexer.NONTERMINAL, value: 'S' }
            ]
        ],
        '_start_symbol': 'S'
    })
});

test('complex case', t => {
    const grammar = `
    S -> a D;
    S -> ;
    D -> b;
    `
    t.deepEqual(parser.parseString(grammar), {
        'S': [
            [
                { type: GrammarlangLexer.TERMINAL, value: 'a' },
                { type: GrammarlangLexer.NONTERMINAL, value: 'D' }
            ],
            []
        ],
        'D': [
            [
                { type: GrammarlangLexer.TERMINAL, value: 'b' }
            ]
        ],
        '_start_symbol': 'S'
    })
});


test('custom start symbol case', t => {
    const grammar = `_start_symbol D; S -> a S; S -> ; D -> b S;`
    t.deepEqual(parser.parseString(grammar), {
        'S': [
            [
                { type: GrammarlangLexer.TERMINAL, value: 'a' },
                { type: GrammarlangLexer.NONTERMINAL, value: 'S' }
            ],
            []
        ],
        'D': [
            [
                { type: GrammarlangLexer.TERMINAL, value: 'b' },
                { type: GrammarlangLexer.NONTERMINAL, value: 'S' }
            ],
        ],
        '_start_symbol': 'D'
    })
});