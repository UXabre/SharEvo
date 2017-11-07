let gulp = require("gulp");

let browserSync = require("browser-sync").create();
let rewrite = require("connect-modrewrite");

let code = require("./typescript");
let static = require("./static");
let testing = require("./karma");

let config = require("../build.config");

module.exports = {
    run: () => {
        gulp.watch(`${config.sourceFolder}/**/*`, ["default"]);
        gulp.watch(`${config.testsFolder}/**/*`, () => {
            return code.compileTests();
        });

        testing.runTests(false);

        browserSync.watch([
            `${config.destinationFolder}/index.htm`,
            `${config.destinationFolder}/jspm.config.js`,
        ]).on('change', browserSync.reload);

        require('chokidar-socket-emitter')({
            port: 8081, 
            path: config.destinationFolder, 
            relativeTo: config.destinationFolder
        });

        browserSync.init({
            port: 8080,
            server: {
                baseDir: config.destinationFolder,
                middleware: [
                    rewrite([
                        '!\\.\\w+$ /index.htm [L]'
                    ])
                ]
            }
        });
    }
}