(function() {
  'use strict';

  angular
    .module('otusjs.otus.dashboard')
    .component('otusDashboardToolbar', {
      controller: Controller,
      templateUrl: 'app/session/dashboard/component/toolbar/dashboard-toolbar-template.html',
      bindings: {
        onParticipantSelect: '&'
      }
    });

  function Controller() {
    var self = this;

    /* Public methods */
    self.selectParticipant = selectParticipant;

    function selectParticipant(selectedParticipant) {
      self.onParticipantSelect({
        participant: selectedParticipant
      });
    }
  }
}());
