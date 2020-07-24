(function () {
  'use strict';

  angular.module('otusjs.otus.uxComponent')
    .component('otusParticipantLoginEmail', {
      controller: 'participantLoginEmailCtrl as $ctrl',
      templateUrl: 'app/ux-component/participants-manager/contact/participant-login-email/participant-login-email-template.html',
      bindings: {
        originalParticipantLoginEmail: '@',
        contactId: '@',
      }
  }).controller('participantLoginEmailCtrl', Controller);

  Controller.$inject = [
    'ParticipantContactValues',
    'otusjs.participant.business.ParticipantManagerService',

  ];

  function Controller(ParticipantContactValues) {
    const self = this;

    self.enableEditMode = enableEditMode;
    self.editLoginEmail = editLoginEmail;
    self.cancelEditLoginEmail = cancelEditLoginEmail;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    /* Public methods */
    function onInit() {
      self.ParticipantContactValues = ParticipantContactValues;
      self.updatedParticipantLoginEmail = angular.copy(self.originalParticipantLoginEmail);
      self.form = { name: "loginEmailForm" };
      self.editMode = false;
    }

    function enableEditMode(position) {
      // self.backupContact[position] = angular.copy(self.contact[position]);
      // self.addContactMode[self.type] = false;
      self.editMode = true;
    }

    function editLoginEmail(updatedLoginEmail){
      alert("update-component: "+ self.updatedParticipantLoginEmail);
    }

    function cancelEditLoginEmail(){
      alert("cancel-component: "+ self.originalParticipantLoginEmail);
      self.updatedParticipantLoginEmail = angular.copy(self.originalParticipantLoginEmail);
      self.editMode = false;
    }



  }





}());