let gulp = require("gulp");

let changed = require("gulp-changed");
let sass = require("gulp-sass");
let sourcemaps = require('gulp-sourcemaps');

let config = require("../build.config");

module.exports = {
    compileStyle: () => {
        return gulp.src(`${config.sourceFolder}/${config.assetsFolder}/**/*.scss`, {base: config.sourceFolder})
            .pipe(changed(`${config.destinationFolder}/`), {extension: '.css'})
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest(`${config.destinationFolder}/`));
    }
}