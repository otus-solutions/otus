(function () {
  'use strict';

  angular
    .module('otusjs.application.crash')
    .factory('otusjs.application.crash.CrashReportFactory', Factory);

  function Factory() {
    var self = this;
    self.create = create;

    function create(exception, url, browserName, browserVersion, operatingSystemName) {
      return new ErrorData(exception, url, browserName, browserVersion, operatingSystemName);
    }

    return self;
  }

  function ErrorData(exception, url, browserName, browserVersion, operatingSystemName) {
    var errorData = {};
    errorData.exception = exception.message;
    errorData.cause = exception.stack;
    errorData.url = url;
    errorData.date = new Date();
    errorData.browserOnline = navigator.onLine;
    errorData.browserName = browserName;
    errorData.browserVersion = browserVersion;
    errorData.cookiesEnabled = navigator.cookieEnabled;
    errorData.plataform = operatingSystemName;

    return errorData;
  }
}());
