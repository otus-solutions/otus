(function () {
  'use strict';

  angular
    .module('otusjs.application.crash')
    .service('otusjs.application.crash.CrashReportService', Service);

  Service.$inject = [
    '$window',
    'otusjs.application.crash.CrashReportFactory',
  ];

  function Service($window, CrashReportFactory) {
    var self = this;
    var NAME_PREFIX = 'otus-bugtracker-';
    var MAX_COOKIES_LENGHT_SIZE = 80000;
    var MAX_COOKIES_LIST_LENGHT = 10;
    var COOKIES_EXPIRATION_TIME_IN_DAYS = 1;

    self.persistException = persistException;
    self.getErrorList = getErrorList;
    self.clearCookiesPool = clearCookiesPool;

    var _browserInfo = {};

    _buildBrowserInfo();


    function _buildBrowserInfo() {
      _browserInfo.userAgent = navigator.userAgent;
      _browserInfo.browserName = getBrowserName(_browserInfo.userAgent);
      _browserInfo.browserVersion = getBrowserVersion(_browserInfo.browserName, _browserInfo.userAgent);
      _browserInfo.operatingSystemName = getOSName();
    }

    function persistException(exception) {
      var errorCookie = createCookie(exception);
      manageCookiePoolSize(errorCookie);

      document.cookie = errorCookie;
    }

    function createCookie(exception) {
      var date = new Date();
      var expirationTime = COOKIES_EXPIRATION_TIME_IN_DAYS * 24 * 60 * 60 * 1000;

      var name = NAME_PREFIX + date.getTime();
      var url = $window.location.href;

      date.setTime(date.getTime() + expirationTime);
      var expires = 'expires=' + date.toUTCString();

      var crash = CrashReportFactory.create(exception, url, _browserInfo.browserName, _browserInfo.browserVersion, _browserInfo.operatingSystemName);

      var errorData = JSON.stringify(crash);

      return name + '=' + errorData + ';' + expires + ';path=/';
    }


    function manageCookiePoolSize(cookie) {
      var cookies = getCookieList();
      var cookiesLength = getCookiesLength();
      var toRemove = [];
      var acSize = 0;

      if (cookiesLength + cookie.length > MAX_COOKIES_LENGHT_SIZE) {
        for (var i = 0; acSize <= cookie.length; i++) {
          toRemove.push(cookies[i]);
          acSize += cookies[i].length;
        }
      } else {
        if (cookies.length === MAX_COOKIES_LIST_LENGHT - 1) {
          toRemove.push(cookies[0])
        }
      }

      toRemove.forEach(function (cookie) {
        deleteCookie(getCookieName(cookie))
      })
    }

    function getCookieName(cookie) {
      return cookie.split("=")[0];
    }

    function getErrorList() {
      var name = NAME_PREFIX;
      var cookies = getCookieList();
      var errorList = [];

      for (var i = 0; i < cookies.length; i++) {
        var cookieString = cookies[i];
        while (cookieString.charAt(0) == ' ') {
          cookieString = cookieString.substring(1);
        }
        if (cookieString.indexOf(name) == 0) {
          cookieString = cookieString.substring(name.length + 14, cookieString.length);
          errorList.push(cookieString);
        }
      }

      return errorList;
    }

    function deleteCookie(name) {
      var pastDate = new Date(new Date().getTime() + parseInt(-1) * 1000 * 60 * 60 * 24);
      var expires = 'expires=' + pastDate.toUTCString();

      var expiredCookie = name + '=' + "" + ';' + expires + ';path=/';

      document.cookie = expiredCookie;
    }

    function clearCookiesPool() {
      getCookieList().forEach(function (cookie) {
        deleteCookie(getCookieName(cookie));
      })
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

    function getCookieList() {
      var decodedCookie = decodeURIComponent(document.cookie);
      return decodedCookie.split(';');
    }

    function getCookiesLength() {
      return document.cookie.length
    }
  }
}());
