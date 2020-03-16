(function(){
  'use strict';

  angular.module('otusjs.otus.uxComponent')
    .component('otusParticipantUpdateContact', {
      controller: 'participantUpdateContactCtrl as $ctrl',
      templateUrl: 'app/ux-component/participants-manager/contact/participant-update-contact/participant-update-contact-template.html',
      bindings: {
        contact: '='
      }
    }).controller('participantUpdateContactCtrl', Controller);

  Controller.$inject = ['PARTICIPANT_CONTACT_TITLES'];

  function Controller(PARTICIPANT_CONTACT_TITLES) {
    const self = this;
    self.PARTICIPANT_CONTACT_TITLES = PARTICIPANT_CONTACT_TITLES;
  }
}());