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
    var self = this;

    self.exception = exception.message.substring(0,500);
    self.cause = exception.stack.substring(0,2000);  //maybe start at exception.message.length
    self.url = url;
    self.date = new Date();
    self.browserOnline = navigator.onLine;
    self.browserName = browserName;
    self.browserVersion = browserVersion;
    self.cookiesEnabled = navigator.cookieEnabled;
    self.plataform = operatingSystemName;

    return self;
  }
}());
