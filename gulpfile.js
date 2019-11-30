var gulp = require('gulp');
var watchify = require('watchify');
var browserify = require('browserify');
var requirejs = require('gulp-requirejs');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var log = require('gulplog');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var plumber = require('gulp-plumber');
var glob = require('glob');
var typescript = require('gulp-typescript');
var concat = require('gulp-concat');
var merge = require('merge2');
var dts = require('dts-bundle');
var run = require('gulp-run-command').default;

function generateDtsBarrel(cb) {
    run('npm run barrels')();
    run('npm mv index.ts ./types/index.ts')
    cb();
}

function bundleDts(cb) {
    dts.bundle({
        main: './types/**/*.d.ts',
        out: '../dist/index.d.ts',
        name: 'cm-check'
    });
    cb();
}

function concatScripts() {
    return gulp.src('temp/**/*.js')
        .pipe(concat('./index.js'))
        .pipe(gulp.dest('./dist/'))
}

function concatTypes() {
    return gulp.src('temp/**/*.js')
        .pipe(concat('./index.js'))
        .pipe(gulp.dest('./dist'))
}

function browserifyScripts() {
    var files = glob.sync('./src/**/*.ts')
    var opts = assign({}, watchify.args, {
        entries: ['./dist/index.ts'],
        debug: true
    });
    var b = watchify(browserify(opts));
    return b.bundle()
        .on('error', log.error.bind(log, 'Browserify Error'))
        .pipe(source('./dist/index.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./'));
}

function rjs() {
    return requirejs({
        baseUrl: './',
        out: 'index.js',
        name: 'dist/index.js'
    })
        .on('error', log.error.bind(log, 'Browserify Error'))
        .pipe(gulp.dest('./dist'))
}

function compileTypescript() {

    var tsProject = typescript.createProject('tsconfig.json');

    var tsResult =  gulp.src(['src/**/*.ts'])
        .pipe(tsProject());

    return merge([
        tsResult.dts.pipe(gulp.dest('types/')),
        tsResult.js.pipe(gulp.dest('dist/'))
    ]);
}

exports.default = gulp.series(compileTypescript);
