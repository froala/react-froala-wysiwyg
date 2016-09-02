var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var react = require('gulp-react');
var concat = require("gulp-concat");
var minify = require('gulp-minify');


gulp.task("default", function () {
  return gulp.src(["lib/froalaEditorFunctionality.js", "lib/**/*.js", "src/**/*.js"])
    .pipe(sourcemaps.init())
    .pipe(react())
    .pipe(concat("app.js"))
    .pipe(minify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("demo"));
});