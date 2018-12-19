(function () {
  'use strict';

  angular
    .module('otusjs.application.crash')
    .service('otusjs.application.crash.CrashReportService', Service);

  Service.$inject = [
    '$window',
    'otusjs.application.crash.CrashReportFactory',
    'otusjs.application.crash.CrashLocalStorageService'
  ];

  function Service($window, CrashReportFactory, CrashLocalStorageService) {
    var self = this;
    var LIMIT = 30;
    var LIMIT_DATA = 500;
    var _browserInfo = {};

    self.persistException = persistException;
    self.getErrorList = getErrorList;

    _buildBrowserInfo();

    function _buildBrowserInfo() {
      _browserInfo.userAgent = navigator.userAgent;
      _browserInfo.browserName = getBrowserName(_browserInfo.userAgent);
      _browserInfo.browserVersion = getBrowserVersion(_browserInfo.browserName, _browserInfo.userAgent);
      _browserInfo.operatingSystemName = getOSName();
    }

    function _clean() {
      var date = new Date();
      var expirationTime = 1 * 24 * 60 * 60 * 1000;
      var compareDate = CrashLocalStorageService.find();
      var deleteData = CrashLocalStorageService.getCollectionError().maxId;

      date.setTime(date.getTime() - expirationTime);

      var dateTime = date.getTime();

      if (compareDate) {
        compareDate.map(function (oneDate) {
          if (oneDate.meta.created < dateTime) {
            CrashLocalStorageService.remove(oneDate);
          }
          return oneDate;
        });

        if(deleteData == LIMIT_DATA){
          CrashLocalStorageService.clear();
        }
      }
    }

    function persistException(exception) {
      var totalData = CrashLocalStorageService.count();

      if(totalData < LIMIT){
        CrashLocalStorageService.insert(_createIndexedDB(exception));
      }else{
        var deleteLoki = CrashLocalStorageService.getCollectionError().idIndex;
        CrashLocalStorageService.remove({'$loki':deleteLoki[0]});
      }

      _clean();

    }

    function _createIndexedDB(exception) {
      var url = $window.location.href;
      var errorData = CrashReportFactory.create(exception, url, _browserInfo.browserName, _browserInfo.browserVersion, _browserInfo.operatingSystemName);

      return errorData;
    }

    function getErrorList() {
      var dataError = CrashLocalStorageService.getCollectionError();
      var errorList = JSON.stringify(dataError);

      _clean();

      return errorList;
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
  }
}());