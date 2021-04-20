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
    self.verifyStateParticipantDashboard = verifyStateParticipantDashboard;
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


    function verifyStateParticipantDashboard() {
      let selectedState = ApplicationStateService.getCurrentState();
      let response = false;

      switch (selectedState) {
        case STATE.PARTICIPANT_ACTIVITY: {
          response = true;
          break;
        }
        case STATE.PARTICIPANT_DASHBOARD: {
          response = true;
          break;
        }
        case STATE.PARTICIPANT_REPORT: {
          response = true;
          break;
        }
        case STATE.PARTICIPANT_ACTIVITY_STAGE: {
          response = true;
          break;
        }
        case STATE.LABORATORY: {
          response = true;
          break;
        }
        case STATE.USER_COMMENT_ABOUT_PARTICIPANT: {
          response = true;
          break;
        }
        case STATE.PARTICIPANT_FOLLOW_UPS: {
          response = true;
          break;
        }
        case STATE.ACTIVITY_ADDER: {
          response = true;
          break;
        }
        case STATE.PARTICIPANT_UPDATE: {
          response = true;
          break;
        }
        default: {
          break;
        }
      }

      return response;
    }
  }
}());
