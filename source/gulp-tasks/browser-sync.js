var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
  var index = process.argv.indexOf("--api-url");
  var apiurl = process.argv[index + 1] || 'https://localhost:51002';
  browserSync.init({
    server: {
      open: 'external',
      baseDir: ['../dist/otus/'],
      index: "app/index.html",
      middleware: [
        function(req, res, next) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Headers', '*');
          res.setHeader('Backend-Address', apiurl);
          next();
        }
      ]
    }
  });

    gulp.watch([
      '../dist/otus/index.html'
    ]).on('change', browserSync.reload);
});