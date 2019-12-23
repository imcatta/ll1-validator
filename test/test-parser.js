import test from 'ava';
const GrammarlangLexer = require('../grammarlang/grammarlangLexer').grammarlangLexer;
const parser = require('../src/parser.js');

test('empty string', t => {
    t.deepEqual(parser(''), {})
});

test('simple case', t => {
    const grammar = `S -> a S;`
    t.deepEqual(parser(grammar), {
        'S': [
            [
                { type: GrammarlangLexer.TERMINAL, value: 'a' },
                { type: GrammarlangLexer.NONTERMINAL, value: 'S' }
            ]
        ]
    })
});

test('simple case with commments', t => {
    const grammar = `
    /* this is\n
    a multiline\n
    comment */\n
    \n
    S -> a S; // this is an inline comment`
    t.deepEqual(parser(grammar), {
        'S': [
            [
                { type: GrammarlangLexer.TERMINAL, value: 'a' },
                { type: GrammarlangLexer.NONTERMINAL, value: 'S' }
            ]
        ]
    })
});

test('complex case', t => {
    const grammar = `
    S -> a D;
    S -> ;
    D -> b;
    `
    t.deepEqual(parser(grammar), {
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
    })
});
