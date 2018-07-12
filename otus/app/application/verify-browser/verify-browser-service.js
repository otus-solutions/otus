(function () {
  'use strict';

  angular
    .module('otusjs.application.verifyBrowser')
    .service('otusjs.application.verifyBrowser.verifyBrowserService', Service);

  Service.$inject = [
    'otusjs.application.state.ApplicationStateService'
  ];

  function Service(ApplicationStateService) {
    const MSIE_FULL_NAME = 'Microsoft Internet Explorer';
    const UNKNOWN_BROWSER = 'Unknown Browser';
    const VERSION = '52';
    const CHROME = 'Chrome';
    const OPERA = 'Opera';
    const MSIE = 'MSIE';
    const SAFARI = 'Safari';
    const FIREFOX = 'Firefox';

    var self = this;
    var userAgent = navigator.userAgent;

    self.verify = verify;

    function verify() {

      if(_getBrowserName() != CHROME || _getBrowserVersion(_getBrowserName()) < VERSION){
        ApplicationStateService.activateError();
      }
    }
    function _getBrowserName() {
      var browserName = UNKNOWN_BROWSER;
      var nameOffset;
      var verOffset;

      if ((verOffset = userAgent.indexOf(OPERA)) != -1) {
        browserName = OPERA;
      } else if ((verOffset = userAgent.indexOf(MSIE)) != -1) {
        browserName = MSIE_FULL_NAME;
      } else if ((verOffset = userAgent.indexOf(CHROME)) != -1) {
        browserName = CHROME;
      } else if ((verOffset = userAgent.indexOf(SAFARI)) != -1) {
        browserName = SAFARI;
      } else if ((verOffset = userAgent.indexOf(FIREFOX)) != -1) {
        browserName = FIREFOX;
      } else if ((nameOffset = userAgent.lastIndexOf(' ') + 1) <
        (verOffset = userAgent.lastIndexOf('/'))) {
        browserName = userAgent.substring(nameOffset, verOffset);
        if (browserName.toLowerCase() == browserName.toUpperCase()) {
          browserName = navigator.appName;
        }
      }

      return browserName
    }

    function _getBrowserVersion(browserName) {
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
