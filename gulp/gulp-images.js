'use strict';

// Module dependencies
const gulp          = require('gulp'),
	  watch         = require('gulp-watch'),
	  changed       = require('gulp-changed'),
	  imageCompress = require('gulp-image'),
	  imageResize   = require('gulp-image-resize');
      
const IMG_SRC  = './public/assets/images/original/**/*.*';
const IMG_DEST = './public/assets/images/compressed';

// // // // // // // // // // //
//
// Compresses / Resizes Images
//
// // // // // // // // // // //
function minify_images() {
	console.log('Compressing / Optimizing Images');
	gulp.src(IMG_SRC)
		.pipe(changed(IMG_DEST))
		.pipe(imageResize({ // resizes to max width
			width: 1800,
			height: 1800,
			upscaled: false,
			imageMagick: true,
			background: 'none'
		}))
		.pipe(imageCompress()) // compresses images
		.pipe(gulp.dest(IMG_DEST));
}

// // // // // // // // //
//
// Watches for new images
//
// // // // // // // // //
function watch_images() {
	return watch(IMG_SRC, () => gulp.start('minify_images'));
}

module.exports = { minify_images, watch_images };