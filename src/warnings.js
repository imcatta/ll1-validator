class DuplicatedRuleWarning {
    constructor(nonTerminal, index) {
        this.message = 'Duplicated rule';
        this.nonTerminal = nonTerminal;
        this.index = index;
    }
}

class UnreachableRuleWarning {
    constructor(nonTerminal) {
        this.message = 'Unreachable rule';
        this.nonTerminal = nonTerminal;
    }
}

module.exports = Object.freeze({ DuplicatedRuleWarning, UnreachableRuleWarning });