let gulp = require("gulp");

let karma = require("karma").Server;

let code = require("./typescript");
let static = require("./static");

let config = require("../build.config");

function handleKarmaError(error, callback) {
    if (error && typeof error !== 'Error') {
        error = new Error('Karma test run failed (error code: ' + error + ')');
        error.showStack = false;
    }

    if (callback) {
        callback(error);
    }
}

module.exports = {
    runTests: (singleRun, done) => {
        code.compileTests().on("queueDrain", () => {
            new karma({
                configFile: config.karmaConfigFile,
                singleRun: singleRun
            }, (error) => {
                static.clean().on("end", () => {
                    handleKarmaError(error, done);
                });
            }).start();
        });
    }
}
