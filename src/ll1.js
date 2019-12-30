const GrammarlangLexer = require('../grammarlang/grammarlangLexer').grammarlangLexer;

function getNonTerminals(grammar) {
    return Object.keys(grammar).filter(v => !v.startsWith('_'))
}

function calculateNullables(grammar) {

    const nonTerminals = getNonTerminals(grammar);
    const nullableRules = {};
    const nullableNonTerminals = {};
    let doLoop = true;
    nonTerminals.forEach(l => nullableRules[l] = []);


    while (doLoop) {
        doLoop = false;

        nonTerminals.forEach(l => {
            grammar[l].forEach((rule, index) => {
                nullableRules[l][index] = ruleIsNullable(rule, nullableNonTerminals);
                if (nullableRules[l][index] === undefined) {
                    doLoop = true;
                }
            });
        });

        nonTerminals.forEach(l => {
            if (nullableNonTerminals[l] === undefined) {
                nullableNonTerminals[l] = false;
                for (const isNullable of nullableRules[l]) {
                    if (isNullable === true) {
                        nullableNonTerminals[l] = true;
                        break;
                    }
                    if (isNullable === undefined) {
                        nullableNonTerminals[l] = undefined;
                    }
                }
            }
        })

    }

    return {
        nullableRules: nullableRules,
        nullableNonTerminals: nullableNonTerminals
    }
}

function ruleIsNullable(rule, nullableNonTerminals) {
    let currentResult = true;
    for (const item of rule) {
        if (item.type === GrammarlangLexer.TERMINAL) {
            return false;
        }
        if (nullableNonTerminals[item.value] === false) {
            return false;
        }
        if (nullableNonTerminals[item.value] === undefined) {
            currentResult = undefined;
        }
    }
    return currentResult;
}

function initializeFirstSets(grammar) {
    const result = {};
    const nullableNonTerminals = calculateNullables(grammar).nullableNonTerminals; // TODO reuse precomputed values
    getNonTerminals(grammar).forEach(l => {
        result[l] = [];
        grammar[l].forEach((r, index) => {
            result[l][index] = [[]];
            for (const item of r) {
                if (item.type === GrammarlangLexer.TERMINAL) {
                    result[l][index][0].push(item.value);
                    return;
                }
                if (item.type === GrammarlangLexer.NONTERMINAL && !nullableNonTerminals[item.value]) {
                    return;
                }
            }
        });

    });
    return result;
}

function calculateFirstSetsDependencies(grammar) {
    const result = {};
    const nullableNonTerminals = calculateNullables(grammar).nullableNonTerminals; // TODO reuse precomputed values
    getNonTerminals(grammar).forEach(l => {
        result[l] = [];
        grammar[l].forEach((r, index) => {
            result[l][index] = new Set();
            for (const item of r) {
                if (item.type === GrammarlangLexer.TERMINAL) {
                    break;
                } else {
                    result[l][index].add(item.value);
                    if (!nullableNonTerminals[item.value]) {
                        break;
                    }
                }
            }
        });
    });
    return result;
}

// TODO use memoization
function getAggregateFirstSet(set, nonTerminal, index) {
    const result = new Set();
    set[nonTerminal].forEach(item => {
        item[index].forEach(v => result.add(v));
    })
    return result;
}

function calculateFirstSets(grammar) {
    const firstSets = initializeFirstSets(grammar);
    const depencencies = calculateFirstSetsDependencies(grammar);
    let doLoop = true;
    let loopIndex = 0;

    while (doLoop) {
        doLoop = false;

        Object.keys(firstSets).forEach(l => {
            firstSets[l].forEach((item, index) => {
                const currentSet = item[item.length - 1];
                const nextSet = Array.from(item[item.length - 1]);
                const dependency = depencencies[l][index];
                dependency.forEach(nonTerminal => {
                    getAggregateFirstSet(firstSets, nonTerminal, loopIndex).forEach(v => {
                        if (!currentSet.includes(v)) {
                            doLoop = true;
                            nextSet.push(v);
                        }
                    });
                });
                item.push(nextSet.sort());
            });
        });
        loopIndex++;
    }
    return firstSets;
}

