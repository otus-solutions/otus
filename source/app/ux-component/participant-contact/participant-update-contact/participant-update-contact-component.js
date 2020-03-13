(function(){
  'use strict';

  angular.module('otusjs.otus.uxComponent')
    .component('otusParticipantUpdateContact', {
      controller: 'participantUpdateContactCtrl as $ctrl',
      templateUrl: 'app/ux-component/participant-contact/participant-update-contact/participant-update-contact-template.html',
      bindings: {}
    }).controller('participantUpdateContactCtrl', Controller);

  Controller.$inject = [];

  function Controller() {
    const self = this;

  }
}());