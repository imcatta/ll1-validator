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
            return false
        }
        if (nullableNonTerminals[item.value] === undefined) {
            currentResult = undefined
        }
    }
    return currentResult;
}

module.exports.calculateNullables = calculateNullables;