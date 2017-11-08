let gulp = require("gulp");
let lint = require('tslint').Linter;
var tslint = require("gulp-tslint");

var map = require("map-stream");
var concat = require("gulp-concat");

let config = require("../build.config");

module.exports = {
    lint: () => {
        return gulp.src(`${config.sourceFolder}/**/*.ts`)
            .pipe(tslint({
                formatter: config.lintOutput,
                configuration: config.lintRules,
                program: lint.createProgram("./ts.config.json")
            }))
            .pipe(map(function(file, done) {
                if (file.tslint.output) {
                    const output = file.tslint.output.replace(/\n\n$/g, "\n");
                    file.contents = new Buffer(output);
                } else {
                    file.contents = new Buffer("");
                }
                done(null, file);
            }))
            .pipe(concat(`tslint-report.${config.lintOutput}`))
            .pipe(gulp.dest(config.reportFolder));
    }
}