var gulp = require('gulp');
var useref = require('gulp-useref');
var babel = require('gulp-babel');
var replace = require('gulp-replace');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');

gulp.task('compress-compress', function() {
  return gulp.src('app/*.html')
    .pipe(useref({
      transformPath: function(filePath) {
        return filePath.replace('otus/app', 'otus');
      }
    }))
    .pipe(gulpif('*.js',
      babel({
        presets: ['es2015']
      })
    ))
    .pipe(gulpif('*.js', uglify().on('error', function(e) {
      console.log(e);
    })))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(gulpif('*.css', replace('url(../../static-resource/', 'url(/otus/app/static-resource/')))
    .pipe(gulpif('index.html', replace('href="css', 'href="dist/otus/css')))
    .pipe(gulpif('index.html', replace('src="scripts', 'src="dist/otus/scripts')))
    .pipe(gulp.dest('dist/otus'));
});
