(function() {
  'use strict';

  angular
    .module('otusjs.application.state')
    .service('otusjs.application.state.ApplicationStateService', Service);

  Service.$inject = [
    'STATE',
    '$state'
  ];

  function Service(STATE, $state) {
    var self = this;

    /* Public Interface */
    self.activateActivityAdder = activateActivityAdder;
    self.activateActivityPlayer = activateActivityPlayer;
    self.activatePaperActivityAdder = activatePaperActivityAdder;
    self.activatePaperActivityInitializer = activatePaperActivityInitializer;
    self.activateInstaller = activateInstaller;
    self.activateLogin = activateLogin;
    self.activateLaboratory = activateLaboratory;
    self.activateDashboard = activateDashboard;
    self.activateParticipantDashboard = activateParticipantDashboard;
    self.activateParticipantActivities = activateParticipantActivities;
    self.activateParticipantReports = activateParticipantReports;
    self.activateSignup = activateSignup;
    self.activateSignupResult = activateSignupResult;
    self.getCurrentState = getCurrentState;
    self.activateSampleTransport = activateSampleTransport;
    self.activateSampleTransportationLotAdder = activateSampleTransportationLotAdder;
    // self.activateErrorOffline = activateErrorOffline;

    function activateActivityAdder() {
      $state.go(STATE.ACTIVITY_ADDER);
    }

    function activateActivityPlayer() {
      $state.go(STATE.ACTIVITY_PLAYER);
    }

    function activatePaperActivityAdder() {
      $state.go(STATE.PAPER_ACTIVITY_ADDER);
    }

    function activatePaperActivityInitializer() {
      $state.go(STATE.PAPER_ACTIVITY_INITIALIZER);
    }

    function activateInstaller() {
      $state.go(STATE.INSTALLER);
    }

    function activateLogin() {
      $state.go(STATE.LOGIN);
    }

    function activateLaboratory() {
      $state.go(STATE.LABORATORY);
    }

    function activateDashboard() {
      $state.go(STATE.DASHBOARD);
    }

    function activateParticipantDashboard() {
      $state.go(STATE.PARTICIPANT_DASHBOARD);
    }

    function activateParticipantActivities() {
      $state.go(STATE.PARTICIPANT_ACTIVITY);
    }

    function activateParticipantReports() {
      $state.go(STATE.PARTICIPANT_REPORT);
    }

    function activateSignup() {
      $state.go(STATE.SIGNUP);
    }

    function activateSignupResult() {
      $state.go(STATE.SIGNUP_RESULT);
    }

    function activateSampleTransport() {
      $state.go(STATE.SAMPLE_TRANSPORTATION_DASHBOARD);
    }

    function activateSampleTransportationLotAdder() {
      $state.go(STATE.SAMPLE_TRANSPORTATION_LOT_ADDER);
    }

    function getCurrentState() {
      return $state.current.name;
    }
    // function activateErrorOffline() {
    //   self.currentState = 'Offline';
    //   $state.go(APP_STATE.ERROR_OFFLINE);
    // }
  }
}());
