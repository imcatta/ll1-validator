
# LL(1) Validator

[![npm version](https://badge.fury.io/js/ll1-validator.svg)](https://badge.fury.io/js/ll1-validator)
![](https://github.com/imcatta/ll1-validator/workflows/Node%20CI/badge.svg)
![](https://github.com/imcatta/ll1-validator/workflows/Node.js%20Package/badge.svg)

LL(1) Validator is a javascript package that checks if a given a [context-free grammar](https://en.wikipedia.org/wiki/Context-free_grammar) is a [LL(1) grammar](https://en.wikipedia.org/wiki/LL_grammar).

The user manual can be found [here](https://drive.google.com/open?id=1lqKTJiMnvf4HXYfh-OO2cxB2bZgDE8sB).

## Install
```bash
npm install --save ll1-validator
```

## Usage
```javascript
const ll1Validator = require('ll1-validator');
const input = `
S -> A q;
A -> a A;
A -> ;
`;
const result = ll1Validator.validate(input);
console.log(result);
```
```javascript
{
  "grammar": {
    "S": [
      [
        {
          "type": parsers.NONTERMINAL,
          "value": "A"
        },
        {
          "type": parsers.TERMINAL,
          "value": "q"
        }
      ]
    ],
    "A": [
      [
        {
          "type": parsers.TERMINAL,
          "value": "a"
        },
        {
          "type": parsers.NONTERMINAL,
          "value": "A"
        }
      ],
      []
    ]
  },
  "startSymbol": "S",
  "rulesNumber": 3,
  "terminals": [
    "a",
    "q"
  ],
  "nonTerminals": [
    "A",
    "S"
  ],
  "warnings": [],
  "nullableRules": {
    "A": [
      false,
      true
    ],
    "S": [
      false
    ]
  },
  "nullableNonTerminals": {
    "A": true,
    "S": false
  },
  "firstSets": {
    "A": [
      [
        [
          "a"
        ],
        [
          "a"
        ],
        [
          "a"
        ]
      ],
      [
        [],
        [],
        []
      ]
    ],
    "S": [
      [
        [
          "q"
        ],
        [
          "a",
          "q"
        ],
        [
          "a",
          "q"
        ]
      ]
    ]
  },
  "followSets": {
    "A": [
      [
        "q"
      ],
      [
        "q"
      ]
    ],
    "S": [
      [
        "↙"
      ],
      [
        "↙"
      ]
    ]
  },
  "firstSetsDependencies": {
    "A": [
      {},
      {}
    ],
    "S": [
      {}
    ]
  },
  "followSetsDependencies": {
    "follow_nonTerminals": {
      "A": [
        "A"
      ],
      "S": []
    },
    "follow_terminals": {
      "A": [
        [
          "q"
        ]
      ],
      "S": [
        [
          "↙"
        ]
      ]
    }
  },
  "lookAheads": {
    "A": [
      [
        "a"
      ],
      [
        "q"
      ]
    ],
    "S": [
      [
        "a",
        "q"
      ]
    ]
  },
  "isLL1": true,
  "lookAheadsConflicts": {
    "A": [],
    "S": []
  }
}
```

## Running in a browser

If you want to use LL(1) Validator in a browser we recommend you to use [Webpack](https://webpack.js.org/). You also need to mock some Node.js modules by putting this lines in your `webpack.config.js`.

```javascript
node: {
  fs: 'empty',
  module: 'empty',
  net: 'empty',
},
```

For more information see the [ANTLR documentation](https://github.com/antlr/antlr4/blob/master/doc/javascript-target.md#how-do-i-get-the-runtime-in-my-browser).

## Built With

* [ANTLR](https://www.antlr.org/) - A powerful parser generator for reading, processing, executing, or translating structured text or binary files.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [releases on this repository](https://github.com/imcatta/ll1-validator/releases). 

## Contributing

1. [Fork the repo](<https://github.com/imcatta/ll1-validator/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Authors

* Andrea Cattaneo ([www.andreacattaneo.dev](https://www.andreacattaneo.dev))
* Matteo Locatelli
