(function () {
  'use strict';

  angular
    .module('otusjs.application.verifyBrowser')
    .service('otusjs.application.verifyBrowser.verifyBrowserService', Service);

  Service.$inject = [
    'otusjs.application.state.ApplicationStateService'
  ];

  function Service(ApplicationStateService) {
    var self = this;
    var userAgent = navigator.userAgent;

    self.verify = verify;
    self.getBrowserName = getBrowserName;
    self.getBrowserVersion = getBrowserVersion;

    function verify() {
      if(getBrowserName() == "Chrome"){
        ApplicationStateService.activateInstaller();
      }
    }
    function getBrowserName() {

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
  }
}());
