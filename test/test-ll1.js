import test from 'ava';
const parser = require('../src/parser');
const ll1 = require('../src/ll1');

test('calculate nullables case 1', t => {
    const input = {
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
    };
    t.deepEqual(ll1.calculateNullables(input), {
        nullableRules: { S: [false] },
        nullableNonTerminals: { S: false }
    });
});


test('calculate nullables case 2', t => {
    const input = {
        grammar: {
            'S': [
                [
                    { type: parser.TERMINAL, value: 'a' },
                    { type: parser.NONTERMINAL, value: 'S' }
                ],
                []
            ],
        },
        startSymbol: 'S',
        rulesNumber: 2,
        terminals: ['a'],
        nonTerminals: ['S'],
        warnings: [],
    };
    t.deepEqual(ll1.calculateNullables(input), {
        nullableRules: { S: [false, true] },
        nullableNonTerminals: { S: true }
    });
});


test('calculate nullables case 3', t => {
    const input = {
        grammar: {
            'S': [
                [{ type: parser.NONTERMINAL, value: 'D' }]
            ],
            'D': [
                []
            ],
        },
        startSymbol: 'S',
        rulesNumber: 3,
        terminals: [],
        nonTerminals: ['D', 'S'],
        warnings: [],
    };
    t.deepEqual(ll1.calculateNullables(input), {
        nullableRules: { S: [true], D: [true] },
        nullableNonTerminals: { S: true, D: true }
    });
});

test('calculate nullables case 4', t => {
    const input = {
        grammar: {
            'S': [
                [
                    { type: parser.NONTERMINAL, value: 'D' },
                    { type: parser.NONTERMINAL, value: 'S' }
                ],
                []
            ],
            'D': [
                [
                    { type: parser.NONTERMINAL, value: 'D' },
                    { type: parser.NONTERMINAL, value: 'E' }
                ],
                [
                    { type: parser.TERMINAL, value: 'a' },
                ],
                [
                    { type: parser.NONTERMINAL, value: 'E' },
                ]
            ],
            'E': [
                [
                    { type: parser.TERMINAL, value: 'b' },
                ],
                []
            ],
        },
        startSymbol: 'S',
        rulesNumber: 7,
        terminals: ['a', 'b'],
        nonTerminals: ['D', 'E', 'S'],
        warnings: [],
    };
    t.deepEqual(ll1.calculateNullables(input), {
        nullableRules: { S: [true, true], D: [true, false, true], E: [false, true] },
        nullableNonTerminals: { S: true, D: true, E: true }
    });
});

test('calculate nullables case 5', t => {
    const input = {
        grammar: {
            'S': [
                [
                    { type: parser.NONTERMINAL, value: 'T' }
                ]
            ],
            'T': [
                [
                    { type: parser.TERMINAL, value: 'a' },
                    { type: parser.NONTERMINAL, value: 'T' },
                    { type: parser.TERMINAL, value: 'a' }
                ],
                [
                    { type: parser.TERMINAL, value: 'b' },
                    { type: parser.NONTERMINAL, value: 'T' },
                    { type: parser.TERMINAL, value: 'b' }
                ],
                [
                    { type: parser.TERMINAL, value: 'c' },
                    { type: parser.NONTERMINAL, value: 'T' },
                    { type: parser.TERMINAL, value: 'c' }
                ],
                [
                    { type: parser.TERMINAL, value: 'q' }
                ]
            ],
        },
        startSymbol: 'S',
        rulesNumber: 5,
        terminals: ['a', 'b', 'c', 'q'],
        nonTerminals: ['S', 'T'],
        warnings: [],
    };
    t.deepEqual(ll1.calculateNullables(input), {
        nullableRules: { S: [false], T: [false, false, false, false] },
        nullableNonTerminals: { S: false, T: false }
    });
});

