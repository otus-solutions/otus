var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('compress', function() {
  runSequence('compress-compress', 'compress-hash');
});