#!/usr/bin/env node
"use strict";

const meow = require("meow");
const chalk = require("chalk");
const assert = require("assert");
const getInput = require("./src/index");
const path = require("path");
const fs = require("fs");
const loadJsonFile = require("load-json-file");
const { display, displayRec } = require("./src/display");

const cli = meow(
  `
	Usage
	  $ farch
	Examples
    $ farch
  Options
    -R   Allow to perform assertion recursively
`,
  {
    flags: {
      R: {
        type: "boolean"
      }
    }
  }
);

const main = () => {
  try {
    const data = fs.existsSync(path.resolve("farch.json"))
      ? loadJsonFile.sync(path.resolve("farch.json"))
      : loadJsonFile.sync(path.resolve("package.json"));
    const report = getInput(data, cli.flags);
    console.log(chalk`\n    {bold ${"Report linter-farch:\n"}}`);
    cli.flags.R ? displayRec(report) : display(report);
  } catch (e) {
    if (e) {
      console.log(chalk`      {red.bold ${e.message}}`);
      return;
    }
  }
};

main();
