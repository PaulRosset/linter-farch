<h1 align="center">
	<br>
	<br>
	<img width="320" src="media/logo.png" alt="farch">
	<br>
	<br>
	<br>
</h1>

> Make sure the file-names stay the same, control them! 👁

[![Travis CI Build Status](https://travis-ci.org/PaulRosset/linter-farch.svg?branch=master)](https://travis-ci.org/PaulRosset/linter-farch)
[![npm version](https://badge.fury.io/js/linter-farch.svg)](https://badge.fury.io/js/linter-farch)
[![Code Coverage](https://img.shields.io/codecov/c/github/PaulRosset/linter-farch.svg)](https://travis-ci.org/PaulRosset/linter-farch)

## Motivation

More and more frameworks that have been created recently gave the possibility to the user to write content in markdown, like [Gatsby](https://github.com/gatsbyjs/gatsby) or [Docusaurus](https://github.com/facebook/docusaurus), but sometimes if you collaborate with multiples people on these markdown files, keeping a clean file-name is more important than ever. That's why I created this tiny linter to force people to respect a file-name architecture in order the keep everything clean and understandable.  
Of course, many other usages can be considered.

## Install

```sh
yarn add --dev linter-farch
```

## Usage

Once installed, a small and quick configuration is needed in the `package.json` file.  
The `package.json` file is used here, to avoid creating another file with a purpose of configuration.

### Configuration:

For the configuration, two possibles way can be taken, the first is the `package.json` file like below (essentially for the JS project and if you don't want to create another config file):

In the `package.json` file:

```json
{
  "farch": {
    "src": "([a-z]*-[0-9]{4})[.]*[a-z]*",
    "src/utilities": "[a-z]*",
    "src/utilities/*.js": "[a-z]"
  }
}
```
> You can use [`glob`](http://man7.org/linux/man-pages/man3/glob.3.html) as key/path to provide more flexibility to capture the wanted files.

- Creating regex can be hard or simply boring, that's why you can simply put template placeholder like this:

```json
{
  "farch": {
    "src": "([a-z]*-[0-9]{4})[.]*[a-z]*",
    "src/utilities": ["LOWER_CAMEL_CASE", "[a-z]*"],
    "src/utilities/*.js": "[a-z]"
  }
}
```

You can find any template placeholder already create [here](https://github.com/PaulRosset/linter-farch/blob/master/src/template.js), feel free to contribute by adding more template/placeholder regex.

------

But, there is still the possibility to create a `farch.json` config file at the root of the project, essentially for the non-js project or if you don't want to put the configuration in your `package.json`.

```json
{
  "farch": {
    "src": "([a-z]*-[0-9]{4})[.]*[a-z]*",
    "src/utilities": "[a-z]*"
  }
}
```

> `farch.json` file have the priority over the `package.json` file.

Inside the `farch` property, insert the directory that you want to test:  
Pass as `key`, the path from the root directory to the target directory, then in value pass `regex` to match.

**Then, you are all set!**

### Execution

To avoid creating tons of rules if you have a lot of directory nested and they apply to the same assertion you can pass `-R`, hence it will recursively check all the directory.

At the root of your project:

```sh
npx farch
```

or

Insert it in your `package.json` file:

```json
{
  "scripts": {
    "test": "farch ((-R))"
  }
}
```

**And run `CI` on it !**

### Output

<div align="center">
	<img src="media/demo1.png" width="320" alt="output-farch"/>
</div>

## License

MIT Paul Rosset
