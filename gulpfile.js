var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var react = require('gulp-react');
var concat = require("gulp-concat");

gulp.task("default", function () {
  return gulp.src(["lib/froalaEditorFunctionality.js", "lib/**/*.js", "src/**/*.js"])
    .pipe(sourcemaps.init())
    .pipe(concat("app.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("demo"));
});