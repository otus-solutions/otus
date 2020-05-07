(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusParticipantPasswordResetButton', {
      templateUrl: 'app/ux-component/participant-password-reset-button/participant-password-reset-button-template.html',
      bindings: {email: '<'},
      controller: Controller,
    });

  Controller.$inject = [
    'otusjs.participant.business.ParticipantManagerService'
  ];

  function Controller(ParticipantManagerService) {
    var self = this;

    self.resetPassword = resetPassword;

    function resetPassword() {
      ParticipantManagerService.requestPasswordReset(self.email);
    }

  }
}());