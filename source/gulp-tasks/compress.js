var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('compress', function() {
  runSequence('copy_code', 'copy_node_modules', 'compress-hash');
});