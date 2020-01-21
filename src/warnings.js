class DuplicatedRuleWarning {
    constructor(nonTerminal, index) {
        this.message = 'Duplicated rule';
        this.nonTerminal = nonTerminal;
        this.index = index;
    }
}

module.exports = Object.freeze({ DuplicatedRuleWarning });