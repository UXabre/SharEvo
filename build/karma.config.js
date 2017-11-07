let config = require("./build.config");

let preprocessors = {};
    preprocessors[`${config.sourceFolder}/**/*.js`] = ['coverage'];

let proxies = {};
    proxies[`/${config.testsFolder}/`] = `/base/${config.testsFolder}/`;
    proxies[`/${config.sourceFolder}/`] = `/base/${config.sourceFolder}/`;
    proxies['/jspm_packages/'] = `/base/jspm_packages/`;

module.exports = function(karmaConfig) {
  karmaConfig.set({
    browsers: ['Chrome'],
    frameworks: ['jspm', 'jasmine'],
    reporters: ["spec", "coverage", "remap-coverage", "junit"],
    basePath: "..",
    jspm: {
        config: "build/jspm.config.js",
        loadFiles: [
            `${config.testsFolder}/karma.shim.js`,
            `${config.testsFolder}/**/*${config.testsSuffix}.js`
        ]
    },
    files: [
      { pattern: `${config.sourceFolder}/**/*.js`, watched: false, included: false },
      { pattern: `${config.sourceFolder}/**/*.ts`, watched: true, included: false },
      { pattern: `${config.testsFolder}/**/*.js`, watched: true, included: false }
    ],
    preprocessors: preprocessors,
    coverageReporter: {
        type: 'in-memory',
        includeAllSources: true
    },
    remapCoverageReporter: {
        text: null,
        html: `./${config.reportFolder}/html`,
        cobertura: `./${config.reportFolder}/cobertura.xml`
    },
    junitReporter: {
        outputDir: config.reportFolder,
        outputFile: 'client_tests.xml',
        suite: 'Karma Jasmine',
        useBrowserName: false
    },
    // must have path roots of serveFiles and loadFiles, suppress annoying 404 warnings.
    proxies: proxies
  });
};