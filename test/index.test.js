const apiFarch = require("../index");

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
  name: "new",
  version: "1.0.0",
  description: "",
  farch: {
    "./test/example": "[a-z]*"
  },
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

const pkg3 = {
  name: "new",
  version: "1.0.0",
  description: "",
  farch: {
    "./test/example": "[0-9]"
  },
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

const pkg4 = {
  name: "new",
  version: "1.0.0",
  description: "",
  farch: {
    "./dir": "[0-9]"
  },
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

test("When there is no config provided via package.json", () => {
  expect(() => {
    const report = apiFarch(pkg1);
  }).toThrow("No farch config found in package.json!");
});

test("Expect a error throw, because dir did not exist", () => {
  expect(() => {
    const report = apiFarch(pkg4);
  }).toThrow();
});

test("Expect to Match test directory filenames", () => {
  const report = apiFarch(pkg2);
  expect(JSON.stringify(report)).toMatchSnapshot();
});

test("Expect to NOT match filename in root diretory", () => {
  const report = apiFarch(pkg3);
  expect(JSON.stringify(report)).toMatchSnapshot();
});
