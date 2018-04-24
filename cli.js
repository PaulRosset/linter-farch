#!/usr/bin/env node
"use strict";

const fs = require("fs");
const meow = require("meow");
const chalk = require("chalk");
const assert = require("assert");

const cli = meow(
  `
	Usage
	  $ farch [<directory>]
	Options
	  --custom -c Ignore the config file, instead use the Regex passed in argument for the directory specified in argument.
	Examples
	  $ farch src/
	  $ farch
`,
  {
    inferType: true,
    flags: {
      custom: {
        type: "string",
        alias: "c"
      }
    }
  }
);

const getFileNamesFromDir = inputs => {
  try {
    return inputs.map(entry => {
      const files = fs.readdirSync(entry.path);
      const filesInSpecificDir = assertFilesInDir(
        files,
        entry.path,
        entry.regex
      );
      return {
        [entry.path]: filesInSpecificDir
      };
    });
  } catch (e) {
    if (e) {
      console.log(chalk.bold.red(e.message));
      process.exit(2);
    }
  }
};

const assertFilesInDir = (files, path, regex) => {
  return files
    .filter(file => {
      const stats = fs.statSync(`${path}/${file}`, "utf8");
      return stats.isFile();
    })
    .map(file => ({
      fileName: file,
      pathFileName: `${path}/${file}`,
      isCorrectSyntax: new RegExp(regex).test(file),
      assertRegex: regex
    }));
};

const main = cli => {
  const { farch } = cli.pkg;
  const inputs = [];
  for (const key in farch) {
    inputs.push({ path: key, regex: farch[key] });
  }
  if (inputs.length === 0) {
    console.log(chalk.red("No farch config found in package.json!"));
    return;
  } else {
    try {
      const report = getFileNamesFromDir(inputs);
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
          } else {
            console.log(
              `      ${chalk.underline(file.fileName)} - ${chalk.bold.green(
                "✓"
              )}`
            );
          }
        });
      });
    } catch (e) {
      if (e) {
        console.log(`      ${chalk.bold.red(e.message)}`);
      }
    }
  }
};

main(cli);
