#!/usr/bin/env node
"use strict";

const meow = require("meow");
const chalk = require("chalk");
const assert = require("assert");
const getInput = require("./src/index");
const path = require("path");
const fs = require("fs");
const loadJsonFile = require("load-json-file");

const cli = meow(
  `
	Usage
	  $ farch
	Examples
	  $ farch
`
);

const main = () => {
  try {
    const data = fs.existsSync(path.resolve("farch.json"))
      ? loadJsonFile.sync(path.resolve("farch.json"))
      : loadJsonFile.sync(path.resolve("package.json"));
    const report = getInput(data);
    console.log(`\n    Report ${chalk.bold("linter-farch:\n")}`);

    report.map((dir, index) => {
      const path = Object.keys(dir)[0];
      console.log(`    Directory: ${chalk.bold.blue(Object.keys(dir)[0])}`);
      dir[path].map(file => {
        if (!file.isCorrectSyntax) {
          console.log(
            `      ${chalk.underline(file.fileName)} - ${chalk.bold.red("●")}`
          );
          assert.fail(`${file.fileName} doesn't match ${file.assertRegex}`);
          process.exit(2);
        } else {
          console.log(
            `      ${chalk.underline(file.fileName)} - ${chalk.bold.green("✓")}`
          );
        }
      });
    });
  } catch (e) {
    if (e) {
      console.log(`      ${chalk.bold.red(e.message)}`);
      return;
    }
  }
};

main();
