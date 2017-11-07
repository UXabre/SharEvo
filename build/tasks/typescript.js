let gulp = require("gulp");
let changed = require("gulp-changed");
let ts = require("gulp-typescript");
let sourcemaps = require('gulp-sourcemaps');

let config = require("../build.config");

module.exports = {
    compileCode: () => {
        return gulp.src(`${config.sourceFolder}/${config.applicationFolder}/**/*.ts`, {base: config.sourceFolder})
            .pipe(changed(`${config.destinationFolder}/`, {extension: '.js'}))
            .pipe(sourcemaps.init())
            .pipe(ts({
                module: "system",
                moduleResolution: "node",
                experimentalDecorators: true,
                emitDecoratorMetadata: true,
                lib: ["es6", "dom"],
                target: "es5"
            }))
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest(`${config.destinationFolder}/`));
    },
    compileTests: () => {
        return gulp.src([`${config.sourceFolder}/${config.applicationFolder}/**/*.ts`, `${config.testsFolder}/**/*.ts`], {base: "."})
            .pipe(changed(".", {extension: '.js'}))
            .pipe(sourcemaps.init())
            .pipe(ts({
                module: "system",
                moduleResolution: "node",
                experimentalDecorators: true,
                emitDecoratorMetadata: true,
                lib: ["es6", "dom"],
                target: "es5"
            }))
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest("."));
    }
};
