(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusDashboardToolbar', {
      controller: 'otusDashboardToolbarCtrl as $ctrl',
      templateUrl: 'app/ux-component/dashboard-toolbar/dashboard-toolbar-template.html',
      bindings: {
        onParticipantSelect: '&'
      },
      transclude: true
    })
    .controller('otusDashboardToolbarCtrl', Controller)

  Controller.$inject = [
    'otusjs.otus.dashboard.core.ContextService',
    'otusjs.otus.dashboard.core.EventService',
    'THEME_CONSTANTS',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.participant.core.ContextService',
    'STATE'
  ];

  function Controller(ContextService, EventService, THEME_CONSTANTS, ApplicationStateService, ParticipantContextService, STATE) {
    var self = this;

    /* Public methods */
    self.$onInit = onInit;
    self.selectParticipant = selectParticipant;
    self.home = home;

    function onInit() {
      self.imageIconURL = THEME_CONSTANTS.imageURLs.favicon;

      _loadLoggedUser();
      EventService.onLogin(_loadLoggedUser);
    }

    function selectParticipant(selectedParticipant) {
      self.onParticipantSelect({
        participant: selectedParticipant
      });
    }

    function _loadLoggedUser(userData) {
      if (userData) {
        self.loggedUser = userData;
      } else {
        ContextService
          .getLoggedUser()
          .then(function (userData) {
            self.loggedUser = userData;
          });
      }
    }

    function home() {
      ParticipantContextService.removeData('selectedParticipant');
      ApplicationStateService.activateDashboard();
    }

  }
}());
