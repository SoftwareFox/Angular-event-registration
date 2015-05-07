'use strict';
var gulp = require('gulp');
//Automatically load any gulp plugins in your package.json
//src, watch, dest
var plugins = require('gulp-load-plugins')();
var connect= require('gulp-connect');

var paths = {
    appScripts: 'src/app/**/*.js'
};

//plugins = gulp-size
//plugins= gulp-jshint--JSHint plugin for gulp
//jshint-stylish -- Stylish reporter for JSHint
gulp.task('scripts', function () {
    return gulp.src([paths.appScripts])
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter(require('jshint-stylish')))
        .pipe(plugins.size());
});

//plugins=gulp-livereload -- A lightweight gulp plugin for livereload
gulp.task('watch', ['serve'], function () {
    var server = plugins.livereload();
    gulp.watch([
        'src/**/*.html',
        'src/app/**/*.js',
        'src/styles/*.css'
    ]).on('change', function (file) {
        console.log('File changed: ' + file.path);
        server.changed(file.path);
    });
    gulp.watch(paths.appScripts, ['scripts']);
});

// opn -- opens that url in the default or specific browser
gulp.task('serve', ['connect'], function () {
    require('opn')('http://localhost:8080','chrome');
});

//require('connect') - 'connect' is an extensible HTTP server framework for node using "plugins" known as middleware.
//require('connect-livereload')- 'connect-livereload' connect middleware for adding the livereload script to the response
gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729}))
        .use(connect.static('src'))
        .use(connect.directory('src'));

    require('http').createServer(app)
        .listen(8080)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:8080');
        });
});

//plugins = gulp-inject -- A javascript, stylesheet and webcomponent injection plugin for Gulp, i.e. inject file references into your index.html
//If options.relative is set to true each injected path will be relative to each target file's directory instead.
gulp.task('injectjs', function(){
    var target = gulp.src('./src/index.html');
    var sources = gulp.src([paths.appScripts]);
    return target.pipe(plugins.inject(sources, {relative: true}))
                 .pipe(gulp.dest('./src'));
});

gulp.task('default', function() {
    connect.server({
        root: ['src'],
        port: process.env.PORT || 5000, // localhost:5000
        livereload: false
    });
});