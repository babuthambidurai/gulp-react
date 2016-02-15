'use strict';

var gulp = require('gulp');

var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify')
var babelify = require("babelify");

var paths = {
    app: ['./src/init.jsx'],
    js: ['./src/**/*.*'],
};

gulp.task('build', function() {
    // Browserify/bundle the JS.
    browserify(paths.app)
        .transform(babelify, {
              presets: ["es2015", "react"], 
              plugins: [
              "transform-remove-console", 
              "transform-object-rest-spread",
              "transform-jscript",
              "transform-es2015-spread"
              ]
        })
        .transform(reactify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('./build/'))
        .pipe(connect.reload());
});

gulp.task('connect', function(){
  connect.server({
    livereload: true,
    port: 3100
  });
});

gulp.task('serve', function(){
  connect.server({
    port: 3000
  });
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.js, ['build']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['connect', 'watch', 'build']);