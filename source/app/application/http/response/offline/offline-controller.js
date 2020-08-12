(function() {
  'use strict';

  angular
    .module('otusjs.application.http')
    .controller('otusjs.application.http.ResponseErrorOfflineController', Controller);

  Controller.$inject = [
    'otusjs.application.state.ApplicationStateService',
    '$mdColors',
    'THEME_CONSTANTS'
  ];

  function Controller(ApplicationStateService, $mdColors, THEME_CONSTANTS) {
    const self = this;
    self.$onInit = onInit;
    self.tryAgain = tryAgain;

    function onInit(){
      self.title = THEME_CONSTANTS.projectName;
      self.crashImageURL = THEME_CONSTANTS.iconLogoURL;
      self.titleStyle = {
        backgroundColor: $mdColors.getThemeColor('default-primary'),
        color: $mdColors.getThemeColor('accent-hue-1')
      };
    }

    function tryAgain() {
      ApplicationStateService.activateLogin();
    }
  }
}());
