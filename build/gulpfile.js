let gulp = require("gulp");

let merge = require("merge-stream");

let code = require("./tasks/typescript");
let style = require("./tasks/sass");
let static = require("./tasks/static");
let testing = require("./tasks/karma");
let watch = require("./tasks/watch");

gulp.task("clean", () => {
    return static.clean(); 
});

gulp.task("default", () => {
    return merge(code.compileCode(), style.compileStyle(), static.copy());
});

gulp.task("test",  (done) => {
    testing.runTests(true, done);
});

gulp.task("watch", ["default"], () => {
    watch.run();
});