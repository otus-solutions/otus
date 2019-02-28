(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusDashboardToolbar', {
      controller: Controller,
      templateUrl: 'app/ux-component/dashboard-toolbar/dashboard-toolbar-template.html',
      bindings: {
        onParticipantSelect: '&'
      },
      transclude: true
    });

  Controller.$inject = [
    'otusjs.otus.dashboard.core.ContextService',
    'otusjs.otus.dashboard.core.EventService'
  ];

  function Controller(ContextService, EventService) {
    var self = this;

    /* Public methods */
    self.selectParticipant = selectParticipant;

    self.$onInit = onInit;

    function selectParticipant(selectedParticipant) {
      self.onParticipantSelect({
        participant: selectedParticipant
      });
    }

    function onInit() {
      _loadLoggedUser();
      EventService.onLogin(_loadLoggedUser);
    }

    function _loadLoggedUser(userData) {
      if (userData) {
        self.loggedUser = userData;
      } else {
        ContextService
          .getLoggedUser()
          .then(function(userData) {
            self.loggedUser = userData;
          });
      }
    }
  }
}());