// Karma configuration
// Generated on Wed Jan 27 2016 14:11:34 GMT-0200 (Horário brasileiro de verão)
module.exports = function (config) {
  var APP_ROOT_PATH = 'app/';
  var TEST_UTILS_ROOT_PATH = 'tests/utils/';
  var DEPENDENCIES_ROOT_PATH = 'app/shared/';
  var NODE_MODULES_ROOT_PATH = 'node_modules/';
  var DIST = 'dist/';
  'use strict';
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify', 'jasmine'],

    // list of files / patterns to load in the browser
    files: [

      /* External dependencies */
      NODE_MODULES_ROOT_PATH + 'angular/angular.min.js',
      NODE_MODULES_ROOT_PATH + 'alasql/dist/alasql.min.js',
      NODE_MODULES_ROOT_PATH + 'd3/dist/d3.min.js',
      NODE_MODULES_ROOT_PATH + 'babel-polyfill/dist/polyfill.js',
      NODE_MODULES_ROOT_PATH + 'angular-resource/angular-resource.min.js',
      NODE_MODULES_ROOT_PATH + 'angular-animate/angular-animate.min.js',
      NODE_MODULES_ROOT_PATH + 'angular-aria/angular-aria.min.js',
      NODE_MODULES_ROOT_PATH + 'angular-material/angular-material.min.js',
      NODE_MODULES_ROOT_PATH + 'angular-material-badge/angular-material-badge.min.js',
      NODE_MODULES_ROOT_PATH + 'angular-messages/angular-messages.min.js',
      NODE_MODULES_ROOT_PATH + 'angular-mocks/angular-mocks.js',
      NODE_MODULES_ROOT_PATH + 'angular-ui-router/release/angular-ui-router.js',
      NODE_MODULES_ROOT_PATH + 'angular-ui-mask/dist/mask.min.js',
      NODE_MODULES_ROOT_PATH + 'ng-material-datetimepicker/dist/angular-material-datetimepicker.min.js',
      NODE_MODULES_ROOT_PATH + 'jquery/dist/jquery.min.js',
      NODE_MODULES_ROOT_PATH + 'angular-immutable/dist/immutable.min.js',
      NODE_MODULES_ROOT_PATH + 'js-base64/base64.min.js',
      NODE_MODULES_ROOT_PATH + 'lokijs/build/lokijs.min.js',
      NODE_MODULES_ROOT_PATH + 'lokijs/src/loki-angular.js',
      NODE_MODULES_ROOT_PATH + 'moment/min/moment.min.js',
      NODE_MODULES_ROOT_PATH + 'node-uuid/uuid.js',
      NODE_MODULES_ROOT_PATH + 'please-wait/build/please-wait.min.js',
      NODE_MODULES_ROOT_PATH + 'angular-bind-html-compile-ci-dev/angular-bind-html-compile.js',
      NODE_MODULES_ROOT_PATH + 'angular-sanitize/angular-sanitize.min.js',
      NODE_MODULES_ROOT_PATH + 'jasmine-promise-matchers/dist/jasmine-promise-matchers.js',
      NODE_MODULES_ROOT_PATH + 'lokijs/src/loki-indexed-adapter.js',
      NODE_MODULES_ROOT_PATH + 'angular-cookies/angular-cookies.min.js',

      /* Otus platform*/
      NODE_MODULES_ROOT_PATH + 'otus-client-js/dist/otus-client-min.js',
      NODE_MODULES_ROOT_PATH + 'otus-domain-client/dist/otus-domain-client-min.js',
      NODE_MODULES_ROOT_PATH + 'otus-model-js/dist/st-utils.min.js',
      NODE_MODULES_ROOT_PATH + 'label-maker-js/dist/label-maker-js/scripts/otusjs-label-maker.min.js',
      NODE_MODULES_ROOT_PATH + 'otus-validation-js/dist/otus-validation-min.js',
      NODE_MODULES_ROOT_PATH + 'otus-model-js/dist/otus-model.min.js',
      NODE_MODULES_ROOT_PATH + 'otus-preview-js/dist/otus-preview-js/scripts/otusjs-player-min.js',

      /* Static resources files */
      APP_ROOT_PATH + 'static-resource/**/*.js',

      /* Application files */
      APP_ROOT_PATH + 'app.js',

      /* Application Module files */
      APP_ROOT_PATH + '**/module.js',
      APP_ROOT_PATH + '**/**/module.js',
      APP_ROOT_PATH + '**/**/**/module.js',

      //'node_modules/otus-preview-js/app/player-module.js',
      //'dist/otus/scripts/deploy-module.min.js',

      APP_ROOT_PATH + '**/**/*.js', {
        pattern: 'tests/unit/**/*-spec.js',
        included: true
      },
      TEST_UTILS_ROOT_PATH + 'data/json-importer.js'

    ],

    // list of files to exclude
    exclude: [
      APP_ROOT_PATH + 'static-resource/force-refresh-page.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './app/**/*.js': ['babel', 'coverage'],
	'node_modules/otus*/**/*.js': 'babel',
      './tests/unit/**/*-spec.js': 'babel'
    },

    browserify: {
      debug: true,
      transform: ['babelify', 'stringify']
    },

    coverageReporter: {
      reporters: [{
        type: 'html',
        dir: 'target/test-coverage/'
      }, {
        type: 'lcov',
        dir: 'target/test-coverage/',
        subdir: 'report-lcov'
      }]
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'html', 'coverage', 'lcov'],

    htmlReporter: {
      outputFile: 'target/unit-result.report.html',
      //Optional
      pageTitle: 'Unit Tests'
    },
    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    client: {
      captureConsole: false
    },

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    capabilities: {
      'browserName': 'chrome',
      'chromeOptions': {
        args: ['--disable-browser-side-navigation']
      }
    }
  });
};
