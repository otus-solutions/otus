(function() {

  var gulp = require('gulp');
  var browserSync = require('browser-sync').create();
  var browserSyncSpa = require('browser-sync-middleware-spa');
  var bump = require('gulp-bump');
  var uglify = require('gulp-uglify');
  var minify = require('gulp-minify');
  var concat = require('gulp-concat');
  var useref = require('gulp-useref');
  var gulpif = require('gulp-if');
  var sonar = require('gulp-sonar');
  var packageJson = require('./package.json');
  var replaceTask = require('gulp-replace-task');
  var baseDir = __dirname + '/app/index.html';
  var minifyCss = require('gulp-minify-css');
  var uncache = require('gulp-uncache');
  var replace = require('gulp-replace');
  var runSequence = require('run-sequence');

  gulp.task('browser-sync', function() {
    browserSync.init({
      server: {
        open: 'external',
        baseDir: '../',
        middleware: [
          //browserSyncSpa(/^[^\.]+$/, baseDir),

          function(req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', '*');
            next();
          }
        ]
      },
      startPath: 'otus/app/'
    });

    gulp.watch([
      'app/**/*.html',
      'app/**/*.js',
      'app/**/*.css'
    ]).on('change', browserSync.reload);
  });

  gulp.task('upgrade-version', function(value) {
    gulp.src('./package.json')
      .pipe(bump({
        version: process.env.npm_config_value
      }))
      .pipe(gulp.dest('./'));
  });

  gulp.task('compress-compress', function() {
    return gulp.src('app/index.html')
      .pipe(useref({
        transformPath: function(filePath) {
          return filePath.replace('app', '');
        }
      }))
      .pipe(gulpif('*.js', uglify()))
      .pipe(replace('href="app/static-resource/stylesheet', 'href="../app/static-resource/stylesheet'))
      .pipe(gulpif('*.css', minifyCss()))
      .pipe(gulpif('index.html', replace('href="css', 'href="dist/otus/css')))
      .pipe(gulpif('index.html', replace('src="scripts', 'src="dist/otus/scripts')))
      .pipe(gulpif('*.css', replace('url(../../static-resource/', 'url(/otus/app/static-resource/')))
      .pipe(gulp.dest('dist/otus'));
  });

  gulp.task('compress-hash', function() {
    return gulp.src('dist/otus/index.html')
      .pipe(uncache({
        append: 'hash',
        rename: true
      }))
      .pipe(gulp.dest('dist/otus'));
  });

  gulp.task('compress', function() {
    runSequence('compress-compress', 'compress-hash');
  });

  gulp.task('replace-env', function(value) {
    gulp.src('app/application/environment/env.js')
      .pipe(replaceTask({
        patterns: [{
          match: /http:\/\/api\-otus\.localhost:8080/g,
          replacement: process.env.npm_config_apiUrl,
        }]
      }))
      .pipe(gulp.dest('app/application/environment'));
  });

  gulp.task('sonar', function() {
    var options = {
      sonar: {
        host: {
          url: process.env.npm_config_sonarUrl,
        },
        login: process.env.npm_config_sonarDatabaseUsername,
        password: process.env.npm_config_sonarDatabasePassword,
        projectKey: 'sonar:' + packageJson.name,
        projectName: packageJson.name,
        projectVersion: packageJson.version,
        sources: 'app',
        language: 'js',
        sourceEncoding: 'UTF-8',
        exec: {
          maxBuffer: 1024 * 1024
        },
        javascript: {
          lcov: {
            reportPath: 'target/test-coverage/report-lcov/lcov.info'
          }
        }
      }
    };

    return gulp.src('thisFileDoesNotExist.js', {
        read: false
      })
      .pipe(sonar(options));
  });

}());
