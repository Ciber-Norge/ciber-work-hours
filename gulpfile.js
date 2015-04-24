'use strict';

var gulp    = require('gulp');
var del     = require('del');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var plugins = require('gulp-load-plugins')();
var path = require('path');
var through = require('through2');

var paths = {
  lint: ['./gulpfile.js', './lib/**/*.js'],
  watch: ['./gulpfile.js', './index.js', './lib/**', './rules/**', './test/**/*.js', '!test/{temp,temp/**}'],
  tests: ['./test/**/*.js', '!test/{temp,temp/**}']
};

var moduleName = 'ciber-work-hours';
var fileName = moduleName + '.js';

var plumberConf = {};

if (process.env.CI) {
  plumberConf.errorHandler = function(err) {
    throw err;
  };
}

gulp.task('clean-dist', function () {
    return del(['dist/']);
});

gulp.task('clean-rulesets', ['rulesets-insert'], function () {
    return del(['dist/rulesets.js']);
});

gulp.task('rulesets', ['clean-dist'], function () {
    return gulp.src('./rules/*.yaml')
        .pipe(plugins.foreach(function (stream, file) {
            var key = path.basename(file.path, '.yaml');

            return stream
                .pipe(plugins.yaml())
                .pipe(plugins.insert.wrap('"' + key + '":', ','));
        }))
        .pipe(plugins.concat('rulesets.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('rulesets-insert', ['rulesets'], function () {
    return gulp.src('./index.js')
        .pipe(plugins.fileInsert({'/* insert: rulesets */': './dist/rulesets.js'}))
        .pipe(plugins.rename(fileName))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('browserify', ['rulesets-insert', 'clean-rulesets'], function () {
  return gulp.src('./dist/' + fileName)
    .pipe(through.obj(function (file, enc, next) {
        var b = browserify();
        b.add(file.path);
        b.require(file.path, {expose: moduleName});
        b.bundle(function (err, res) {
            file.contents = res;
            next(null, file);
        });
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('lint', function () {
  return gulp.src(paths.lint)
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('unitTest', function () {
  return gulp.src(paths.tests, {cwd: __dirname})
    .pipe(plugins.plumber(plumberConf))
    .pipe(plugins.mocha());
});

gulp.task('watch', ['test'], function () {
  gulp.watch(paths.watch, ['yaml', 'test']);
});

gulp.task('test', ['lint', 'unitTest']);

gulp.task('default', ['test']);
