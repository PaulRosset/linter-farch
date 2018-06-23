"use strict";

const globby = require("globby");
const template = require("./template");

const concatForRegex = tabOfRegex => {
  let test = "";
  for (const regex in tabOfRegex) {
    test += `(${tabOfRegex[regex]})`;
  }
  return test;
};

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
          isCorrectSyntax: new RegExp(
            Array.isArray(file.regex) ? concatForRegex(file.regex) : file.regex
          ).test(fileSimple[fileNameindex]),
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
    const isRegexArray = Array.isArray(farch[key]);
    if (!isRegexArray && typeof farch[key] !== "string")
      throw new TypeError("Patterns must be a string or an array of strings");
    if (isRegexArray && !farch[key].every(reg => typeof reg === "string"))
      throw new TypeError("Template element must be a string");
    inputs.push({
      path: key,
      regex: isRegexArray
        ? farch[key].map(
            templateInput =>
              template[templateInput] ? template[templateInput] : templateInput
          )
        : farch[key]
    });
  }
  if (inputs.length === 0) {
    throw new Error("No farch config found in farch.js or package.json!");
  } else {
    return assertFiles(inputs, opts.R);
  }
};
