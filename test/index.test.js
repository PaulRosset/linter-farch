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
    "./src": "[a-z]*"
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
    src: "[0-9]",
    "test/testFolder": "[0-9]"
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
    Promise.all(apiFarch(pkg2, { R: false })).then(config => {
      expect(JSON.stringify(config)).toMatchSnapshot();
      done();
    });
  });

  test("Expect to NOT match filename in root diretory", done => {
    Promise.all(apiFarch(pkg3, { R: false })).then(config => {
      expect(JSON.stringify(config)).toMatchSnapshot();
      done();
    });
  });

  test("Expect to match without recursive", done => {
    Promise.all(apiFarch(pkg5, { R: false })).then(config => {
      expect(JSON.stringify(config)).toMatchSnapshot();
      done();
    });
  });
});

describe("Recursive testing", () => {
  test("Expect to match with recursive", done => {
    Promise.all(apiFarch(pkg5, { R: true })).then(config => {
      expect(JSON.stringify(config)).toMatchSnapshot();
      done();
    });
  });
});