test('calculate nullables case 6', t => {
    const input = {
        grammar: {
            'S': [
                [
                    { type: parser.NONTERMINAL, value: 'SS' },
                    { type: parser.NONTERMINAL, value: 'RULE' },
                    { type: parser.NONTERMINAL, value: 'RULELIST' }
                ]
            ],
            'SS': [
                [
                    { type: parser.TERMINAL, value: 'ssk' },
                    { type: parser.TERMINAL, value: 'nt' },
                    { type: parser.TERMINAL, value: 'semicolon' }
                ],
                []
            ],
            'RULELIST': [
                [
                    { type: parser.NONTERMINAL, value: 'RULE' },
                    { type: parser.NONTERMINAL, value: 'RULELIST' },
                ],
                []
            ],
            'RULE': [
                [
                    { type: parser.NONTERMINAL, value: 'L' },
                    { type: parser.TERMINAL, value: 'assign' },
                    { type: parser.NONTERMINAL, value: 'R' },
                    { type: parser.TERMINAL, value: 'semicolon' }
                ]
            ],
            'L': [
                [
                    { type: parser.TERMINAL, value: 'nt' }
                ]
            ],
            'R': [
                [
                    { type: parser.TERMINAL, value: 'nt' },
                    { type: parser.NONTERMINAL, value: 'R' },
                ],
                [
                    { type: parser.TERMINAL, value: 't' },
                    { type: parser.NONTERMINAL, value: 'R' }
                ],
                [
                ]
            ],
        },
        startSymbol: 'S',
        rulesNumber: 10,
        terminals: ['nt', 'semicolon', 'ssk', 't'],
        nonTerminals: ['L', 'S', 'R', 'RULE', 'RULELIST', 'S', 'SS'],
        warnings: [],
    };
    t.deepEqual(ll1.calculateNullables(input), {
        nullableRules: { S: [false], SS: [false, true], RULELIST: [false, true], RULE: [false], L: [false], R: [false, false, true] },
        nullableNonTerminals: { S: false, SS: true, RULELIST: true, RULE: false, L: false, R: true }
    });
});


test('initialize first sets case 1', t => {
    const input = {
        grammar: {
            'S': [
                [
                    { type: parser.TERMINAL, value: 'a' },
                    { type: parser.NONTERMINAL, value: 'S' }
                ]
            ]
        },
        startSymbol: 'S',
        rulesNumber: 2,
        terminals: ['a'],
        nonTerminals: ['S'],
        warnings: [],
    };
    t.deepEqual(ll1.initializeFirstSets(input), {
        'S': [[['a']]]
    });
});

