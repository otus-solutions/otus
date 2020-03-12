(function () {
  'use strict';

  angular.module('otusjs.otus.uxComponent')
    .component('otusParticipantContacts', {
      controller: 'participantContactsCtrl as $ctrl',
      templateUrl: 'app/ux-component/participant-contacts/participant-contacts-template.html',
      bindings: {}
    }).controller('participantContactsCtrl', Controller);

  Controller.$inject = [];

  function Controller() {
    const self = this;
  }

}());