(function() {
  'use strict';

  angular
    .module('otusjs.otus.dashboard.service')
    .service('otusjs.otus.dashboard.service.DashboardService', Service);

  Service.$inject = [
    'otusjs.otus.dashboard.core.ContextService',
    'otusjs.otus.dashboard.core.EventService'
  ];

  function Service(ContextService, EventService) {
    var self = this;

    /* Public methods */
    self.getSelectedParticipant = getSelectedParticipant;
    self.getLoggedUser = getLoggedUser;

    function getSelectedParticipant() {
      return ContextService.getSelectedParticipant();
    }

    function getLoggedUser() {
      return ContextService.getLoggedUser();
    }
  }
}());
