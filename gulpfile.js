
// Gulp Config
// ===========
'use strict';

// REQUIRE
// -------
    var gulp    =   require('gulp'),
    browserSync = 	require('browser-sync').create(),

    // CSS
    csslint     =   require('gulp-csslint'),

    // JS
    concat      = 	require('gulp-concat'),
    uglify      = 	require('gulp-uglify'),
    sourcemaps  = 	require('gulp-sourcemaps'),
    jshint      =   require('gulp-jshint'),
    stylish     =   require('jshint-stylish'),

    // UTIL
    plumber     =   require('gulp-plumber'),
    bump        =   require('gulp-bump');

// OTHER PLUGINS
// -------------
// var connect = require('gulp-connect'); -- a simple web server


// ENVIRONMENT
// -----------
// To change the environment use: NODE_ENV=production gulp
// Sets the server environment to 'production' | 'development' (default)
var env = process.env.NODE_ENV || 'development';    


// TASKS
// -----

// HTML
gulp.task('html', function(){
	return gulp.src('./src/index.html')
	.pipe(gulp.dest('./dist/'));
});


// CSS
// Lint task - note normalize ignored as this causes errors
gulp.task('css-lint', function() {
  gulp.src(['./src/css/*.css', '!./src/css/*.css'])
  .pipe(plumber())
  .pipe(csslint())
  .pipe(csslint.reporter('compact'))
  .pipe(csslint.reporter('fail'));
});


gulp.task('css',['css-lint'], function(){
	return gulp.src('./src/css/*.css')
    .pipe(plumber())
	.pipe(gulp.dest('./dist/css/'));
});


// JS
// LINT the JS
gulp.task('js-hint', function() {
  return gulp.src('./src/js/*.js')
  .pipe(plumber())
  .pipe(jshint())
  .pipe(jshint.reporter(stylish,{ verbose: true }))
  .pipe(jshint.reporter('fail'));
});


// Output JS files
gulp.task('js',['js-hint'], function() {

    // If environment is in 'development' (default) run source maps and do not minify
    // Else If environment is in 'production' concat and minify
    if(env === 'development'){

        return gulp.src('./src/js/*.js')
        .pipe(plumber())
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/js'));

    } else if (env === 'production'){

        return gulp.src('./src/js/*.js')
        .pipe(plumber())
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));

    }

});


// BUMP
// Updates the package version 
gulp.task('bump', function(){
  gulp.src('./package.json')
  .pipe(bump())
  .pipe(gulp.dest('./'));
});


// WATCH
// gulp.task('watcher', ['html-watch','css-watch','js-watch'], browserSync.reload);
gulp.task('html-watch', ['html'], browserSync.reload);
gulp.task('css-watch', ['css'], browserSync.reload);
gulp.task('js-watch', ['js'], browserSync.reload);


// SERVE
gulp.task('serve', ['html','css','js'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: './dist/',
        },
        port: 8000,
        ui : {
        	port:8080
        },
        files: ['index.html','css/*.css','js/*.js']
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    // serve is now handling watch
    // gulp.watch(<sourcepath>, <[task(s)]>, callback);
    gulp.watch('./src/index.html',['html-watch']);
    gulp.watch('./src/css/*.css',['css-watch']);
    gulp.watch('./src/js/*.js',['js-watch']);

});



// DEFAULT GULP TASK
gulp.task('default', [
	'serve'
    ]);
