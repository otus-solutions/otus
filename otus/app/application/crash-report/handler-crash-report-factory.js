(function () {
  'use strict';

  angular
    .module('otusjs.application.crash')
    .factory('$exceptionHandler', ['$log', 'otusjs.application.crash.CrashReportService', function ($log, Service) {
      return function (exception) {
        $log.error(exception);
        Service.persistException(exception)
      }
    }]);
}());
