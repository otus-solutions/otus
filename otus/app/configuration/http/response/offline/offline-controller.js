(function() {
  'use strict';

  angular
    .module('otusjs.otus.configuration.http')
    .controller('otusjs.otus.configuration.http.ResponseErrorOfflineController', Controller);

  Controller.$inject = [
    'otusjs.otus.configuration.state.ApplicationStateService'
  ];

  function Controller(ApplicationStateService) {
    var self = this;
    self.tryAgain = tryAgain;

    function tryAgain() {
      ApplicationStateService.activateLogin();
    }
  }
}());
