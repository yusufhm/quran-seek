var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var cordova = require("cordova-lib").cordova;

gulp.task('cordova-build', function(callback) {
  cordova.build({
    "platforms": ["browser"]
  }, callback);
});

gulp.task('serve', function() {

  browserSync.init({
    server: "platforms/browser/www/"
  });

  gulp.watch("www/*.html", ['cordova-build']);
  gulp.watch("platforms/browser/www/*.html").on('change', browserSync.reload);

});

gulp.task('default', ['serve']);
