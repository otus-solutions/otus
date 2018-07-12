(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusError', {
      controller: Controller,
      templateUrl: 'app/ux-component/error/error-template.html'
    });

  Controller.$inject = [
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(ApplicationStateService) {

    self.tryAgain = tryAgain;

    function tryAgain() {
      ApplicationStateService.activateLogin();
    }
  }
})();
