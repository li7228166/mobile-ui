'use strict';

var gulp = require('gulp'),
	less = require('gulp-less'),
	runSequence = require('run-sequence'),
	notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload,
	autoprefixer = require('gulp-autoprefixer');

gulp.task('watch', function() {
	browserSync.init({
		server: {
			baseDir: "./"
		},
		port: 9100
	});
	gulp.watch('less/**/*.less', ['less']);
	gulp.watch("examples/**/*.html").on('change', reload);
});

gulp.task('less', function() {
	return gulp.src('./less/ui.less')
		.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
		.pipe(less())
		.pipe(autoprefixer())
		.pipe(gulp.dest('./dist/'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('default', function() {
	runSequence(
		'less',
		'watch'
	);
});