const ll1 = require('./ll1');
const parser = require('./parser');

const validate = (grammarString) => {
    const parsedValue = parser.parseString(grammarString);
    const firstSets = ll1.calculateFirstSets(parsedValue);
    const followSets = ll1.calculateFollowSets(parsedValue);
    const firstSetsDependencies = ll1.calculateFirstSetsDependencies(parsedValue);
    const followSetsDependencies = ll1.calculateFollowSetDependencies(parsedValue);
    const lookAheads = ll1.calculateLookAheads(parsedValue);
    const isLL1 = ll1.isLL1(parsedValue);
    const lookAheadsConflicts = ll1.calculateAllConflicts(parsedValue);

    return {
        ...parsedValue,
        firstSets,
        followSets,
        firstSetsDependencies,
        followSetsDependencies,
        lookAheads,
        isLL1,
        lookAheadsConflicts
    }
}

module.exports = Object.freeze({
    ll1, parser, validate
})
