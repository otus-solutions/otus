(function () {
  'use strict';

  angular
    .module('otusjs.application.crash')
    .service('otusjs.application.crash.CrashReportService', Service);

  Service.$inject = [
    '$window',
    'otusjs.application.crash.CrashReportFactory'
  ];

  function Service($window, CrashReportFactory) {
    var self = this;
    self.persistException = persistException;
    self.getCookie = getCookie;

    function persistException(exception) {
      var userAgent = navigator.userAgent;
      var exdays = 1;
      var date = new Date();
      var name = 'otus-bugtracker-' + date.getTime();
      date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = 'expires=' + date.toUTCString();
      var url = $window.location.href;
      var browserName = getBrowserName(userAgent);
      var browserVersion = getBrowserVersion(browserName, userAgent);
      var operatingSystemName = getOSName();
      var errorData = JSON.stringify(CrashReportFactory.create(exception, url, browserName, browserVersion, operatingSystemName));
      var updatedCookie = name + '=' + errorData + ';' + expires + ';path=/';
      document.cookie = updatedCookie;
    }

    function getBrowserName(userAgent) {
      var browserName = 'Unknown Browser';
      var nameOffset;
      var verOffset;

      if ((verOffset = userAgent.indexOf('Opera')) != -1) {
        browserName = 'Opera';
      } else if ((verOffset = userAgent.indexOf('MSIE')) != -1) {
        browserName = 'Microsoft Internet Explorer';
      } else if ((verOffset = userAgent.indexOf('Chrome')) != -1) {
        browserName = 'Chrome';
      } else if ((verOffset = userAgent.indexOf('Safari')) != -1) {
        browserName = 'Safari';
      } else if ((verOffset = userAgent.indexOf('Firefox')) != -1) {
        browserName = 'Firefox';
      } else if ((nameOffset = userAgent.lastIndexOf(' ') + 1) <
        (verOffset = userAgent.lastIndexOf('/'))) {
        browserName = userAgent.substring(nameOffset, verOffset);
        if (browserName.toLowerCase() == browserName.toUpperCase()) {
          browserName = navigator.appName;
        }
      }

      return browserName
    }

    function getBrowserVersion(browserName, userAgent) {
      var stringVersion;
      var fullVersion = userAgent.substring(userAgent.indexOf(browserName) + browserName.length + 1);

      stringVersion = fullVersion.indexOf(';');
      if (stringVersion != -1) {
        fullVersion = fullVersion.substring(0, stringVersion);
      }

      stringVersion = fullVersion.indexOf(' ');
      if (stringVersion != -1) {
        fullVersion = fullVersion.substring(0, stringVersion);
      }

      return fullVersion;
    }

    function getOSName() {
      var OSName = 'Unknown OS';
      if (navigator.appVersion.indexOf('Win') != -1) {
        OSName = 'Windows';
      } else if (navigator.appVersion.indexOf('Mac') != -1) {
        OSName = 'MacOS';
      } else if (navigator.appVersion.indexOf('X11') != -1) {
        OSName = 'UNIX';
      } else if (navigator.appVersion.indexOf('Linux') != -1) {
        OSName = 'Linux';
      }

      return OSName;
    }

    function getCookie() {
      var name = 'otus-bugtracker-';
      var decodedCookie = decodeURIComponent(document.cookie);
      var cookies = decodedCookie.split(';');
      var crash = [];

      for (var i = 0; i < cookies.length; i++) {
        var cookieString = cookies[i];
        while (cookieString.charAt(0) == ' ') {
          cookieString = cookieString.substring(1);
        }
        if (cookieString.indexOf(name) == 0) {
          cookieString = cookieString.substring(name.length + 14, cookieString.length);
          crash.push(cookieString);
        }
      }

      return crash;
    }
  }
}());
