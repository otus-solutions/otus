var gulp = require('gulp');
var uncache = require('gulp-uncache');

gulp.task('compress-hash', function() {
  return gulp.src('../dist/otus/index.html')
    .pipe(uncache({
      append: 'hash',
      rename: true
    }))
    .pipe(gulp.dest('../dist/otus'));
});
