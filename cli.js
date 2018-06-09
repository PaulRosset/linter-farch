#!/usr/bin/env node
"use strict";

const meow = require("meow");
const chalk = require("chalk");
const getInput = require("./src/index");
const path = require("path");
const fs = require("fs");
const loadJsonFile = require("load-json-file");
const { displayRec } = require("./src/display");

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
    Promise.resolve()
      .then(() => {
        const data = fs.existsSync(path.resolve("farch.json"))
          ? loadJsonFile.sync(path.resolve("farch.json"))
          : loadJsonFile.sync(path.resolve("package.json"));
        return data;
      })
      .then(data => {
        return Promise.all(getInput(data, cli.flags)).then(report => report);
      })
      .then(dataToDisplay => {
        console.log(chalk`\n    {bold ${"Report linter-farch:\n"}}`);
        displayRec(dataToDisplay);
      });
  } catch (e) {
    if (e) {
      console.log(chalk`      {red.bold ${e.message}}`);
      return;
    }
  }
};

main();
