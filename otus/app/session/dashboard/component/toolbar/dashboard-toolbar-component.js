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

  Controller.$inject = ['$mdSidenav'];

  function Controller($mdSidenav) {
    var self = this;

    /* Public methods */
    self.open = open;
    self.selectParticipant = selectParticipant;

    function open() {
      $mdSidenav('left').toggle();
    }

    function selectParticipant(selectedParticipant) {
      self.onParticipantSelect({
        participant: selectedParticipant
      });
    }
  }
}());
