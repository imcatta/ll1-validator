import * as ll1 from "./ll1";

var grammar={};

var firstset={
    cache:{},
    get value (){
        return this.cache;
    }
};
var firstDependencies={
    cache:{},
    get value(){
        return this.cache;
    }
};
var followset={
    cache:{},
    get value(){
        return this.cache;
    }
};
var followDependencies={
    cache:{},
    get value(){
        return this.cache;
    }
};
var lookahead={
    cache:{},
    get value(){
        return this.cache;
    }
};

var isLL1={
    cache:undefined,
    get value(g={}){
        return this.cache;
    }
};
var conflictset={
    cache={},
    get value(){
        return this.cache;
    }
};

var nullables={
    cache={},
    get value(){
        return this.cache;
    }
};

function clear(){
    firstset={};
    followset={};
    lookahead={};
    isLL1=undefined;
    grammar={};
    conflictset={};
}

function newgrammar(g){
    grammar=g;
    nullables.value=ll1.calculateNullables(g);
    firstset.value=ll1.calculateFirstSets(g);
    followset.value=ll1.calculateFollowSets(g);
    firstDependencies.value=ll1.calculateFirstSetsDependencies(g);
    followDependencies.value=ll1.calculateFollowSetDependencies(g,g._start_symbol);
    conflictset=ll1.calculateAllConflicts(g);
    isLL1.value=ll1.isLL1(g);
}

module.exports.newgrammar = newgrammar;
module.exports.clear = clear;
module.exports.nullables = nullables.value;
module.exports.firstDependencies =firstDependencies.value ;
module.exports.followDependencies = followDependencies.value;
module.exports.firstset =firstset.value ;
module.exports.followset = followset.value;
module.exports.conflictset =conflictset.value ;
module.exports.isLL1 =isLL1.value ;
