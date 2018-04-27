#!/usr/bin/env node
"use strict";

const fs = require("fs");
const assert = require("assert");
const join = require("path").join;

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
      throw new Error(e);
    }
  }
};

const assertFilesInDir = (files, path, regex) => {
  return files
    .filter(file => {
      const stats = fs.statSync(join(path, file), "utf8");
      return stats.isFile();
    })
    .map(file => ({
      fileName: file,
      pathFileName: join(path, file),
      isCorrectSyntax: new RegExp(regex).test(file),
      assertRegex: regex
    }));
};

const getInput = config => {
  const { farch } = config;
  const inputs = [];
  for (const key in farch) {
    inputs.push({ path: key, regex: farch[key] });
  }
  if (inputs.length === 0) {
    throw new Error("No farch config found in package.json!");
  } else {
    return getFileNamesFromDir(inputs);
  }
};

module.exports = getInput;
