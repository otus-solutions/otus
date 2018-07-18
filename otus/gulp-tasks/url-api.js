var gulp = require('gulp');
var replaceTask = require('gulp-replace-task');

gulp.task('url-api', function() {
    gulp.src('app/application/environment/env.js')
      .pipe(replaceTask({
        patterns: [{
          match: /http:\/\/api\-otus\.localhost:8080/g,
          replacement: process.env.npm_config_apiUrl,
        }]
      }))
      .pipe(gulp.dest('app/application/environment'));
  });
