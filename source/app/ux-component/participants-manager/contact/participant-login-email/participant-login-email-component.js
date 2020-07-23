(function () {
  'use strict';

  angular.module('otusjs.otus.uxComponent')
    .component('otusParticipantLoginEmail', {
      controller: 'participantLoginEmailCtrl as $ctrl',
      templateUrl: 'app/ux-component/participants-manager/contact/participant-login-email/participant-login-email-template.html',
      bindings: {
        participantLoginEmail: '@',
        contactId: '@',
      }
  }).controller('participantLoginEmailCtrl', Controller);

  Controller.$inject = [
    'ParticipantContactValues'
  ];

  function Controller(ParticipantContactValues) {
    const self = this;

    self.enableEditMode = enableEditMode;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    /* Public methods */
    function onInit() {
      self.ParticipantContactValues = ParticipantContactValues;
      self.form = { name: "loginEmailForm" };
      self.editMode = false;
      console.log(self.participantLoginEmail)
    }

    function enableEditMode(position) {
      // self.backupContact[position] = angular.copy(self.contact[position]);
      // self.addContactMode[self.type] = false;
      self.editMode = true;
    }

  }





}());