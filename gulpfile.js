var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var cordova = require("cordova-lib").cordova;
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function() {

  return gulp.src(['./www/sass/**/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./www/css'));

});

gulp.task('cordova-build', ['sass'], function(callback) {

  cordova.build({
    "platforms": ["browser"]
  }, callback);

});

gulp.task('build', ['cordova-build']);

gulp.task('serve', function() {

  browserSync.init({
    server: "platforms/browser/www/",
    open: false
  });

  gulp.watch(['www/sass/*.scss', 'www/sass/**/*.scss'], ['sass']);
  gulp.watch(['www/*.html', 'www/js/*.js', 'www/css/*.css'], ['cordova-build']);
  gulp.watch(['platforms/browser/www/*.html']).on('change', browserSync.reload);

});

gulp.task('default', ['serve']);
