'use strict';

// Module dependencies
const browserSync = require('browser-sync'),
	  nodemon     = require('gulp-nodemon');


// // // // // // //
//
// Starts Server 
// - Hot reloads DOM
//
// // // // // // //
function browser_sync() {
	browserSync.init(null, {
		proxy: "http://0.0.0.0:3000",
        files: ["public/**/*.js", "public/css/*.css"],
        browser: "google chrome",
        port: 7000,
	});
};

// // // // // // //
//
// restarts server
//
// // // // // // //
function node_mon(cb) {
	var started = false;
	return nodemon({
		script: 'keystone.js',
		ext: 'js twig',
		events: {
			// "restart": "osascript -e 'display notification \"App restarted due to:\n'$FILENAME'\" with title \"nodemon\"'"
		}
	})
	.on('start', () => {
		// to avoid nodemon being started multiple times
		if (!started) {
			cb();
			started = true; 
		} 
    })
    .on('restart', () => {
        setTimeout(function() {
			browserSync.reload({stream: false});
		}, 2000);
    })
};

module.exports = { browser_sync, node_mon };