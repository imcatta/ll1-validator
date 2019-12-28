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
            []
        ]
    };
    t.deepEqual(ll1.calculateNullables(grammar), {
        nullableRules: { S: [true, true], D: [true, false, true], E: [false, true] },
        nullableNonTerminals: { S: true, D: true, E: true }
    });
});

test('calculate nullables case 5', t=>{
    const grammar={
        'S': [
            [
                { type: GrammarlangLexer.NONTERMINAL, value: 'T' }
            ]
        ],
        'T': [
            [
                { type: GrammarlangLexer.TERMINAL, value: 'a' },
                { type: GrammarlangLexer.NONTERMINAL, value: 'T' },
                { type: GrammarlangLexer.TERMINAL, value: 'a' }
            ],
            [
                { type: GrammarlangLexer.TERMINAL, value: 'b' },
                { type: GrammarlangLexer.NONTERMINAL, value: 'T' },
                { type: GrammarlangLexer.TERMINAL, value: 'b' }
            ],
            [
                { type: GrammarlangLexer.TERMINAL, value: 'c' },
                { type: GrammarlangLexer.NONTERMINAL, value: 'T' },
                { type: GrammarlangLexer.TERMINAL, value: 'c' }
            ],
            [
                { type: GrammarlangLexer.TERMINAL, value: 'q' }
            ]
        ],

    };
    t.deepEqual(ll1.calculateNullables(grammar), {
        nullableRules: { S: [false], T: [false, false,false,false]},
        nullableNonTerminals: { S: false, T: false}
    });
    
});

test('initialize first sets case 1', t => {
    const grammar = {
        'S': [
            [
                { type: GrammarlangLexer.TERMINAL, value: 'a' },
                { type: GrammarlangLexer.NONTERMINAL, value: 'S' }
            ]
        ]
    };
    t.deepEqual(ll1.initializeFirstSets(grammar), {
        'S': [[['a']]]
    });
});

test('initialize first sets case 2', t => {
    const grammar = {
        'S': [
            [
                { type: GrammarlangLexer.TERMINAL, value: 'a' },
                { type: GrammarlangLexer.NONTERMINAL, value: 'S' }
            ],
            [
                { type: GrammarlangLexer.NONTERMINAL, value: 'D' }
            ]
        ],
        'D': [
            [
                { type: GrammarlangLexer.TERMINAL, value: 'b' }
            ]
        ]
    };
    t.deepEqual(ll1.initializeFirstSets(grammar), {
        'S': [[['a']], [[]]],
        'D': [[['b']]]
    });
});

test('initialize first sets case 3', t => {
    const grammar = {
        'S': [
            [
                { type: GrammarlangLexer.TERMINAL, value: 'a' },
                { type: GrammarlangLexer.NONTERMINAL, value: 'S' }
            ],
            [
                { type: GrammarlangLexer.NONTERMINAL, value: 'D' }
            ]
        ],
        'D': [
            []
        ]
    };
    t.deepEqual(ll1.initializeFirstSets(grammar), {
        'S': [[['a']], [[]]],
        'D': [[[]]]
    });
});

test('initialize first sets case 4', t => {
    const grammar = {
        'S': [
            [{ type: GrammarlangLexer.NONTERMINAL, value: 'A' }]
        ],
        'A': [
            [
                { type: GrammarlangLexer.NONTERMINAL, value: 'A' },
                { type: GrammarlangLexer.TERMINAL, value: 'a' }
            ],
            [
                { type: GrammarlangLexer.NONTERMINAL, value: 'A' },
                { type: GrammarlangLexer.TERMINAL, value: 'b' },
                { type: GrammarlangLexer.TERMINAL, value: 'a' }
            ],
            [
                { type: GrammarlangLexer.NONTERMINAL, value: 'Z' }
            ],
            []
        ],
        'Z': [
            [
                { type: GrammarlangLexer.NONTERMINAL, value: 'Z' },
                { type: GrammarlangLexer.TERMINAL, value: 'x' }
            ],
            [
                { type: GrammarlangLexer.NONTERMINAL, value: 'Z' },
                { type: GrammarlangLexer.TERMINAL, value: 'y' },
                { type: GrammarlangLexer.TERMINAL, value: 'x' }
            ],
            [
                { type: GrammarlangLexer.NONTERMINAL, value: 'S' }
            ]
        ]
    };
    t.deepEqual(ll1.initializeFirstSets(grammar), {
        'S': [[[]]],
        'A': [
            [['a']],
            [['b']],
            [[]],
            [[]]
        ],
        'Z': [
            [['x']],
            [['y']],
            [[]]
        ]
    });
});



