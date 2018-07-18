(function() {
  var gulp = require('gulp');
  var runSequence = require('run-sequence');
  var requireDir = require('require-dir');
  requireDir('./gulp-tasks');

  gulp.task('browser-sync', ['browser-dev'], function() {});
  gulp.task('start-test', ['unit'], function() {});
  gulp.task('upgrade-version', ['version-up'], function(value) {});
  gulp.task('replace-env', ['url-api'], function(value) {});
  gulp.task('sonar', ['coverage'], function() {});
  gulp.task('compress', function() {
    runSequence('compress-compress', 'compress-hash');
  });
}());