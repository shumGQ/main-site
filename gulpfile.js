"use strict";

var gulp = require('gulp'),
    concatCss = require('gulp-concat-css'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    notify = require("gulp-notify"),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    uncss = require('gulp-uncss'),
    wiredep = require('gulp-wiredep');
 
gulp.task('scss', function () {
     gulp.src('scss/**/*.scss')
    .pipe(sass())
    //.pipe(cleanCSS({compatibility: 'ie8'}))	// use both
    //.pipe(rename('bundle.min.css'))			// to min and rename
    //.pipe(autoprefixer({
    //        browsers: ['last 35 versions'],
    //        cascade: true
    //    }))
    //.pipe(uncss({								//remove 
    //        html: ['app/index.html']			//unused
    //    }))									//css selectors
    // .pipe(notify("Done!"))
    .pipe(gulp.dest('app/css'))
    .pipe(connect.reload())
});

gulp.task('html', function() {
	gulp.src('app/*.html')
	.pipe(connect.reload())
});

gulp.task('watch', function() {
	gulp.watch('scss/**/*.scss', ['scss'])
	gulp.watch('app/*.html', ['html'])
  gulp.watch('bower.json', ['wiredep'])
});

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

gulp.task('wiredep', function () {
  gulp.src('./app/*.html')
    .pipe(wiredep({
      directory : "./app/bower_components"
    }))
    .pipe(gulp.dest('./app'))
});

gulp.task('default', ['connect', 'watch', 'scss', 'html', 'wiredep']);