test('initialize first sets case 2', t => {
    const input = {
        grammar: {
            'S': [
                [
                    { type: parser.TERMINAL, value: 'a' },
                    { type: parser.NONTERMINAL, value: 'S' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'D' }
                ]
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
    };
    t.deepEqual(ll1.initializeFirstSets(input), {
        'S': [[['a']], [[]]],
        'D': [[['b']]]
    });
});

test('initialize first sets case 3', t => {
    const input = {
        grammar: {
            'S': [
                [
                    { type: parser.TERMINAL, value: 'a' },
                    { type: parser.NONTERMINAL, value: 'S' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'D' }
                ]
            ],
            'D': [
                []
            ],
        },
        startSymbol: 'S',
        rulesNumber: 3,
        terminals: ['a'],
        nonTerminals: ['D', 'S'],
        warnings: [],
    };
    t.deepEqual(ll1.initializeFirstSets(input), {
        'S': [[['a']], [[]]],
        'D': [[[]]]
    });
});

test('initialize first sets case 4', t => {
    const input = {
        grammar: {
            'S': [
                [{ type: parser.NONTERMINAL, value: 'A' }]
            ],
            'A': [
                [
                    { type: parser.NONTERMINAL, value: 'A' },
                    { type: parser.TERMINAL, value: 'a' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'A' },
                    { type: parser.TERMINAL, value: 'b' },
                    { type: parser.TERMINAL, value: 'a' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'Z' }
                ],
                []
            ],
            'Z': [
                [
                    { type: parser.NONTERMINAL, value: 'Z' },
                    { type: parser.TERMINAL, value: 'x' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'Z' },
                    { type: parser.TERMINAL, value: 'y' },
                    { type: parser.TERMINAL, value: 'x' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'S' }
                ]
            ],
        },
        startSymbol: 'S',
        rulesNumber: 8,
        terminals: ['a', 'b', 'x', 'y'],
        nonTerminals: ['A', 'S', 'Z'],
        warnings: [],
    };
    t.deepEqual(ll1.initializeFirstSets(input), {
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
        ],
    });
});

test('calculate first sets dependencies case 1', t => {
    const input = {
        grammar: {
            'S': [
                [
                    { type: parser.TERMINAL, value: 'a' },
                    { type: parser.NONTERMINAL, value: 'S' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'D' }
                ]
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
    };
    t.deepEqual(ll1.calculateFirstSetsDependencies(input), {
        'S': [new Set(), new Set(['D'])],
        'D': [new Set()]
    });
});

test('calculate first sets dependencies case 2', t => {
    const input = {
        grammar: {
            'S': [
                [
                    { type: parser.NONTERMINAL, value: 'S' },
                    { type: parser.NONTERMINAL, value: 'E' },
                    { type: parser.NONTERMINAL, value: 'D' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'D' }
                ],
                []
            ],
            'D': [
                [
                    { type: parser.TERMINAL, value: 'b' }
                ]
            ],
            'E': [
                [
                    { type: parser.TERMINAL, value: 'c' }
                ],
                []
            ],
        },
        startSymbol: 'S',
        rulesNumber: 6,
        terminals: ['b', 'c'],
        nonTerminals: ['D', 'E', 'S'],
        warnings: [],
    };
    t.deepEqual(ll1.calculateFirstSetsDependencies(input), {
        'S': [new Set(['S', 'E', 'D']), new Set(['D']), new Set([])],
        'D': [new Set([])],
        'E': [new Set([]), new Set([])]
    });
});

test('calculate first sets case 1', t => {
    const input = {
        grammar: {
            'S': [
                [
                    { type: parser.TERMINAL, value: 'a' },
                    { type: parser.NONTERMINAL, value: 'S' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'D' }
                ]
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
    };
    t.deepEqual(ll1.calculateFirstSets(input), {
        'S': [
            [['a'], ['a'], ['a']],
            [[], ['b'], ['b']],
        ],
        'D': [
            [['b'], ['b'], ['b']]
        ],
    });
});

test('calculate first sets case 2', t => {
    const input = {
        grammar: {
            'S': [
                [
                    { type: parser.NONTERMINAL, value: 'D' },
                    { type: parser.NONTERMINAL, value: 'S' }
                ],
                []
            ],
            'D': [
                [
                    { type: parser.NONTERMINAL, value: 'D' },
                    { type: parser.NONTERMINAL, value: 'E' }
                ],
                [
                    { type: parser.TERMINAL, value: 'a' },
                ],
                [
                    { type: parser.NONTERMINAL, value: 'E' },
                ]
            ],
            'E': [
                [
                    { type: parser.TERMINAL, value: 'b' },
                ],
                []
            ],
        },
        startSymbol: 'S',
        rulesNumber: 7,
        terminals: ['a', 'b'],
        nonTerminals: ['D', 'E', 'S'],
        warnings: [],
    };
    t.deepEqual(ll1.calculateFirstSets(input), {
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
        ],
    });
});


test('calculate first sets case 3', t => {
    const input = {
        grammar: {
            'S': [
                [{ type: parser.NONTERMINAL, value: 'A' }]
            ],
            'A': [
                [
                    { type: parser.NONTERMINAL, value: 'A' },
                    { type: parser.TERMINAL, value: 'a' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'A' },
                    { type: parser.TERMINAL, value: 'b' },
                    { type: parser.TERMINAL, value: 'a' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'Z' }
                ],
                []
            ],
            'Z': [
                [
                    { type: parser.NONTERMINAL, value: 'Z' },
                    { type: parser.TERMINAL, value: 'x' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'Z' },
                    { type: parser.TERMINAL, value: 'y' },
                    { type: parser.TERMINAL, value: 'x' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'S' }
                ]
            ],
        },
        startSymbol: 'S',
        rulesNumber: 8,
        terminals: ['a', 'b', 'x', 'y'],
        nonTerminals: ['A', 'S', 'Z'],
        warnings: [],
    };
    t.deepEqual(ll1.calculateFirstSets(input), {
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
        ],
    });
});

test('calculate follow sets case 1', t => {
    const input = {
        grammar: {
            'S': [
                [
                    { type: parser.NONTERMINAL, value: 'T' }
                ]
            ],
            'T': [
                [
                    { type: parser.TERMINAL, value: 'a' },
                    { type: parser.NONTERMINAL, value: 'T' },
                    { type: parser.TERMINAL, value: 'a' }
                ],
                [
                    { type: parser.TERMINAL, value: 'b' },
                    { type: parser.NONTERMINAL, value: 'T' },
                    { type: parser.TERMINAL, value: 'b' }
                ],
                [
                    { type: parser.TERMINAL, value: 'c' },
                    { type: parser.NONTERMINAL, value: 'T' },
                    { type: parser.TERMINAL, value: 'c' }
                ],
                [
                    { type: parser.TERMINAL, value: 'q' }
                ]
            ],
        },
        startSymbol: 'S',
        rulesNumber: 5,
        terminals: ['a', 'b', 'c', 'q'],
        nonTerminals: ['S', 'T'],
        warnings: [],
    };
    t.deepEqual(ll1.calculateFollowSets(input), {
        'S': [
            ['↙'],
            ['↙'],
            ['↙']
        ],
        'T': [
            ['a', 'b', 'c'],
            ['a', 'b', 'c', '↙'],
            ['a', 'b', 'c', '↙']
        ],
    });
});

test('calculate follow sets case 2', t => {
    const input = {
        grammar: {
            'S': [
                [{ type: parser.NONTERMINAL, value: 'A' }]
            ],
            'A': [
                [
                    { type: parser.NONTERMINAL, value: 'A' },
                    { type: parser.TERMINAL, value: 'a' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'A' },
                    { type: parser.TERMINAL, value: 'b' },
                    { type: parser.TERMINAL, value: 'a' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'Z' }
                ],
                []
            ],
            'Z': [
                [
                    { type: parser.NONTERMINAL, value: 'Z' },
                    { type: parser.TERMINAL, value: 'x' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'Z' },
                    { type: parser.TERMINAL, value: 'y' },
                    { type: parser.TERMINAL, value: 'x' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'S' }
                ]
            ],
        },
        startSymbol: 'S',
        rulesNumber: 8,
        terminals: ['a', 'b', 'x', 'y'],
        nonTerminals: ['A', 'S', 'Z'],
        warnings: [],
    };
    t.deepEqual(ll1.calculateFollowSets(input), {
        'S': [
            ['↙'],
            ['x', 'y', '↙',],
            ['a', 'b', 'x', 'y', '↙'],
            ['a', 'b', 'x', 'y', '↙']
        ],
        'A': [
            ['a', 'b'],
            ['a', 'b', '↙'],
            ['a', 'b', 'x', 'y', '↙'],
            ['a', 'b', 'x', 'y', '↙']
        ],
        'Z': [
            ['x', 'y'],
            ['a', 'b', 'x', 'y'],
            ['a', 'b', 'x', 'y', '↙'],
            ['a', 'b', 'x', 'y', '↙']
        ],
    });
});

test('calculate follow sets case 3', t => {
    const input = {
        grammar: {
            'P': [
                [{ type: parser.NONTERMINAL, value: 'S' }]
            ],
            'S': [
                [{ type: parser.NONTERMINAL, value: 'A' }]
            ],
            'A': [
                [
                    { type: parser.NONTERMINAL, value: 'A' },
                    { type: parser.TERMINAL, value: 'a' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'A' },
                    { type: parser.TERMINAL, value: 'b' },
                    { type: parser.TERMINAL, value: 'a' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'Z' }
                ],
                []
            ],
            'Z': [
                [
                    { type: parser.NONTERMINAL, value: 'Z' },
                    { type: parser.TERMINAL, value: 'x' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'Z' },
                    { type: parser.TERMINAL, value: 'y' },
                    { type: parser.TERMINAL, value: 'x' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'S' }
                ]
            ],
        },
        startSymbol: 'P',
        rulesNumber: 9,
        terminals: ['a', 'b', 'x', 'y'],
        nonTerminals: ['A', 'P', 'S', 'Z'],
        warnings: [],
    };
    t.deepEqual(ll1.calculateFollowSets(input), {
        'P': [
            ['↙'],
            ['↙'],
            ['↙'],
            ['↙'],
            ['↙']
        ],
        'S': [
            [],
            ['x', 'y', '↙',],
            ['a', 'b', 'x', 'y', '↙'],
            ['a', 'b', 'x', 'y', '↙'],
            ['a', 'b', 'x', 'y', '↙']
        ],
        'A': [
            ['a', 'b'],
            ['a', 'b'],
            ['a', 'b', 'x', 'y', '↙'],
            ['a', 'b', 'x', 'y', '↙'],
            ['a', 'b', 'x', 'y', '↙']
        ],
        'Z': [
            ['x', 'y'],
            ['a', 'b', 'x', 'y'],
            ['a', 'b', 'x', 'y'],
            ['a', 'b', 'x', 'y', '↙'],
            ['a', 'b', 'x', 'y', '↙']
        ],
    });
});

test('calculate follow sets case 4', t => {
    const input = {
        grammar: {
            'S': [
                [
                    { type: parser.NONTERMINAL, value: 'R' },
                    { type: parser.TERMINAL, value: 'i' },
                    { type: parser.NONTERMINAL, value: 'S' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'R' },
                    { type: parser.TERMINAL, value: 'i' }
                ]
            ],
            'R': [
                [
                    { type: parser.TERMINAL, value: 'd' },
                    { type: parser.TERMINAL, value: 'i' },
                    { type: parser.NONTERMINAL, value: 'L' },
                    { type: parser.TERMINAL, value: 'v' }
                ]
            ],
            'L': [
                [
                    { type: parser.TERMINAL, value: 'd' },
                    { type: parser.NONTERMINAL, value: 'X' }
                ],
                [
                    { type: parser.TERMINAL, value: 'n' }
                ]
            ],
            'X': [
                [
                    { type: parser.NONTERMINAL, value: 'X' },
                    { type: parser.TERMINAL, value: 'n' },
                    { type: parser.NONTERMINAL, value: 'R' }
                ],
                [
                ]
            ],
        },
        startSymbol: 'S',
        rulesNumber: 7,
        terminals: ['d', 'i', 'n', 'v'],
        nonTerminals: ['L', 'R', 'S', 'X'],
        warnings: [],
    };
    t.deepEqual(ll1.calculateFollowSets(input), {
        'S': [
            ['↙'],
            ['↙'],
            ['↙'],
            ['↙']
        ],
        'R': [
            ['i'],
            ['i', 'n'],
            ['i', 'n', 'v'],
            ['i', 'n', 'v']
        ],
        'L': [
            ['v'],
            ['v'],
            ['v'],
            ['v']
        ],
        'X': [
            ['n'],
            ['n', 'v'],
            ['n', 'v'],
            ['n', 'v']
        ]
    });
});

test('calculate follow sets case 5', t => {
    const input = {
        grammar: {
            'S': [
                [
                    { type: parser.NONTERMINAL, value: 'SS' },
                    { type: parser.NONTERMINAL, value: 'RULE' },
                    { type: parser.NONTERMINAL, value: 'RULELIST' }
                ]
            ],
            'SS': [
                [
                    { type: parser.TERMINAL, value: 'ssk' },
                    { type: parser.TERMINAL, value: 'nt' },
                    { type: parser.TERMINAL, value: 'semicolon' }
                ],
                []
            ],
            'RULELIST': [
                [
                    { type: parser.NONTERMINAL, value: 'RULE' },
                    { type: parser.NONTERMINAL, value: 'RULELIST' },
                ],
                []
            ],
            'RULE': [
                [
                    { type: parser.NONTERMINAL, value: 'L' },
                    { type: parser.TERMINAL, value: 'assign' },
                    { type: parser.NONTERMINAL, value: 'R' },
                    { type: parser.TERMINAL, value: 'semicolon' }
                ]
            ],
            'L': [
                [
                    { type: parser.TERMINAL, value: 'nt' }
                ]
            ],
            'R': [
                [
                    { type: parser.TERMINAL, value: 'nt' },
                    { type: parser.NONTERMINAL, value: 'R' },
                ],
                [
                    { type: parser.TERMINAL, value: 't' },
                    { type: parser.NONTERMINAL, value: 'R' }
                ],
                [
                ]
            ],
        },
        startSymbol: 'S',
        rulesNumber: 10,
        terminals: ['nt', 'semicolon', 'ssk', 't'],
        nonTerminals: ['L', 'S', 'R', 'RULE', 'RULELIST', 'S', 'SS'],
        warnings: [],
    };
    t.deepEqual(ll1.calculateFollowSets(input), {
        'S': [
            ['↙'],
            ['↙'],
            ['↙']
        ],
        'SS': [
            ['nt'],
            ['nt'],
            ['nt']
        ],
        'RULELIST': [
            [],
            ['↙'],
            ['↙']
        ],
        'RULE': [
            ['nt'],
            ['nt', '↙'],
            ['nt', '↙']
        ],
        'L': [
            ['assign'],
            ['assign'],
            ['assign']
        ],
        'R': [
            ['semicolon'],
            ['semicolon'],
            ['semicolon']
        ]
    });
});

test('calculate look aheads case 1', t => {
    const input = {
        grammar: {
            'S': [
                [
                    { type: parser.NONTERMINAL, value: 'T' }
                ]
            ],
            'T': [
                [
                    { type: parser.TERMINAL, value: 'a' },
                    { type: parser.NONTERMINAL, value: 'T' },
                    { type: parser.TERMINAL, value: 'a' }
                ],
                [
                    { type: parser.TERMINAL, value: 'b' },
                    { type: parser.NONTERMINAL, value: 'T' },
                    { type: parser.TERMINAL, value: 'b' }
                ],
                [
                    { type: parser.TERMINAL, value: 'c' },
                    { type: parser.NONTERMINAL, value: 'T' },
                    { type: parser.TERMINAL, value: 'c' }
                ],
                [
                    { type: parser.TERMINAL, value: 'q' }
                ]
            ],
        },
        startSymbol: 'S',
        rulesNumber: 5,
        terminals: ['a', 'b', 'c', 'q'],
        nonTerminals: ['S', 'T'],
        warnings: [],
    };
    t.deepEqual(ll1.calculateLookAheads(input), {
        'S': [
            ['a', 'b', 'c', 'q']
        ],
        'T': [
            ['a'],
            ['b'],
            ['c'],
            ['q']
        ],
    });
});

test('calculate look aheads case 2', t => {
    const input = {
        grammar: {
            'S': [
                [{ type: parser.NONTERMINAL, value: 'A' }]
            ],
            'A': [
                [
                    { type: parser.NONTERMINAL, value: 'A' },
                    { type: parser.TERMINAL, value: 'a' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'A' },
                    { type: parser.TERMINAL, value: 'b' },
                    { type: parser.TERMINAL, value: 'a' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'Z' }
                ],
                []
            ],
            'Z': [
                [
                    { type: parser.NONTERMINAL, value: 'Z' },
                    { type: parser.TERMINAL, value: 'x' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'Z' },
                    { type: parser.TERMINAL, value: 'y' },
                    { type: parser.TERMINAL, value: 'x' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'S' }
                ]
            ],
        },
        startSymbol: 'S',
        rulesNumber: 8,
        terminals: ['a', 'b', 'x', 'y'],
        nonTerminals: ['A', 'S', 'Z'],
        warnings: [],
    };
    t.deepEqual(ll1.calculateLookAheads(input), {
        'S': [
            ['a', 'b', 'x', 'y', '↙']
        ],
        'A': [
            ['a', 'b', 'x', 'y'],
            ['a', 'b', 'x', 'y'],
            ['a', 'b', 'x', 'y', '↙'],
            ['a', 'b', 'x', 'y', '↙']
        ],
        'Z': [
            ['a', 'b', 'x', 'y'],
            ['a', 'b', 'x', 'y'],
            ['a', 'b', 'x', 'y', '↙',]
        ],
    });
});

test('calculate look aheads case 3', t => {
    const input = {
        grammar: {
            'P': [
                [{ type: parser.NONTERMINAL, value: 'S' }]
            ],
            'S': [
                [{ type: parser.NONTERMINAL, value: 'A' }]
            ],
            'A': [
                [
                    { type: parser.NONTERMINAL, value: 'A' },
                    { type: parser.TERMINAL, value: 'a' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'A' },
                    { type: parser.TERMINAL, value: 'b' },
                    { type: parser.TERMINAL, value: 'a' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'Z' }
                ],
                []
            ],
            'Z': [
                [
                    { type: parser.NONTERMINAL, value: 'Z' },
                    { type: parser.TERMINAL, value: 'x' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'Z' },
                    { type: parser.TERMINAL, value: 'y' },
                    { type: parser.TERMINAL, value: 'x' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'S' }
                ]
            ],
        },
        startSymbol: 'P',
        rulesNumber: 9,
        terminals: ['a', 'b', 'x', 'y'],
        nonTerminals: ['A', 'P', 'S', 'Z'],
        warnings: [],
    };
    t.deepEqual(ll1.calculateLookAheads(input), {
        'P': [
            ['a', 'b', 'x', 'y', '↙']
        ],
        'S': [
            ['a', 'b', 'x', 'y', '↙']
        ],
        'A': [
            ['a', 'b', 'x', 'y'],
            ['a', 'b', 'x', 'y'],
            ['a', 'b', 'x', 'y', '↙'],
            ['a', 'b', 'x', 'y', '↙']
        ],
        'Z': [
            ['a', 'b', 'x', 'y'],
            ['a', 'b', 'x', 'y'],
            ['a', 'b', 'x', 'y', '↙',]
        ],
    });
});

test('calculate LL1 case 1', t => {
    const input = {
        grammar: {
            'S': [
                [
                    { type: parser.NONTERMINAL, value: 'T' }
                ]
            ],
            'T': [
                [
                    { type: parser.TERMINAL, value: 'a' },
                    { type: parser.NONTERMINAL, value: 'T' },
                    { type: parser.TERMINAL, value: 'a' }
                ],
                [
                    { type: parser.TERMINAL, value: 'b' },
                    { type: parser.NONTERMINAL, value: 'T' },
                    { type: parser.TERMINAL, value: 'b' }
                ],
                [
                    { type: parser.TERMINAL, value: 'c' },
                    { type: parser.NONTERMINAL, value: 'T' },
                    { type: parser.TERMINAL, value: 'c' }
                ],
                [
                    { type: parser.TERMINAL, value: 'q' }
                ]
            ],
        },
        startSymbol: 'S',
        rulesNumber: 5,
        terminals: ['a', 'b', 'c', 'q'],
        nonTerminals: ['S', 'T'],
        warnings: [],
    };
    t.true(ll1.isLL1(input));
});

test('calculate LL1 case 2', t => {
    const input = {
        grammar: {
            'S': [
                [{ type: parser.NONTERMINAL, value: 'A' }]
            ],
            'A': [
                [
                    { type: parser.NONTERMINAL, value: 'A' },
                    { type: parser.TERMINAL, value: 'a' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'A' },
                    { type: parser.TERMINAL, value: 'b' },
                    { type: parser.TERMINAL, value: 'a' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'Z' }
                ],
                []
            ],
            'Z': [
                [
                    { type: parser.NONTERMINAL, value: 'Z' },
                    { type: parser.TERMINAL, value: 'x' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'Z' },
                    { type: parser.TERMINAL, value: 'y' },
                    { type: parser.TERMINAL, value: 'x' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'S' }
                ]
            ],
        },
        startSymbol: 'S',
        rulesNumber: 8,
        terminals: ['a', 'b', 'x', 'y'],
        nonTerminals: ['A', 'S', 'Z'],
        warnings: [],
    };
    t.false(ll1.isLL1(input));
});

test('calculate conflicts case 1', t => {
    const input = {
        grammar: {
            'S': [
                [{ type: parser.NONTERMINAL, value: 'A' }]
            ],
            'A': [
                [
                    { type: parser.NONTERMINAL, value: 'A' },
                    { type: parser.TERMINAL, value: 'a' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'A' },
                    { type: parser.TERMINAL, value: 'b' },
                    { type: parser.TERMINAL, value: 'a' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'Z' }
                ],
                []
            ],
            'Z': [
                [
                    { type: parser.NONTERMINAL, value: 'Z' },
                    { type: parser.TERMINAL, value: 'x' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'Z' },
                    { type: parser.TERMINAL, value: 'y' },
                    { type: parser.TERMINAL, value: 'x' }
                ],
                [
                    { type: parser.NONTERMINAL, value: 'S' }
                ]
            ],
        },
        startSymbol: 'S',
        rulesNumber: 8,
        terminals: ['a', 'b', 'x', 'y'],
        nonTerminals: ['A', 'S', 'Z'],
        warnings: [],
    };
    t.deepEqual(ll1.calculateAllConflicts(input), {
        'S': [],
        'A':
            ['a', 'b', 'x', 'y', '↙'],
        'Z':
            ['a', 'b', 'x', 'y'],
    });
});
