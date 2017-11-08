let gulp = require("gulp");

let changed = require("gulp-changed");
let clean = require('gulp-clean');

let merge = require("merge-stream");

let config = require("../build.config");

module.exports = {
    clean: () => {
        return gulp.src([`${config.testsFolder}/**/*.js`, `${config.testsFolder}/**/*.js.map`, `${config.sourceFolder}/**/*.js`, `${config.sourceFolder}/**/*.js.map`], {read: false})
            .pipe(clean());
    },
    copy: () => {
        return merge(
            gulp.src(["node_modules/es6-shim/es6-shim.min.js", "node_modules/zone.js/dist/zone.js", "node_modules/reflect-metadata/Reflect.js", "jspm_packages/**/*"], {base: "."})
                .pipe(changed(`${config.destinationFolder}/${config.clientFolder}`))
                .pipe(gulp.dest(`${config.destinationFolder}/${config.clientFolder}`)),
            gulp.src([`${config.sourceFolder}/${config.clientFolder}/**/*.htm*`, `${config.sourceFolder}/${config.clientFolder}/**/*.css`, `${config.sourceFolder}/${config.clientFolder}/${config.assetsFolder}/**/*`], {base: `${config.sourceFolder}/${config.clientFolder}`})
                .pipe(changed(`${config.destinationFolder}/${config.clientFolder}`))
                .pipe(gulp.dest(`${config.destinationFolder}/${config.clientFolder}`)),
            gulp.src("build/jspm.config.js*", {base: "build"})
                .pipe(changed(`${config.destinationFolder}/${config.clientFolder}`))
                .pipe(gulp.dest(`${config.destinationFolder}/${config.clientFolder}`))
        );
    }
}