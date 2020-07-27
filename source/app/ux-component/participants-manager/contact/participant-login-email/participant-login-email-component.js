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
    '$window'

  ];

  function Controller(ParticipantContactValues, ParticipantManagerService, $window ) {
    const self = this;

    self.enableEditMode = enableEditMode;
    self.editLoginEmail = editLoginEmail;
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

    function editLoginEmail(){
      alert("update-component: "+ self.participant);
      ParticipantManagerService.editLoginEmail(self.participant._id, self.updatedLoginEmail)
      // ParticipantManagerService.editLoginEmail("5ea343bdb174c405c9bba6cc", updatedLoginEmail)
        .then(() => alert("antes: " +self.participant.email))
        .then(() => updatedParticipantSessionStorage(self.participant, self.updatedLoginEmail))
        .then(() => alert("depois: "+self.participant.email))
        .then(() => self.editMode = false);
    }

    function updatedParticipantSessionStorage(participant, updatedEmail){
      participant.email = updatedEmail;
      var sessionStorageParticipant = JSON.parse($window.sessionStorage.getItem('participant_context'))
      sessionStorageParticipant.selectedParticipant.email = updatedEmail;
      $window.sessionStorage.setItem('participant_context', JSON.stringify(sessionStorageParticipant));
    }

    function cancelEditLoginEmail(){
      self.updatedParticipantLoginEmail = angular.copy(self.originalParticipantLoginEmail);
      self.editMode = false;
    }
  }





}());