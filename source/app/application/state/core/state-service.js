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
    self.activateActivityViewer = activateActivityViewer;
    self.activateInstaller = activateInstaller;
    self.activateLogin = activateLogin;
    self.activateError = activateError;
    self.activateLaboratory = activateLaboratory;
    self.activateParticipantFollowUps = activateParticipantFollowUps;
    self.activateDashboard = activateDashboard;
    self.activateParticipantDashboard = activateParticipantDashboard;
    self.activateCreateParticipant = activateCreateParticipant;
    self.activateUpdateParticipant = activateUpdateParticipant;
    self.activateParticipantActivities = activateParticipantActivities;
    self.activateParticipantReports = activateParticipantReports;
    self.activateSignup = activateSignup;
    self.activateSignupResult = activateSignupResult;
    self.getCurrentState = getCurrentState;
    self.activateSampleTransportation = activateSampleTransportation;
    self.activateUnattachedLaboratory = activateUnattachedLaboratory;
    self.activateSampleTransportationLotInfoManager = activateSampleTransportationLotInfoManager;
    self.activateSampleTransportationManagerList = activateSampleTransportationManagerList;
    self.activateActivityCategories = activateActivityCategories;
    self.activateExamsDashBoard = activateExamsDashBoard;
    self.activateExamsLotsManagerList = activateExamsLotsManagerList;
    self.activateExamsLotInfoManager = activateExamsLotInfoManager;
    self.activateExamSending = activateExamSending;
    self.activateExamResultsVisualizer = activateExamResultsVisualizer;
    self.activateMonitoring = activateMonitoring;
    self.activateManagerParticipants = activateManagerParticipants;
    self.activateParticipantsList = activateParticipantsList;
    self.activateActivityImport = activateActivityImport;
    self.activateLaboratoryMonitoring = activateLaboratoryMonitoring;
    self.activateLaboratoryMaterialManager = activateLaboratoryMaterialManager;
    self.activateMaterialLabelDashboard = activateMaterialLabelDashboard;
    self.activateActivityFlagsReport = activateActivityFlagsReport;
    self.laboratoryActivityFlagsReport = laboratoryActivityFlagsReport;
    self.activateOfflineActivitySynchronize = activateOfflineActivitySynchronize;
    self.currentStateIsListViewer = currentStateIsListViewer;
    self.activatePendencyViewer = activatePendencyViewer;
    self.activateIssueViewer = activateIssueViewer;
    self.activateIssueMessagesViewer = activateIssueMessagesViewer;

    function activateMonitoring() {
      $state.go(STATE.MONITORING);
    }

    function activateActivityAdder() {
      $state.go(STATE.ACTIVITY_ADDER);
    }

    function activateActivityPlayer() {
      $state.go(STATE.ACTIVITY_PLAYER);
    }

    function activateActivityViewer() {
      $state.go(STATE.ACTIVITY_VIEWER);
    }

    function activateOfflineActivitySynchronize() {
      $state.go(STATE.ACTIVITY_SYNCHRONIZE);
    }

    function activateInstaller() {
      $state.go(STATE.INSTALLER);
    }

    function activateLogin() {
      $state.go(STATE.LOGIN);
    }

    function activateError() {
      $state.go(STATE.ERROR);
    }

    function activateLaboratory() {
      $state.go(STATE.LABORATORY);
    }

    function activateUnattachedLaboratory() {
      $state.go(STATE.UNATTACHED_LABORATORY);
    }

    function activateParticipantFollowUps() {
      $state.go(STATE.PARTICIPANT_FOLLOW_UPS);
    }

    function activateDashboard() {
      $state.go(STATE.DASHBOARD);
    }

    function activateParticipantDashboard() {
      $state.go(STATE.PARTICIPANT_DASHBOARD);
    }

    function activateCreateParticipant() {
      $state.go(STATE.PARTICIPANT_CREATE);
    }

    function activateUpdateParticipant() {
      $state.go(STATE.PARTICIPANT_UPDATE);
    }

    function activateManagerParticipants() {
      $state.go(STATE.PARTICIPANTS_MANAGER);
    }

    function activateParticipantsList() {
      $state.go(STATE.PARTICIPANTS_LIST);
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

    function activateActivityFlagsReport() {
      $state.go(STATE.ACTIVITY_FLAG_REPORT);
    }

    function laboratoryActivityFlagsReport() {
      $state.go(STATE.LABORATORY_FLAG_REPORT);
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

    function activateLaboratoryMonitoring() {
      $state.go(STATE.LABORATORY_MONITORING_DASHBOARD);
    }

    function activateLaboratoryMaterialManager() {
      $state.go(STATE.LABORATORY_MATERIAL_MANAGER);
    }

    function activateActivityImport() {
      $state.go(STATE.ACTIVITY_IMPORT);
    }

    function getCurrentState() {
      return $state.current.name;
    }

    function currentStateIsListViewer(){
      return [STATE.PENDENCY_VIEWER, STATE.ISSUE_VIEWER].includes(getCurrentState());
    }

    function activatePendencyViewer(){
      $state.go(STATE.PENDENCY_VIEWER);
    }

    function activateIssueViewer(){
      $state.go(STATE.ISSUE_VIEWER);
    }

    function activateIssueMessagesViewer(){
      $state.go(STATE.ISSUE_MESSAGES_VIEWER);
    }

    function activateMaterialLabelDashboard(){
      $state.go(STATE.MATERIAL_LABEL);
    }
  }
}());