test('calculate first sets dependencies case 1', t => {
    const grammar = {
        'S': [
            [
                { type: GrammarlangLexer.TERMINAL, value: 'a' },
                { type: GrammarlangLexer.NONTERMINAL, value: 'S' }
            ],
            [
                { type: GrammarlangLexer.NONTERMINAL, value: 'D' }
            ]
        ],
        'D': [
            [
                { type: GrammarlangLexer.TERMINAL, value: 'b' }
            ]
        ],

    };
    t.deepEqual(ll1.calculateFirstSetsDependencies(grammar), {
        'S': [new Set(), new Set(['D'])],
        'D': [new Set()]
    });
});


test('calculate first sets dependencies case 2', t => {
    const grammar = {
        'S': [
            [
                { type: GrammarlangLexer.NONTERMINAL, value: 'S' },
                { type: GrammarlangLexer.NONTERMINAL, value: 'E' },
                { type: GrammarlangLexer.NONTERMINAL, value: 'D' }
            ],
            [
                { type: GrammarlangLexer.NONTERMINAL, value: 'D' }
            ],
            []
        ],
        'D': [
            [
                { type: GrammarlangLexer.TERMINAL, value: 'b' }
            ]
        ],
        'E': [
            [
                { type: GrammarlangLexer.TERMINAL, value: 'c' }
            ],
            []
        ],

    };
    t.deepEqual(ll1.calculateFirstSetsDependencies(grammar), {
        'S': [new Set(['S', 'E', 'D']), new Set(['D']), new Set([])],
        'D': [new Set([])],
        'E': [new Set([]), new Set([])]
    });
});

test('calculate first sets case 1', t => {
    const grammar = {
        'S': [
            [
                { type: GrammarlangLexer.TERMINAL, value: 'a' },
                { type: GrammarlangLexer.NONTERMINAL, value: 'S' }
            ],
            [
                { type: GrammarlangLexer.NONTERMINAL, value: 'D' }
            ]
        ],
        'D': [
            [
                { type: GrammarlangLexer.TERMINAL, value: 'b' }
            ]
        ],

    };
    t.deepEqual(ll1.calculateFirstSets(grammar), {
        'S': [
            [['a'], ['a'], ['a']],
            [[], ['b'], ['b']],
        ],
        'D': [
            [['b'], ['b'], ['b']]
        ]
    });
});

test('calculate first sets case 2', t => {
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
            []
        ]
    };
    t.deepEqual(ll1.calculateFirstSets(grammar), {
        'S': [
            [[], ['a'], ['a', 'b'], ['a', 'b']],
            [[], [], [], []]
        ],
        'D': [
            [[], ['a', 'b'], ['a', 'b'], ['a', 'b']],
            [['a'], ['a'], ['a'], ['a']],
            [[], ['b'], ['b'], ['b']]
        ],
        'E': [
            [['b'], ['b'], ['b'], ['b']],
            [[], [], [], []]
        ]
    });
});


test('calculate first sets case 3', t => {
    const grammar = {
        'S': [
            [{ type: GrammarlangLexer.NONTERMINAL, value: 'A' }]
        ],
        'A': [
            [
                { type: GrammarlangLexer.NONTERMINAL, value: 'A' },
                { type: GrammarlangLexer.TERMINAL, value: 'a' }
            ],
            [
                { type: GrammarlangLexer.NONTERMINAL, value: 'A' },
                { type: GrammarlangLexer.TERMINAL, value: 'b' },
                { type: GrammarlangLexer.TERMINAL, value: 'a' }
            ],
            [
                { type: GrammarlangLexer.NONTERMINAL, value: 'Z' }
            ],
            []
        ],
        'Z': [
            [
                { type: GrammarlangLexer.NONTERMINAL, value: 'Z' },
                { type: GrammarlangLexer.TERMINAL, value: 'x' }
            ],
            [
                { type: GrammarlangLexer.NONTERMINAL, value: 'Z' },
                { type: GrammarlangLexer.TERMINAL, value: 'y' },
                { type: GrammarlangLexer.TERMINAL, value: 'x' }
            ],
            [
                { type: GrammarlangLexer.NONTERMINAL, value: 'S' }
            ]
        ]
    };
    t.deepEqual(ll1.calculateFirstSets(grammar), {
        'S': [
            [
                [],
                ['a', 'b'],
                ['a', 'b', 'x', 'y'],
                ['a', 'b', 'x', 'y'],
                ['a', 'b', 'x', 'y']
            ]
        ],
        'A': [
            [
                ['a'],
                ['a', 'b'],
                ['a', 'b', 'x', 'y'],
                ['a', 'b', 'x', 'y'],
                ['a', 'b', 'x', 'y']
            ],
            [
                ['b'],
                ['a', 'b'],
                ['a', 'b', 'x', 'y'],
                ['a', 'b', 'x', 'y'],
                ['a', 'b', 'x', 'y']
            ],
            [
                [],
                ['x', 'y'],
                ['x', 'y'],
                ['a', 'b', 'x', 'y'],
                ['a', 'b', 'x', 'y']
            ],
            [
                [], [], [], [], []
            ]
        ],
        'Z': [
            [
                ['x'],
                ['x', 'y'],
                ['x', 'y'],
                ['a', 'b', 'x', 'y'],
                ['a', 'b', 'x', 'y']
            ],
            [
                ['y'],
                ['x', 'y'],
                ['x', 'y'],
                ['a', 'b', 'x', 'y'],
                ['a', 'b', 'x', 'y']
            ],
            [
                [],
                [],
                ['a', 'b'],
                ['a', 'b', 'x', 'y'],
                ['a', 'b', 'x', 'y']
            ]
        ]
    });
});

