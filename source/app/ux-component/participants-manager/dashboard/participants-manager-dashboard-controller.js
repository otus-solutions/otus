(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusParticipantsManagerDashboardCtrl', Controller);

  Controller.$inject = [
    '$q',
    'otusjs.participant.business.ParticipantManagerService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.participant.storage.ParticipantStorageService'
  ];

  function Controller($q, ParticipantManagerService, ApplicationStateService, ParticipantStorageService) {
    var self = this;
  }
}());
