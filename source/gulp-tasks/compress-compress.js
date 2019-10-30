var gulp = require('gulp');
var useref = require('gulp-useref');
var babel = require('gulp-babel');
var replace = require('gulp-replace');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var gulp_if = require('gulp-if');

gulp.task('compress-compress', function () {
    return gulp.src('app/*.html')
        .pipe(useref({
            transformPath: function (filePath) {
                // console.log(filePath)
                return filePath.replace('app/app', 'app')
                    .replace('app/node_modules', 'node_modules');
            }
        }))
        .pipe(gulp_if('*.js',
            babel({
                presets: ['es2015']
            })
        ))
        .pipe(gulp_if('*.js', uglify().on('error', function (e) {
            console.log(e);
        })))
        .pipe(gulp_if('*.css', minifyCss()))
        .pipe(gulp_if('*.css', replace('url(../../static-resource/', 'url(/otus/app/static-resource/')))
        .pipe(gulp_if('index.html', replace('href="css', 'href="../dist/otus/css')))
        .pipe(gulp_if('index.html', replace('src="scripts', 'src="../dist/otus/scripts')))
        .pipe(gulp.dest('../dist/otus'));
});
