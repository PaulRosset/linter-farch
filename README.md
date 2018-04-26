<h1 align="center">
	<br>
	<br>
	<img width="320" src="media/logo.png" alt="farch">
	<br>
	<br>
	<br>
</h1>

> API to control filenames of a project 👁

[![Travis CI Build Status](https://travis-ci.org/PaulRosset/linter-farch.svg?branch=master)](https://travis-ci.org/PaulRosset/linter-farch)
[![npm version](https://badge.fury.io/js/linter-farch.svg)](https://badge.fury.io/js/linter-farch)
[![Code Coverage](https://img.shields.io/codecov/c/github/PaulRosset/linter-farch.svg)](https://travis-ci.org/PaulRosset/linter-farch)

## Install

```sh
yarn add linter-farch
```

## Usage

```js
const getInput = require("linter-farch")

const packageJsonFIle = {...}
const report = getInput(packageJsonFile)
console.log(report) // Return informations that can be used to display.
```

### More

[CLI tool with this API](https://github.com/PaulRosset/linter-farch-cli)

## License

MIT Paul Rosset
