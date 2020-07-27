(function () {
  'use strict';

  angular.module('otusjs.otus.uxComponent')
    .component('otusParticipantLoginEmail', {
      controller: 'participantLoginEmailCtrl as $ctrl',
      templateUrl: 'app/ux-component/participants-manager/contact/participant-login-email/participant-login-email-template.html',
      bindings: {
        participant: '=',
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
    self.cancelEditLoginEmail = cancelEditLoginEmail;


    /* Lifecycle hooks */
    self.$onInit = onInit;

    /* Public methods */
    function onInit() {
      self.ParticipantContactValues = ParticipantContactValues;
      self.updatedLoginEmail = angular.copy(self.participant.email);
      self.form = { name: "loginEmailForm" };
      self.editMode = false;
    }

    function enableEditMode() {
      self.editMode = true;
    }

    function loginEmailConfirmation(scenario){
      ParticipantMessagesService.showLoginEmailDialog(ParticipantContactValues.dialogScene[scenario])
        .then(() => _selectServiceMethodByScenario(scenario))
        .catch(() => {
          cancelEditLoginEmail();
        });
    }

    function _selectServiceMethodByScenario(scenario){
      switch (scenario){
        case 'update': _updateLoginEmail(); break;
        case 'delete': _deleteLoginEmail(); break;
      }
    }

    function _updateLoginEmail(){
      alert("update-component: "+ self.participant);
      ParticipantManagerService.updateLoginEmail(self.participant._id, self.updatedLoginEmail)
      //ParticipantManagerService.editLoginEmail("5ea343bdb174c405c9bba6cd", self.updatedLoginEmail)
        .then(() => ParticipantManagerService.updateEmailParticipantSessionStorage(self.participant, self.updatedLoginEmail))
        .then(() => self.editMode = false)
        .catch((e) => alert(e));
    }

    function _deleteLoginEmail(){
      alert('delete')
    }

    function cancelEditLoginEmail(){
      self.updatedLoginEmail = angular.copy(self.participant.email);
      self.editMode = false;
    }
  }

}());