test('calculate follow sets case 1', t => {
    const grammar = {
        'S': [
            [
                { type: GrammarlangLexer.NONTERMINAL, value: 'T' }
            ]
        ],
        'T': [
            [
                { type: GrammarlangLexer.TERMINAL, value: 'a' },
                { type: GrammarlangLexer.NONTERMINAL, value: 'T' },
                { type: GrammarlangLexer.TERMINAL, value: 'a' }
            ],
            [
                { type: GrammarlangLexer.TERMINAL, value: 'b' },
                { type: GrammarlangLexer.NONTERMINAL, value: 'T' },
                { type: GrammarlangLexer.TERMINAL, value: 'b' }
            ],
            [
                { type: GrammarlangLexer.TERMINAL, value: 'c' },
                { type: GrammarlangLexer.NONTERMINAL, value: 'T' },
                { type: GrammarlangLexer.TERMINAL, value: 'c' }
            ],
            [
                { type: GrammarlangLexer.TERMINAL, value: 'q' }
            ]
        ],

    };
    t.deepEqual(ll1.calculateFollowSets(grammar), {
        'S': [
            ['&#x2199;'],
            ['&#x2199;'],
            ['&#x2199;']
        ],
        'T': [
            ['a', 'b', 'c'],
            ['&#x2199;','a','b','c'],
            ['&#x2199;','a','b','c']
        ]
    });
});
test('calculate follow sets case 2', t => {
    const grammar = {
        'S': [
            [{ type: GrammarlangLexer.NONTERMINAL, value: 'A' }]
        ],
        'A': [
            [
                { type: GrammarlangLexer.NONTERMINAL, value: 'A' },
                { type: GrammarlangLexer.TERMINAL, value: 'a' }
            ],
            [
                { type: GrammarlangLexer.NONTERMINAL, value: 'A' },
                { type: GrammarlangLexer.TERMINAL, value: 'b' },
                { type: GrammarlangLexer.TERMINAL, value: 'a' }
            ],
            [
                { type: GrammarlangLexer.NONTERMINAL, value: 'Z' }
            ],
            []
        ],
        'Z': [
            [
                { type: GrammarlangLexer.NONTERMINAL, value: 'Z' },
                { type: GrammarlangLexer.TERMINAL, value: 'x' }
            ],
            [
                { type: GrammarlangLexer.NONTERMINAL, value: 'Z' },
                { type: GrammarlangLexer.TERMINAL, value: 'y' },
                { type: GrammarlangLexer.TERMINAL, value: 'x' }
            ],
            [
                { type: GrammarlangLexer.NONTERMINAL, value: 'S' }
            ]
        ]
    };
    t.deepEqual(ll1.calculateFollowSets(grammar), {
        'S': [
                ['&#x2199;'],
                ['&#x2199;', 'x','y'],
                ['&#x2199;','a', 'b', 'x', 'y'],
                ['&#x2199;','a', 'b', 'x', 'y']
        ],
        'A': [
                ['a','b'],
                ['&#x2199;','a', 'b'],
                ['&#x2199;','a', 'b', 'x', 'y'],
                ['&#x2199;','a', 'b', 'x', 'y']
        ],
        'Z': [
                ['x', 'y'],
                ['a', 'b', 'x', 'y'],
                ['&#x2199;','a', 'b', 'x', 'y'],
                ['&#x2199;','a', 'b', 'x', 'y']
        ]
    });
});