const GrammarlangLexer = require('../grammarlang/grammarlangLexer').grammarlangLexer;

function calculateNullables(grammar) {
    const nonTerminals = Object.keys(grammar);
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
    Object.keys(grammar).forEach(l => {
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
    Object.keys(grammar).forEach(l => {
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

module.exports.calculateNullables = calculateNullables;
module.exports.initializeFirstSets = initializeFirstSets;
module.exports.calculateFirstSetsDependencies = calculateFirstSetsDependencies;
module.exports.calculateFirstSets = calculateFirstSets;
