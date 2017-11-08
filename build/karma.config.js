let config = require("./build.config");

let preprocessors = {};
    preprocessors[`${config.sourceFolder}/**/*.js`] = ['coverage'];

let proxies = {};
    proxies[`/${config.testsFolder}/${config.clientFolder}/`] = `/base/${config.testsFolder}/${config.clientFolder}/`;
    proxies[`/${config.sourceFolder}/${config.clientFolder}/`] = `/base/${config.sourceFolder}/${config.clientFolder}/`;
    proxies['/jspm_packages/'] = `/base/jspm_packages/`;

module.exports = function(karmaConfig) {
  karmaConfig.set({
    browsers: ['ChromeHeadless'],
    frameworks: ['jspm', 'jasmine'],
    reporters: ["spec", "coverage", "remap-coverage", "junit"],
    basePath: "..",
    jspm: {
        config: "build/jspm.config.js",
        loadFiles: [
            `${config.testsFolder}/${config.clientFolder}/karma.shim.js`,
            `${config.testsFolder}/${config.clientFolder}/**/*${config.testsSuffix}.js`
        ]
    },
    files: [
      { pattern: `${config.sourceFolder}/${config.clientFolder}/**/*.js`, watched: false, included: false },
      { pattern: `${config.sourceFolder}/${config.clientFolder}/**/*.ts`, watched: true, included: false },
      { pattern: `${config.testsFolder}/${config.clientFolder}/**/*.js`, watched: true, included: false }
    ],
    preprocessors: preprocessors,
    coverageReporter: {
        type: 'in-memory',
        includeAllSources: true
    },
    remapCoverageReporter: {
        text: null,
        html: `./${config.reportFolder}/${config.clientFolder}/html`,
        cobertura: `./${config.reportFolder}/${config.clientFolder}/cobertura.xml`
    },
    junitReporter: {
        outputDir: `./${config.reportFolder}/${config.clientFolder}`,
        outputFile: 'client_tests.xml',
        suite: 'Karma Jasmine',
        useBrowserName: false
    },
    // must have path roots of serveFiles and loadFiles, suppress annoying 404 warnings.
    proxies: proxies
  });
};