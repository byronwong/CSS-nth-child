
// Gulp Config
// ===========


// REQUIRE
// -------
var gulp = 			require('gulp'),
	browserSync = 	require('browser-sync').create(),
	concat = 		require('gulp-concat'),
	uglify = 		require('gulp-uglify'),
	sourcemaps = 	require('gulp-sourcemaps');


// ENVIRONMENT
// -----------
var development = './src/',
	production = './dist/',
	environment = production;


// OTHER PLUGINS
// -------------
// var connect = require('gulp-connect'); -- a simple web server

var errorlog = function(){
	console.error.bind(console);
	this.emit('end');
};


// TASKS
// -----

// HTML
gulp.task('html', function(){
	return gulp.src('./src/index.html')
	.pipe(gulp.dest('./dist/'));
});


// CSS
gulp.task('css', function(){
	return gulp.src('./src/css/*.css')
	.pipe(gulp.dest('./dist/css/'));
});

// JS
gulp.task('js', function() {
  return gulp.src('./src/js/*.js')
  	// .pipe(sourcemaps.init())
    // .pipe(sourcemaps.write('../maps'))
    // .on('error', errorlog)
    .pipe(concat('scripts.js'))
    .on('error', errorlog)
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
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
            baseDir: environment,
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
    gulp.watch("./src/index.html",['html-watch']);
    gulp.watch("./src/css/*.css",['css-watch']);
    gulp.watch("./src/js/*.js",['js-watch']);

});



// DEFAULT GULP TASK
gulp.task('default', [
	'serve'
]);
