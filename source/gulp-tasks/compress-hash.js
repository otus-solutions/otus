var gulp = require('gulp');

var uncache = require('gulp-uncache');
var useref = require('gulp-useref');
var babel = require('gulp-babel');
var replace = require('gulp-replace');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var gulp_if = require('gulp-if');

gulp.task('compress-hash', function () {
    return gulp.src('../dist/otus/app/index.html')
        .pipe(uncache({
            append: 'hash',
            rename: true
        }))
        .pipe(gulp_if('index.html', replace('src="../dist/otus/node_modules', 'src="node_modules/')))
        .pipe(gulp_if('index.html', replace('src="../dist/otus/app/', 'src="app/')))
        .pipe(gulp.dest('../dist/otus/app'));
});
