'use strict';

// Module dependencies
const gulp        = require('gulp'),
	  watch       = require('gulp-watch'),
	  sourcemaps  = require('gulp-sourcemaps'),
	  uglify      = require('gulp-uglify'),
	  browserify  = require('browserify'),
	  babelify    = require('babelify'),
	  source      = require('vinyl-source-stream'),
      buffer	  = require('vinyl-buffer');
      

const JS_SRC  = 'src/build/js/**/*.js';
const JS_DEST = 'public/js/';
 
// // // // // // // // // //
//
// Builds JS (ES6 -> ES5)
//
// // // // // // // // // //
function build_es6() {
	console.log('building js files');
	return browserify({entries: 'src/build/js/app.js', debug: true})
		.transform("babelify", { presets: ["env"] })
		.bundle()
		.pipe(source('bundle.min.js'))
        .pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(JS_DEST));
}

// // // // // // //
//
// watches JS files
//
// // // // // // //
function watch_es6() {
    return watch(JS_SRC, () => gulp.start('build_es6'));
}

module.exports = { build_es6, watch_es6 };


