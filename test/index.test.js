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
  name: "new",
  version: "1.0.0",
  description: "",
  farch: {
    "./src": "[a-z]*"
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
    "./media": "[0-9]"
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
    dir: "[0-9]"
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

const pkg5 = {
  name: "new",
  version: "1.0.0",
  description: "",
  farch: {
    test: "[0-9]"
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

describe("Configuration testing", () => {
  test("When there is no config provided via package.json", () => {
    expect(() => {
      const report = apiFarch(pkg1, { R: false });
    }).toThrow("No farch config found in farch.js or package.json!");
  });
});

describe("Non Recursive testing", () => {
  test("Expect a error throw, because dir did not exist", () => {
    expect(() => {
      const report = apiFarch(pkg4, { R: false });
    }).toThrow();
  });

  test("Expect to Match test directory filenames", () => {
    const report = apiFarch(pkg2, { R: false });
    expect(JSON.stringify(report)).toMatchSnapshot();
  });

  test("Expect to NOT match filename in root diretory", () => {
    const report = apiFarch(pkg3, { R: false });
    expect(JSON.stringify(report)).toMatchSnapshot();
  });
});

describe("Recursive testing", () => {
  test("Expect to output a strucutre with all files contained in directory given in input", () => {
    const report = apiFarch(pkg5, { R: true });
    expect(JSON.stringify(report)).toMatchSnapshot();
  });

  test("Will not work, cause undefined directory", () => {
    expect(() => {
      const report = apiFarch(pkg4, { R: false });
    }).toThrow();
  });
});
