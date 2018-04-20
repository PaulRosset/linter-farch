#!/usr/bin/env node
"use strict";

const fs = require("fs");
const meow = require("meow");
const chalk = require("chalk");

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

const getFileNamesFromDir = path => {
  try {
    const files = fs.readdirSync(path);
    const onlyFileName = filterFileNamesAssertable(files, path);
    return onlyFileName;
  } catch (e) {
    if (e) {
      console.log(chalk.bold.red(e.message));
      return;
    }
  }
};

const filterFileNamesAssertable = (files, path) => {
  return files.filter(file => {
    const stats = fs.statSync(`${path}/${file}`, "utf8");
    return stats.isFile();
  });
  return assertableFiles;
};

const assertFileNameAgainstRegex = files => {};

const main = cli => {
  const files = getFileNamesFromDir(cli.input[0]);
  console.log(files);
};

main(cli);
