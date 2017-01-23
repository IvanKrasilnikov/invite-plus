"use strict";

// --- PACKAGES ----------------------------------------------------------------
var gulp = require('gulp');
var autopref = require('gulp-autoprefixer');
var prettify = require('gulp-html-prettify');
var pug = require('gulp-pug');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

// -----------------------------------------------------------------------------


// --- DIRECTORIES -------------------------------------------------------------
var rootDir = '.';
var devDir = rootDir + '/dev';
var prodDir = rootDir + '/prod';

// -----------------------------------------------------------------------------


// --- SETTINGS ----------------------------------------------------------------
var settings = {
  sass: {
    outputStyle: 'expanded'
  },
	autoprefixer: {
    browsers: ['last 2 Chrome versions', '> 5%', 'Firefox ESR', 'ie >= 9']
  },
  pug: {
    pretty: true
  },
  prettify: {
    indent_char: ' ',
    indent_size: 2
  }
};

// -----------------------------------------------------------------------------


// --- SINGLE TASKS ------------------------------------------------------------
gulp.task('sass-autopref', function() {
  return gulp.src([
    devDir + '/scss/**/*.scss',
    devDir + '/BLOCKS/**/*.scss'])
    //.pipe(sourcemaps.init())
    .pipe(sass(settings.sass).on('error', sass.logError))
    //.pipe(sourcemaps.write())
    .pipe(autopref(settings.autoprefixer))
    .pipe(gulp.dest(devDir + '/css'));
});

gulp.task('sass-autopref:watch', ['sass-autopref'], function() {
  gulp.watch([
    devDir + '/scss/**/*.scss',
    devDir + '/BLOCKS/**/*.scss'], ['sass-autopref']);
});

gulp.task('pug-BLOCKS', function() {
  gulp.src(devDir + '/BLOCKS/**/*.pug')
    .pipe(plumber())
    .pipe(pug(settings.pug))
    .pipe(gulp.dest(devDir + '/BLOCKS/'));
});

gulp.task('pug:watch', ['pug-BLOCKS'], function() {
  gulp.watch(devDir + '/BLOCKS/**/*.pug', ['pug-BLOCKS', function() {
    //callback
    pugIndex();
  }]);
});

gulp.task('pug-index', function() {
  pugIndex();
});

gulp.task('pug-index:watch', function() {
  gulp.watch(devDir + '/pug/**/*.pug', ['pug-index']);
});

function pugIndex() {
  gulp.src(devDir + '/pug/**/*.pug')
    .pipe(plumber())
    .pipe(pug())
    .pipe(prettify(settings.prettify))
    .pipe(gulp.dest(devDir + '/'));
}

// -----------------------------------------------------------------------------


// --- UNITY TASKS -------------------------------------------------------------
gulp.task('default', [
  'pug:watch',
  'pug-index:watch',
  'sass-autopref:watch'
]);

// -----------------------------------------------------------------------------
