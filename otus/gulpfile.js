(function() {

  var gulp = require('gulp');
  var browserSync = require('browser-sync').create();
  var browserSyncSpa = require('browser-sync-middleware-spa');
  var bump = require('gulp-bump');
  var uglify = require("gulp-uglify");
  var minify = require('gulp-minify');
  var concat = require('gulp-concat');
  var sonar = require('gulp-sonar');
  var packageJson = require('./package.json');
  var replaceTask = require('gulp-replace-task');
  var baseDir = __dirname + '/app/index.html';

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
      startPath: 'otus'
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

  gulp.task('compress', function() {
    gulp.src('app/**/*.js')
      .pipe(concat('otus.js'))
      .pipe(uglify())
      .pipe(minify())
      .pipe(gulp.dest('dist'));
  });

  gulp.task('modularize', function() {
    gulp
      .src('app/application/**/*.js')
      .pipe(concat('application.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist'));

    gulp
      .src('app/module/access/**/*.js')
      .pipe(concat('access.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist'));

    gulp
      .src('app/module/activity/**/*.js')
      .pipe(concat('activity.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist'));

    gulp
      .src('app/module/dashboard/**/*.js')
      .pipe(concat('dashboard.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist'));

    gulp
      .src('app/module/installer/**/*.js')
      .pipe(concat('installer.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist'));

    gulp
      .src('app/module/interoperability/**/*.js')
      .pipe(concat('interoperability.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist'));

    gulp
      .src('app/module/participant/**/*.js')
      .pipe(concat('participant.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist'));

    gulp
      .src('app/module/report/**/*.js')
      .pipe(concat('report.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist'));

    gulp
      .src('app/module/session/**/*.js')
      .pipe(concat('session.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist'));

    gulp
      .src('app/module/study/**/*.js')
      .pipe(concat('study.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist'));
  });

  gulp.task('replace-env', function(value) {
    gulp.src('app/application/environment/env.js')
      .pipe(replaceTask({
        patterns: [{
          match: /https:\/\/api\-otus\.localhost:8080/g,
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
        jdbc: {
          url: process.env.npm_config_sonarDatabaseUrl,
          username: process.env.npm_config_sonarDatabaseUsername,
          password: process.env.npm_config_sonarDatabasePassword
        },
        projectKey: 'sonar:otus-js',
        projectName: 'otus-js',
        projectVersion: packageJson.version,
        // comma-delimited string of source directories
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
