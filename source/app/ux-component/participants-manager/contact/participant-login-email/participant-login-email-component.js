(function () {
  'use strict';

  angular.module('otusjs.otus.uxComponent')
    .component('otusParticipantLoginEmail', {
      controller: 'participantLoginEmailCtrl as $ctrl',
      templateUrl: 'app/ux-component/participants-manager/contact/participant-login-email/participant-login-email-template.html',
      bindings: {
        participant: '=',
        contactEmails: '<',
      }
    }).controller('participantLoginEmailCtrl', Controller);

  Controller.$inject = [
    'ParticipantContactValues',
    'otusjs.participant.business.ParticipantManagerService',
    'otusjs.participant.business.ParticipantMessagesService',
  ];

  function Controller(ParticipantContactValues, ParticipantManagerService, ParticipantMessagesService) {
    const self = this;

    self.enableEditMode = enableEditMode;
    self.loginEmailConfirmation = loginEmailConfirmation;
    self.resetLoginEmailForm = resetLoginEmailForm;
    self.selectedItemChange = selectedItemChange;
    self.getEmailCandidates = getEmailCandidates;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    /* Public methods */
    function onInit() {
      self.ParticipantContactValues = ParticipantContactValues;
      self.updatedLoginEmail = angular.copy(self.participant.email);
      self.editMode = false;
    }

    function enableEditMode() {
      self.editMode = true;
    }

    function loginEmailConfirmation(scenario) {
      self.loginEmailForm.$setDirty();
      if(self.loginEmailForm.$invalid){
        return;
      }

      ParticipantMessagesService.showLoginEmailDialog(ParticipantContactValues.dialogScene[scenario])
        .then(() => _selectServiceMethodByScenario(scenario))
        .catch(() => {
          resetLoginEmailForm();
        });
    }

    function _selectServiceMethodByScenario(scenario) {
      switch (scenario) {
        case 'update':
          _updateLoginEmail();
          break;
        case 'delete':
          _removeEmailByParticipantId();
          break;
      }
    }

    function _updateLoginEmail() {
      ParticipantManagerService.updateLoginEmail(self.participant._id, self.updatedLoginEmail)
        //   ParticipantManagerService.updateLoginEmail("5ea343bdb174c405c9bba6cd", self.updatedLoginEmail)
        .then(() => ParticipantManagerService.updateEmailParticipantSessionStorage(self.participant, self.updatedLoginEmail))
        .then(() => self.editMode = false)
        .then(() => ParticipantMessagesService.showToast('Login alterado com sucesso!'))
        .catch((e) => ParticipantMessagesService.showToast(`Erro: ${e.status} - ${e.data.MESSAGE}`));
    }

    function _removeEmailByParticipantId() {
      ParticipantManagerService.removeEmailByParticipantId(self.participant._id)
        //ParticipantManagerService.removeEmailByParticipantId("5ea343bdb174c405c9bba6cd")
        .then(() => ParticipantManagerService.updateEmailParticipantSessionStorage(self.participant, undefined))
        .then(() => self.updatedLoginEmail = undefined)
        .then(() => self.editMode = false)
        .then(() => resetLoginEmailForm())
        .then(() => ParticipantMessagesService.showToast('Login removido com sucesso!'))
        .catch((e) => ParticipantMessagesService.showToast(`Erro: ${e.status} - ${e.data.MESSAGE}`));
    }

    function resetLoginEmailForm() {
      self.updatedLoginEmail = angular.copy(self.participant.email);
      self.loginEmailForm.$error = {};
      self.loginEmailForm.input.$error = {};
      self.loginEmailForm.$setPristine();
      self.loginEmailForm.$setUntouched();
      self.editMode = false;
    }

    function selectedItemChange(item) {
      self.updatedLoginEmail = item;
    }
  }

  function getEmailCandidates(contacts) {
    let emailCandidates = [];
    for (var key in contacts) {
      if (contacts[key] !== null) emailCandidates.push(contacts[key].value.content)
    }
    return emailCandidates;
  }
}());
