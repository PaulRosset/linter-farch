"use strict";

const globby = require("globby");

const assertFiles = (inputs, rec) => {
  return inputs.map(async file => {
    const filesToTest = await globby([file.path], {
      deep: rec ? true : false
    });
    return {
      [file.path]: filesToTest.map(fileToTest => {
        const fileSimple = fileToTest.split("/");
        const fileNameindex = fileSimple.length - 1;
        return {
          fileName: fileSimple[fileNameindex],
          pathFileName: fileToTest,
          isCorrectSyntax: new RegExp(file.regex).test(
            fileSimple[fileNameindex]
          ),
          assertRegex: file.regex
        };
      })
    };
  });
};

module.exports = (config, opts) => {
  const { farch } = config;
  const inputs = [];
  for (const key in farch) {
    inputs.push({ path: key, regex: farch[key] });
  }
  if (inputs.length === 0) {
    throw new Error("No farch config found in farch.js or package.json!");
  } else {
    return assertFiles(inputs, opts.R);
  }
};