function calculateFollowSetDipendencies(grammar,axiom='S') //First run for follow sets: gets non terminals and terminals next to each non terminal
{
    var follow_nonTerminals = {}
    var follow_terminals = {}
    getNonTerminals(grammar).forEach(it => {
        follow_nonTerminals[it] = [];
        follow_terminals[it] = [[]];
    });
    getNonTerminals(grammar).forEach(l => {
        var pushNext = false;
        getNonTerminals(grammar).forEach(f => {
            grammar[f].forEach(r => {
                var lastNT = undefined;
                for (const item of r) {
                    if (pushNext) {
                        if (item.type === GrammarlangLexer.NONTERMINAL) {
                            const tmp_itemInits = calculateFirstSets(grammar)[item.value];
                            tmp_itemInits.forEach(x => {
                                const tmp_follows = x[0];
                                tmp_follows.forEach(t => {
                                    if (!follow_terminals[l][0].includes(t))
                                        follow_terminals[l][0].push(t);
                                });
                            });

                            if (calculateNullables(grammar)[item.value] === false)
                                pushNext = false;
                        }
                        else if (item.type === GrammarlangLexer.TERMINAL) {
                            if (!follow_terminals[l][0].includes(item.value))
                                follow_terminals[l][0].push(item.value);
                            pushNext = false;
                        }
                    }
                    if (item.value === l) {
                        pushNext = true;
                    }
                    if (item.type === GrammarlangLexer.NONTERMINAL) {
                        lastNT = item.value;
                    } else {
                        lastNT = undefined;
                    }
                }
                if (pushNext) {
                    if (!follow_nonTerminals[l].includes(f))
                        follow_nonTerminals[l].push(f); //if I find l at the end, f's follows are inherited
                }
                if (lastNT) {
                    if (!follow_nonTerminals[lastNT].includes(f))
                        follow_nonTerminals[lastNT].push(f);
                }
            });
        });

    });
    follow_terminals[axiom][0].push("↙");
    return {
        follow_nonTerminals: follow_nonTerminals,
        follow_terminals: follow_terminals
    }
}

function calculateFollowSets(grammar,axiom) {
    var followsets = {}
    const non_terminals = calculateFollowSetDipendencies(grammar,axiom).follow_nonTerminals;
    const initial_followsets = calculateFollowSetDipendencies(grammar,axiom).follow_terminals;
    followsets = initial_followsets;
    var iteration = 0;
    var goahead = true;
    do {
        iteration += 1;
        Object.keys(non_terminals).forEach(e => {
            followsets[e][iteration] = followsets[e][iteration - 1].slice();
        });
        Object.keys(non_terminals).forEach(e => {
            non_terminals[e].forEach(nt => {
                followsets[nt][iteration - 1].forEach(fs => {
                    if (!followsets[e][iteration].includes(fs))
                        followsets[e][iteration].push(fs);
                });

            });
            followsets[e][iteration].sort();
        });
        goahead = isDifferent(followsets, iteration);
    } while (goahead);
    return followsets;
}

function isDifferent(obj, iter) {
    var ret = false;
    Object.keys(obj).forEach(e => {
        var newRow = obj[e][iter];
        var oldRow = obj[e][iter - 1];

        if (newRow.length != oldRow.length)
            ret = true;
    });
    return ret;
}

function calculateLookAheads(grammar) {
    var ret = {};
    const firstSets = calculateFirstSets(grammar);
    const followSets = calculateFollowSets(grammar);
    const nullableRules = calculateNullables(grammar).nullableRules;
    getNonTerminals(grammar).forEach(l => {
        ret[l] = [];
        grammar[l].forEach((r, index) => {
            ret[l][index] = [];
            const tmp_inits = firstSets[l][index][firstSets[l][index].length - 1];
            tmp_inits.forEach(i => {
                ret[l][index].push(i);
            });
            if (nullableRules[l][index]) {
                const tmp_follows = followSets[l][followSets[l].length - 1];
                tmp_follows.forEach(f => {
                    if (!ret[l][index].includes(f))
                        ret[l][index].push(f);
                });

            }
            ret[l][index].sort();
        });
    });
    return ret;
}

module.exports.calculateNullables = calculateNullables;
module.exports.initializeFirstSets = initializeFirstSets;
module.exports.calculateFirstSetsDependencies = calculateFirstSetsDependencies;
module.exports.calculateFirstSets = calculateFirstSets;
module.exports.calculateFollowSets = calculateFollowSets;
module.exports.calculateFollowSetDipendencies = calculateFollowSetDipendencies;
module.exports.calculateLookAheads = calculateLookAheads;