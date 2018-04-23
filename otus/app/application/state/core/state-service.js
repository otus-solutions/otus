(function () {
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
    self.activatePaperActivityInitializer = activatePaperActivityInitializer;
    self.activateInstaller = activateInstaller;
    self.activateLogin = activateLogin;
    self.activateLaboratory = activateLaboratory;
    self.activateDashboard = activateDashboard;
    self.activateParticipantDashboard = activateParticipantDashboard;
    // self.activateReportDashboard = activateReportDashboard;
    self.activateParticipantActivities = activateParticipantActivities;
    self.activateParticipantReports = activateParticipantReports;
    self.activateSignup = activateSignup;
    self.activateSignupResult = activateSignupResult;
    self.getCurrentState = getCurrentState;
    self.activateSampleTransportation = activateSampleTransportation;
    self.activateSampleTransportationLotInfoManager = activateSampleTransportationLotInfoManager;
    self.activateSampleTransportationManagerList = activateSampleTransportationManagerList;
    self.activateActivityCategories = activateActivityCategories;
    self.activateExamsDashBoard = activateExamsDashBoard;
    self.activateExamsLotsManagerList = activateExamsLotsManagerList;
    self.activateExamsLotInfoManager = activateExamsLotInfoManager;
    self.activateExamSending = activateExamSending;
    self.activateExamResultsVisualizer = activateExamResultsVisualizer;
    // self.activateErrorOffline = activateErrorOffline;

    function activateActivityAdder() {
      $state.go(STATE.ACTIVITY_ADDER);
    }

    function activateActivityPlayer() {
      $state.go(STATE.ACTIVITY_PLAYER);
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

    // function activateReportDashboard() {
    //   $state.go(STATE.REPORT_VISUALIZER);
    // }

    function activateActivityCategories() {
      $state.go(STATE.ACTIVITY_CATEGORY_ADDER);
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

    function activateSampleTransportation() {
      $state.go(STATE.SAMPLE_TRANSPORTATION_DASHBOARD);
    }

    function activateSampleTransportationManagerList() {
      $state.go(STATE.SAMPLE_TRANSPORTATION_MANAGER_LIST);
    }

    function activateSampleTransportationLotInfoManager() {
      $state.go(STATE.SAMPLE_TRANSPORTATION_LOT_INFO_MANAGER);
    }

    function activateExamsDashBoard() {
      $state.go(STATE.EXAM_DASHBOARD);
    }

    function activateExamsLotsManagerList() {
      $state.go(STATE.EXAM_LOT_MANAGER_LIST);
    }

    function activateExamsLotInfoManager() {
      $state.go(STATE.EXAM_LOT_INFO_MANAGER);
    }

    function activateExamSending() {
      $state.go(STATE.EXAM_SENDING, {}, { reload: true });
    }

    function activateExamResultsVisualizer() {
      $state.go(STATE.EXAM_RESULT_VISUALIZER);
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
