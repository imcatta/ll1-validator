
# LL(1) Validator

[![npm version](https://badge.fury.io/js/ll1-validator.svg)](https://badge.fury.io/js/ll1-validator)
![](https://github.com/imcatta/ll1-validator/workflows/Node%20CI/badge.svg)
![](https://github.com/imcatta/ll1-validator/workflows/Node.js%20Package/badge.svg)

LL(1) Validator is a javascript package that checks if a given a [context-free grammar](https://en.wikipedia.org/wiki/Context-free_grammar) is a [LL(1) grammar](https://en.wikipedia.org/wiki/LL_grammar).

## Usage

TODO

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
