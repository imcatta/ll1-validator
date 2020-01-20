const parser = require('./parser');
const errors = require('./errors');

function calculateNullables(input) {
    const grammar = input.grammar;
    const nonTerminals = input.nonTerminals;
    const nullableRules = {};
    const nullableNonTerminals = {};
    let doLoop = true;
    let remainingCycles = input.rulesNumber;
    nonTerminals.forEach(l => nullableRules[l] = []);


    while (doLoop) {
        if (remainingCycles < 0) {
            let involvedNT = [];
            nonTerminals.forEach(l => {
                nullableRules[l].forEach((rule, index) => {
                    if (rule === undefined) {
                        const ruleString = grammar[l][index].map(v => v.value).join(' ');
                        involvedNT.push(`[${l} -> ${ruleString}]`);
                    }
                });
            });
            throw new errors.SemanticError(`Loop detected: ${involvedNT.sort().join(', ')}`);
        }
        doLoop = false;
        remainingCycles -= 1;

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

    return { nullableRules, nullableNonTerminals }
}

function ruleIsNullable(rule, nullableNonTerminals) {
    let currentResult = true;
    for (const item of rule) {
        if (item.type === parser.TERMINAL) {
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

function initializeFirstSets(input) {
    const grammar = input.grammar;
    const result = {};
    const nullableNonTerminals = calculateNullables(input).nullableNonTerminals; // TODO reuse precomputed values
    input.nonTerminals.forEach(l => {
        result[l] = [];
        grammar[l].forEach((r, index) => {
            result[l][index] = [[]];
            for (const item of r) {
                if (item.type === parser.TERMINAL) {
                    result[l][index][0].push(item.value);
                    return;
                }
                if (item.type === parser.NONTERMINAL && !nullableNonTerminals[item.value]) {
                    return;
                }
            }
        });

    });
    return result;
}

function calculateFirstSetsDependencies(input) {
    const grammar = input.grammar;
    const result = {};
    const nullableNonTerminals = calculateNullables(input).nullableNonTerminals; // TODO reuse precomputed values
    input.nonTerminals.forEach(l => {
        result[l] = [];
        grammar[l].forEach((r, index) => {
            result[l][index] = new Set();
            for (const item of r) {
                if (item.type === parser.TERMINAL) {
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

function getAggregateFirstSet(set, nonTerminal, index) {
    const result = new Set();
    set[nonTerminal].forEach(item => {
        item[index].forEach(v => result.add(v));
    })
    return result;
}

function calculateFirstSets(input) {
    const firstSets = initializeFirstSets(input);
    const depencencies = calculateFirstSetsDependencies(input);
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

function calculateFollowSetDependencies(input) //First run for follow sets: gets non terminals and terminals next to each non terminal
{
    const grammar = input.grammar;
    const axiom = input.startSymbol;
    var follow_nonTerminals = {}
    var follow_terminals = {}
    input.nonTerminals.forEach(it => {
        follow_nonTerminals[it] = [];
        follow_terminals[it] = [[]];
    });
    follow_terminals[axiom][0].push("↙");
    input.nonTerminals.forEach(l => {
        input.nonTerminals.forEach(f => {
            grammar[f].forEach(r => {
                var pushNext = false; //if true, the item that comes next is in the follow set of l
                for (const item of r) {
                    if (pushNext) {
                        if (item.type === parser.NONTERMINAL) {
                            const tmp_itemInits = calculateFirstSets(input)[item.value];
                            tmp_itemInits.forEach(x => {
                                const tmp_follows = x[x.length - 1];
                                tmp_follows.forEach(t => {
                                    if (!follow_terminals[l][0].includes(t)) {
                                        follow_terminals[l][0].push(t);
                                    }
                                });
                            });

                            if (calculateNullables(input).nullableNonTerminals[item.value] === false) {
                                pushNext = false;
                            }
                        }
                        else if (item.type === parser.TERMINAL) {
                            if (!follow_terminals[l][0].includes(item.value))
                                follow_terminals[l][0].push(item.value);
                            pushNext = false;
                        }
                    }
                    if (item.value === l) {
                        pushNext = true;
                    }
                }
                if (pushNext) {
                    if (!follow_nonTerminals[l].includes(f))
                        follow_nonTerminals[l].push(f); //if I find l at the end, f's follows are inherited
                }

            });
        });
    });
    return {
        follow_nonTerminals: follow_nonTerminals,
        follow_terminals: follow_terminals
    }
}

function calculateFollowSets(input) {
    var followsets = {}
    const axiom = input.startSymbol;
    const followSetsDep = calculateFollowSetDependencies(input)
    const non_terminals = followSetsDep.follow_nonTerminals;
    const initial_followsets = followSetsDep.follow_terminals;
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

function calculateLookAheads(input) {
    const grammar = input.grammar;
    var ret = {};
    const axiom = input.startSymbol;
    const firstSets = calculateFirstSets(input);
    const followSets = calculateFollowSets(input, axiom);
    const nullableRules = calculateNullables(input).nullableRules;
    input.nonTerminals.forEach(l => {
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

function isLL1(input) {
    const lookaheads = calculateLookAheads(input);
    var res = true;
    Object.keys(lookaheads).forEach(l => {
        const conf = calculateConflicts(l, input, lookaheads).length;
        if (conf > 0) {
            res = false;

        }
    });
    return res;
}

function calculateConflicts(nonTerminal, input = {}, lookaheads = []) { // input and/or followsets MUST BE passed
    var terminals = [];
    var ret = [];
    if (lookaheads == []) {
        lookaheads = calculateLookAheads(input);
    }
    lookaheads[nonTerminal].forEach(r => {
        r.forEach(t => {
            if (terminals.includes(t)) {
                if (!ret.includes(t))
                    ret.push(t);
            }
            else {
                terminals.push(t);
            }
        });
    });
    return ret;
}

function calculateAllConflicts(input) {
    const lookaheads = calculateLookAheads(input);
    var res = {};
    Object.keys(lookaheads).forEach(l => {
        const conf = calculateConflicts(l, input, lookaheads);
        res[l] = conf.slice();
    });
    return res;
}


module.exports.calculateNullables = calculateNullables;
module.exports.initializeFirstSets = initializeFirstSets;
module.exports.calculateFirstSetsDependencies = calculateFirstSetsDependencies;
module.exports.calculateFirstSets = calculateFirstSets;
module.exports.calculateFollowSets = calculateFollowSets;
module.exports.calculateFollowSetDependencies = calculateFollowSetDependencies;
module.exports.calculateLookAheads = calculateLookAheads;
module.exports.isLL1 = isLL1;
module.exports.calculateConflicts = calculateConflicts;
module.exports.calculateAllConflicts = calculateAllConflicts;