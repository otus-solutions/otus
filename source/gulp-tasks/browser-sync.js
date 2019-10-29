var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var browserSyncSpa = require('browser-sync-middleware-spa');
var minimist = require('minimist');
​
gulp.task('browser-sync', function() {
  console.log(process.argv);
  var index = process.argv.indexOf("--api-url");
  var apiurl = process.argv[index + 1];
  browserSync.init({
    server: {
      open: 'external',
      baseDir: ['./app', './'],
      middleware: [
        function(req, res, next) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Headers', '*');
          res.setHeader('Backend-Address', apiurl);
          next();
        }
      ]
    },
  });
​
    gulp.watch([
      'app/**/*.html',
      'app/**/*.js',
      '../app/**/*.css'
    ]).on('change', browserSync.reload);
});