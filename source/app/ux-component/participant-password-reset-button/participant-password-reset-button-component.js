(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusParticipantPasswordResetButton', {
      templateUrl: 'app/ux-component/participant-password-reset-button/participant-password-reset-button-template.html',
      bindings: {
        email: '<',
        confirmation: '<'
      },
      controller: Controller,
    });

  Controller.$inject = [
    'otusjs.participant.business.ParticipantManagerService',
    'otusjs.participant.business.ParticipantMessagesService'
  ];

  function Controller(ParticipantManagerService, ParticipantMessagesService) {
    var self = this;

    self.resetPassword = resetPassword;
    self.copyLinkToClipboard = copyLinkToClipboard;

    function resetPassword() {
      ParticipantMessagesService.showToast('Enviando e-mail de recuperação de senha...');
      ParticipantManagerService.requestPasswordReset(self.email)
        .then(() => ParticipantMessagesService.showToast('E-mail enviado!'))
        .catch(() => ParticipantMessagesService.showToast('Falha ao enviar e-mail.'));
    }

    function copyLinkToClipboard() {
      ParticipantManagerService.requestPasswordResetLink(self.email)
        .then(link => {
          let $temp = $("<input>");
          $("body").append($temp);
          $temp.val(link).select();
          document.execCommand("copy");
          $temp.remove();
          ParticipantMessagesService.showToast("Link copiado!", 3000);
        })
        .catch(() => ParticipantMessagesService.showToast('Falha ao obter link.'));
    }

  }
}());
