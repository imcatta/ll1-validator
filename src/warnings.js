class DuplicatedRuleWarning {
    constructor(nonTerminal, index, sameAs) {
        this.message = 'Duplicated rule';
        this.nonTerminal = nonTerminal;
        this.index = index;
        this.sameAs = sameAs;
    }
}

class UnreachableRuleWarning {
    constructor(nonTerminal) {
        this.message = 'Unreachable rule';
        this.nonTerminal = nonTerminal;
    }
}

module.exports = Object.freeze({ DuplicatedRuleWarning, UnreachableRuleWarning });