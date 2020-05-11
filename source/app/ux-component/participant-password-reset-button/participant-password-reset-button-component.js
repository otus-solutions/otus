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
    'otusjs.participant.business.ParticipantManagerService',
    'otusjs.participant.business.ParticipantMessagesService'
  ];

  function Controller(ParticipantManagerService, ParticipantMessagesService) {
    var self = this;

    self.resetPassword = resetPassword;

    function resetPassword() {
      ParticipantMessagesService.showToast('Enviando e-mail de recuperação de senha...');
      ParticipantManagerService.requestPasswordReset(self.email)
        .then(() => ParticipantMessagesService.showToast('E-mail enviado!'))
        .catch(() => ParticipantMessagesService.showToast('Falha ao enviar e-mail.'));
    }

  }
}());