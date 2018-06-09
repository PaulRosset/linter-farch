"use strict";

const chalk = require("chalk");

const reportFinal = {
  errors: 0,
  success: 0,
  all: 0
};

const displayRes = reportFinal => {
  console.log(chalk`
    {bold.white Tested files: ${reportFinal.all} tests}.
    \t\t  {green.bold ${reportFinal.success} passed}.
    \t\t  {red.bold ${reportFinal.errors} failed}.
  `);
  process.exit(reportFinal.errors > 0 ? 2 : 0);
};

const displayRec = report => {
  report.map((dir, key) => {
    const path = Object.keys(dir);
    console.log(chalk`    Directory: {blue.bold ${path}}`);
    dir[path].map(file => {
      reportFinal.all += 1;
      if (!file.isCorrectSyntax) {
        console.log(chalk`      {underline ${file.fileName}} - {red.bold ●}`);
        console.log(
          chalk`        {red.bold ${file.fileName}} doesn't match /${
            file.assertRegex
          }/`
        );
        reportFinal.errors += 1;
      } else {
        console.log(
          chalk`        {underline ${file.fileName}} - {green.bold ✓}`
        );
        reportFinal.success += 1;
      }
    });
  });
  displayRes(reportFinal);
};

module.exports = {
  displayRec
};
