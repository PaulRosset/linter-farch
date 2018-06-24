const { concatForRegex } = require("../src/index");
const apiFarch = require("../src/index");

const pkg1 = {
  name: "new",
  version: "1.0.0",
  description: "",
  keywords: [],
  main: "src/index.js",
  dependencies: {
    react: "16.3.2",
    "react-dom": "16.3.2",
    "react-scripts": "1.1.4"
  },
  devDependencies: {},
  scripts: {
    start: "react-scripts start",
    build: "react-scripts build",
    test: "react-scripts test --env=jsdom",
    eject: "react-scripts eject"
  }
};

const pkg2 = {
  farch: {
    "test/testFolder/testAgain": "[a-z]*"
  }
};

const pkg3 = {
  farch: {
    "./media": "[0-9]"
  }
};

const pkg4 = {
  farch: {
    dir: "[0-9]"
  }
};

const pkg5 = {
  farch: {
    "test/testFolder/testAgain": "[0-9]",
    "test/testFolder": "[0-9]"
  }
};

const pkg6 = {
  farch: {
    "test/testFolder": ["LOWER_CAMEL_CASE_JS", "[a-z]*"]
  }
};

const pkgError = {
  farch: {
    "test/testFolder": [1]
  }
};

const pkgError2 = {
  farch: {
    "test/testFolder": 1
  }
};

describe("Configuration testing", () => {
  test("When there is no config provided via package.json", () => {
    expect(() => {
      const report = apiFarch(pkg1, { R: false });
    }).toThrow("No farch config found in farch.js or package.json!");
  });
});

describe("Non Recursive testing", () => {
  test("Expect a error throw, because dir did not exist", done => {
    Promise.all(apiFarch(pkg4, { R: false })).then(config => {
      expect(config).toMatchSnapshot();
      done();
    });
  });

  test("Expect to Match test directory filenames", done => {
    const expectedArray = [
      {
        "test/testFolder/testAgain": [
          {
            fileName: "test.txt",
            pathFileName: "test/testFolder/testAgain/test.txt",
            isCorrectSyntax: true,
            assertRegex: "[a-z]*"
          },
          {
            fileName: "testForSake.js",
            pathFileName: "test/testFolder/testAgain/testForSake.js",
            isCorrectSyntax: true,
            assertRegex: "[a-z]*"
          }
        ]
      }
    ];
    Promise.all(apiFarch(pkg2, { R: false })).then(config => {
      expect(config).toEqual(expect.arrayContaining(expectedArray));
      done();
    });
  });

  test("Expect to NOT match filename in root diretory", done => {
    const expectedArray = [
      {
        "./media": [
          {
            fileName: "demo1.png",
            pathFileName: "media/demo1.png",
            isCorrectSyntax: true,
            assertRegex: "[0-9]"
          },
          {
            fileName: "logo.png",
            pathFileName: "media/logo.png",
            isCorrectSyntax: false,
            assertRegex: "[0-9]"
          }
        ]
      }
    ];
    Promise.all(apiFarch(pkg3, { R: false })).then(config => {
      expect(config).toEqual(expect.arrayContaining(expectedArray));
      done();
    });
  });

  test("Expect to match without recursive", done => {
    const expectedArray = [
      {
        "test/testFolder/testAgain": [
          {
            fileName: "test.txt",
            pathFileName: "test/testFolder/testAgain/test.txt",
            isCorrectSyntax: false,
            assertRegex: "[0-9]"
          },
          {
            fileName: "testForSake.js",
            pathFileName: "test/testFolder/testAgain/testForSake.js",
            isCorrectSyntax: false,
            assertRegex: "[0-9]"
          }
        ]
      },
      { "test/testFolder": [] }
    ];
    Promise.all(apiFarch(pkg5, { R: false })).then(config => {
      expect(config).toEqual(expect.arrayContaining(expectedArray));
      done();
    });
  });

  test("Expect to not match first (.txt) and match the second (.js), use of template and non template in array", done => {
    Promise.all(apiFarch(pkg6, { R: false })).then(config => {
      expect(JSON.stringify(config)).toMatchSnapshot();
      done();
    });
  });
});

describe("Recursive testing", () => {
  test("Expect to match with recursive", done => {
    Promise.all(apiFarch(pkg5, { R: true })).then(config => {
      expect(config).toHaveLength(2);
      done();
    });
  });
});

describe("Handle Throw TypeError", () => {
  test("When The regex given is invalid, either not a Array of String or a String", () => {
    expect(() => {
      Promise.all(apiFarch(pkgError2, { R: true }));
    }).toThrow("Patterns must be a string or an array of strings");
  });

  test("Verify if the the array of string is composed uniquely of String either throw", () => {
    expect(() => {
      Promise.all(apiFarch(pkgError, { R: true }));
    }).toThrow("Template element must be a string");
  });
});

describe("Test utility function", () => {
  const array = ["a", "b"];
  const stringEncapsulatedFromArray = concatForRegex(array);
  expect(stringEncapsulatedFromArray).toEqual("(a)(b)");
});
