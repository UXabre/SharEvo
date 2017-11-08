module.exports = {
    sourceFolder: "src",
    destinationFolder: "dist",

    clientFolder: "client",
    serverFolder: "backend",

    assetsFolder: "assets",
    
    testsFolder: "tests",
    testsSuffix: ".spec",

    reportFolder: "reports",

    lintOutput: "json",
    allowLintWarnings: true,
    
    baseTsConfigFile: __dirname + "/ts.config.json",
    lintRules: __dirname + "/tslint.config.json",
    karmaConfigFile: __dirname + "/karma.config.js"
}