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
  const reportFinal = {
    errors: 0,
    success: 0,
    all: 0
  };
  try {
    const data = fs.existsSync(path.resolve("farch.json"))
      ? loadJsonFile.sync(path.resolve("farch.json"))
      : loadJsonFile.sync(path.resolve("package.json"));
    const report = getInput(data);
    console.log(`\n    ${chalk.bold("Report linter-farch:\n")}`);

    report.map((dir, index) => {
      const path = Object.keys(dir)[0];
      console.log(`    Directory: ${chalk.bold.blue(Object.keys(dir)[0])}`);
      dir[path].map(file => {
        reportFinal.all += 1;
        if (!file.isCorrectSyntax) {
          console.log(
            `      ${chalk.underline(file.fileName)} - ${chalk.bold.red("●")}`
          );
          console.log(
            chalk.bold.red(
              `        ${file.fileName} doesn't match /${file.assertRegex}/`
            )
          );
          reportFinal.errors += 1;
        } else {
          console.log(
            `      ${chalk.underline(file.fileName)} - ${chalk.bold.green("✓")}`
          );
          reportFinal.success += 1;
        }
      });
    });
    console.log(
      `\n${chalk.bold.white("Tested files:")} ${chalk.bold.white(
        `${reportFinal.all} tests`
      )}\n${chalk.bold.white("Tests passed:")} ${chalk.bold.green(
        `${reportFinal.success} Passed`
      )}\n${chalk.bold.white("Tests failed:")} ${chalk.bold.red(
        `${reportFinal.errors} Failed`
      )}`
    );
    reportFinal.errors > 0 ? process.exit(2) : process.exit(0);
  } catch (e) {
    if (e) {
      console.log(`      ${chalk.bold.red(e.message)}`);
      return;
    }
  }
};

main();
