(function () {
  'use strict';

  angular.module('otusjs.otus.uxComponent')
    .component('otusParticipantContact', {
      controller: 'participantContactCtrl as $ctrl',
      templateUrl: 'app/ux-component/participant-contact/participant-contact-template.html',
      bindings: {}
    }).controller('participantContactCtrl', Controller);

  Controller.$inject = [];

  function Controller() {
    const self = this;
  }

}());

// if (ApplicationStateService.getCurrentState() == STATE.PENDENCY_VIEWER && item) {
