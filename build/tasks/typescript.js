let gulp = require("gulp");
let changed = require("gulp-changed");
let ts = require("gulp-typescript");
let sourcemaps = require('gulp-sourcemaps');

let merge = require("merge2");

let config = require("../build.config");

module.exports = {
    compileCode: () => {
        return merge(gulp.src(`${config.sourceFolder}/${config.clientFolder}/**/*.ts`, {base: config.sourceFolder})
                .pipe(changed(`${config.destinationFolder}/${config.clientFolder}`, {extension: '.js'}))
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
                .pipe(gulp.dest(`${config.destinationFolder}/${config.clientFolder}`)),
            gulp.src(`${config.sourceFolder}/${config.serverFolder}/**/*.ts`, {base: config.sourceFolder})
                .pipe(changed(`${config.destinationFolder}/${config.serverFolder}`, {extension: '.js'}))
                .pipe(sourcemaps.init())
                .pipe(ts({
                    module: "commonjs",
                    moduleResolution: "node",
                    experimentalDecorators: true,
                    emitDecoratorMetadata: true,
                    target: "es6"
                }))
                .pipe(sourcemaps.write("."))
                .pipe(gulp.dest(`${config.destinationFolder}/${config.serverFolder}`)));
    },
    compileTests: () => {
        return merge(gulp.src([`${config.sourceFolder}/${config.clientFolder}/**/*.ts`, `${config.testsFolder}/${config.clientFolder}/**/*.ts`], {base: "."})
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
                .pipe(gulp.dest(".")),
            gulp.src([`${config.sourceFolder}/${config.serverFolder}/**/*.ts`, `${config.testsFolder}/${config.serverFolder}/**/*.ts`], {base: "."})
                .pipe(changed(".", {extension: '.js'}))
                .pipe(sourcemaps.init())
                .pipe(ts({
                    module: "commonjs",
                    moduleResolution: "node",
                    experimentalDecorators: true,
                    emitDecoratorMetadata: true,
                    target: "es6"
                }))
                .pipe(sourcemaps.write("."))
                .pipe(gulp.dest(".")));
    }
};
