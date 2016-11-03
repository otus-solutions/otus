(function() {
  'use strict';

  angular
    .module('otusjs.otus.dashboard')
    .component('otusDashboard', {
      controller: Controller,
      templateUrl: 'app/session/dashboard/component/dashboard/dashboard-template.html'
    });

  Controller.$inject = [
    '$mdDialog',
    'ParticipantSearchResultService'
  ];

  function Controller($mdDialog, ParticipantSearchResultService) {
    var self = this;

    /* Public methods */
    self.selectParticipant = selectParticipant;

    function selectParticipant(selectedParticipant) {
      self.selectedParticipant = selectedParticipant;
    }
  }
}());
