var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
  var index = process.argv.indexOf("--api-url");
  var indexPlayer = process.argv.indexOf("--player-url");
  var apiurl = "http://localhost:51002"//process.argv[index + 1];
  var apiPlayer = process.argv[indexPlayer + 1];
  browserSync.init({
    server: {
      open: 'external',
      baseDir: ['./app', './'],
      middleware: [
        function(req, res, next) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Headers', '*');
          res.setHeader('Set-Cookie',['Backend-Address='+apiurl+';path=/', 'Player-Address='+apiPlayer+';path=/']);
          next();
        }
      ]
    }
  });

  gulp.watch([
    'app/**/*.html',
    'app/**/*.js',
    '../app/**/*.css'
  ]).on('change', browserSync.reload);
});
