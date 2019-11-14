var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('compress', function() {
  runSequence('clean_dist', 'copy_code', 'embeded_template', 'copy_node_modules', 'compress-hash');
});
