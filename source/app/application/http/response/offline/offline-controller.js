(function() {
  'use strict';

  angular
    .module('otusjs.application.http')
    .controller('otusjs.application.http.ResponseErrorOfflineController', Controller);

  Controller.$inject = [
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(ApplicationStateService) {
    var self = this;
    self.tryAgain = tryAgain;

    function tryAgain() {
      ApplicationStateService.activateLogin();
    }
  }
}());
