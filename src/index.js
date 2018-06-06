"use strict";

const fs = require("fs");
const join = require("path").join;
const { flattenDeep, map } = require("lodash");

const getFileNameRecUtilities = path => {
  try {
    const files = fs.readdirSync(path);
    return files.map(dirFile => {
      const stats = fs.statSync(join(path, dirFile), "utf8");
      if (stats.isDirectory())
        return {
          [join(path, dirFile)]: getFileNameRecUtilities(join(path, dirFile))
        };
      else return dirFile;
    });
  } catch (e) {
    if (e) {
      throw new Error(e);
    }
  }
};

const assertRec = (NonFormattedData, path, regex) => {
  return map(NonFormattedData, (file, key) => {
    if (typeof file === "object") {
      return assertRec(file, key, regex);
    } else {
      return {
        fileName: file,
        pathFileName: join(path, file),
        isCorrectSyntax: new RegExp(regex).test(file),
        assertRegex: regex
      };
    }
  });
};

const assertFilesRec = inputs => {
  return inputs.map(dir => {
    const dirRec = getFileNameRecUtilities(dir.path);
    const assertedRes = assertRec(dirRec, dir.path, dir.regex);
    return {
      [dir.path]: flattenDeep(assertedRes)
    };
  });
};

const getFileNamesFromDirs = inputs => {
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

module.exports = (config, opts) => {
  const { farch } = config;
  const inputs = [];
  for (const key in farch) {
    inputs.push({ path: key, regex: farch[key] });
  }
  if (inputs.length === 0) {
    throw new Error("No farch config found in farch.js or package.json!");
  } else {
    return opts.R ? assertFilesRec(inputs) : getFileNamesFromDirs(inputs);
  }
};
