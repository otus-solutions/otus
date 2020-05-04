(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusParticipantPasswordResetButton', {
      controller: Controller,
      templateUrl: 'app/ux-component/participant-password-reset-button/participant-password-reset-button-template.html'
    });

  Controller.$inject = [
    'otusjs.participantPasswordResetButton.ParticipantPasswordResetButtonService'
  ];

  function Controller(ParticipantPasswordResetButtonService) {
    var self = this;

    self.callFunction = callFunction;

    function callFunction() {
      ParticipantPasswordResetButtonService.sayHello();
    }

  }
}());