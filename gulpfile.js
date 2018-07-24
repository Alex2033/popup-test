var syntax        = 'sass';

var gulp          = require('gulp'),
		sass          = require('gulp-sass'),
		browsersync   = require('browser-sync'),
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require("gulp-notify"),
		pug           = require('gulp-pug');

gulp.task('browser-sync', function() {
	browsersync({
		server: {
			baseDir: 'result'
		},
		notify: false,
		// open: false,
		// tunnel: true,
		// tunnel: "projectname", //Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('pug', function() {
	return gulp.src('result/pug/*.pug')
	.pipe(pug({
		pretty: true
	}))
	.pipe(gulp.dest('result'))
});

gulp.task('styles', function() {
	return gulp.src('result/sass/main.sass')
	.pipe(sass({ 'include css': true }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('result/css'))
	.pipe(browsersync.reload( {stream: true} ))
});

gulp.task('watch', ['pug', 'styles', 'browser-sync'], function() {
	gulp.watch('result/'+syntax+'/**/*.'+syntax+'', ['styles']);
	gulp.watch('result/pug/*.pug', ['pug']);
	gulp.watch('result/*.html', browsersync.reload);
});

gulp.task('default', ['watch']);
