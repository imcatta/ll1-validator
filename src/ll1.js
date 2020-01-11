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

function calculateFollowSetDependencies(grammar,axiom='S') //First run for follow sets: gets non terminals and terminals next to each non terminal
{
    var follow_nonTerminals = {}
    var follow_terminals = {}
    getNonTerminals(grammar).forEach(it => {
        follow_nonTerminals[it] = [];
        follow_terminals[it] = [[]];
    });
    follow_terminals[axiom][0].push("↙");
    getNonTerminals(grammar).forEach(l => {
        getNonTerminals(grammar).forEach(f => {
            grammar[f].forEach(r => {
                var pushNext = false; //if true, the item that comes next is in the follow set of l
                //var lastNT = undefined;
                for (const item of r) {
                    if (pushNext) {
                        if (item.type === GrammarlangLexer.NONTERMINAL) {
                            const tmp_itemInits = calculateFirstSets(grammar)[item.value];
                            tmp_itemInits.forEach(x => {
                                const tmp_follows = x[x.length-1];
                                tmp_follows.forEach(t => {
                                    if (!follow_terminals[l][0].includes(t)){
                                        follow_terminals[l][0].push(t);                                        
                                    }
                                });
                            });

                            if (calculateNullables(grammar).nullableNonTerminals[item.value] === false){
                                pushNext = false;
                            }
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
                    //duplicated control - TO DELETE
                    /*if (item.type === GrammarlangLexer.NONTERMINAL) {
                        lastNT = item.value;
                    } else {
                        lastNT = undefined;
                    }*/
                }
                if (pushNext) {
                    if (!follow_nonTerminals[l].includes(f))
                        follow_nonTerminals[l].push(f); //if I find l at the end, f's follows are inherited
                }
                /*if (lastNT) {
                    if (!follow_nonTerminals[lastNT].includes(f))
                        follow_nonTerminals[lastNT].push(f);
                }*/
            });
        });
    });
    return {
        follow_nonTerminals: follow_nonTerminals,
        follow_terminals: follow_terminals
    }
}

function calculateFollowSets(grammar) {
    var followsets = {}
    const axiom= grammar._start_symbol
    const non_terminals = calculateFollowSetDependencies(grammar,axiom).follow_nonTerminals;
    const initial_followsets = calculateFollowSetDependencies(grammar,axiom).follow_terminals;
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
    const axiom= grammar._start_symbol
    const firstSets = calculateFirstSets(grammar);
    const followSets = calculateFollowSets(grammar,axiom);
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

function isLL1(grammar){
    const lookaheads= calculateLookAheads(grammar);
    var res=true;
    Object.keys(lookaheads).forEach(l =>{
        const conf=calculateConflicts(l,grammar,lookaheads).length;
        if(conf>0){
            res= false;
            
        }
    });
    return res;
}

function calculateConflicts(nonTerminal,grammar=[],lookaheads=[]){ //grammar and/or followsets MUST BE passed
    var terminals =[];
    var ret=[];
    if (lookaheads==[]){
        lookaheads=calculateLookAheads(grammar);
    }
    lookaheads[nonTerminal].forEach(r=>{
    r.forEach(t=>{
        if(terminals.includes(t)){
            if(!ret.includes(t))
                ret.push(t);
        }
        else{
            terminals.push(t);
        }
        });
    });
    return ret;
}

function calculateAllConflicts(grammar){
    const lookaheads= calculateLookAheads(grammar);
    var res={};
    Object.keys(lookaheads).forEach(l =>{
        const conf=calculateConflicts(l,grammar,lookaheads);
        res[l]=conf.slice();
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
module.exports.calculateAllConflicts= calculateAllConflicts;