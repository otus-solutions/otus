(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .constant('STATE', {
      'ACCESS': 'access',
      'ERROR': 'error',
      'ACTIVITY_ADDER': 'activity-adder',
      'ACTIVITY_CATEGORY_ADDER': 'activity-category-adder',
      'ACTIVITY_PLAYER': 'activity-player',
      'PAPER_ACTIVITY_INITIALIZER': 'paper-activity-initializer',
      'APPLICATION': 'application',
      'DASHBOARD': 'dashboard',
      'PARTICIPANT_DASHBOARD': 'participant-dashboard',
      'PARTICIPANT_CREATE': 'participant-create',
      'PARTICIPANTS_MANAGER': 'participants-manager',
      'PARTICIPANTS_LIST': 'participants-list',
      'INSTALLER': 'installer',
      'LOGIN': 'login',
      'PARTICIPANT': 'participant',
      'PARTICIPANT_ACTIVITY': 'activity',
      'PARTICIPANT_REPORT': 'report',
      'SESSION': 'session',
      'SIGNUP': 'signup',
      'SIGNUP_RESULT': 'signup-result',
      'LABORATORY': 'laboratory-participant',
      'SAMPLE_TRANSPORTATION_LOT_INFO_MANAGER': 'sample-transportation-lot-info-manager',
      'SAMPLE_TRANSPORTATION_MANAGER_LIST': 'sample-transportation-manager-list',
      'SAMPLE_TRANSPORTATION_DASHBOARD': 'sample-transportation-dashboard',
      'EXAM_DASHBOARD': 'exam-dashboard',
      'EXAM_LOT_MANAGER_LIST': 'exam-lot-manager-list',
      'EXAM_LOT_INFO_MANAGER': 'exam-lot-info-manager',
      'EXAM_SENDING': 'exam-sending',
      'EXAM_RESULT_VISUALIZER': 'exam-result-visualizer',
      'MONITORING': 'monitoring',
      'ACCESS_RECOVERY': 'access-recovery',
      'FLAG_DASHBOARD': 'flag-report',
      'FLAG_MANAGER_LIST': 'manager-list',
      'LABORATORY_MONITORING_DASHBOARD': 'laboratory-monitoring'
    })
    .config(Configuration);

  Configuration.$inject = [
    '$urlRouterProvider',
    '$stateProvider',
    'otusjs.deploy.AccessStateProvider',
    'otusjs.deploy.ErrorStateProvider',
    'otusjs.deploy.ActivityStateProvider',
    'otusjs.deploy.ActivityAdderStateProvider',
    'otusjs.deploy.ActivityCategoryStateProvider',
    'otusjs.deploy.ActivityPlayerStateProvider',
    'otusjs.deploy.PaperActivityInitializerStateProvider',
    'otusjs.deploy.DashboardStateProvider',
    'otusjs.deploy.ParticipantDashboardStateProvider',
    'otusjs.deploy.ParticipantsManagerStateProvider',
    'otusjs.deploy.ParticipantsListStateProvider',
    'otusjs.deploy.ParticipantCreateStateProvider',
    'otusjs.deploy.InstallerStateProvider',
    'otusjs.deploy.LoginStateProvider',
    'otusjs.deploy.ParticipantStateProvider',
    'otusjs.deploy.SignupStateProvider',
    'otusjs.deploy.SignupResultStateProvider',
    'otusjs.deploy.SessionStateProvider',
    'otusjs.deploy.LaboratoryStateProvider',
    'otusjs.deploy.SampleTransportationLotAdderStateProvider',
    'otusjs.deploy.SampleTransportationManagerListStateProvider',
    'otusjs.deploy.SampleTransportationStateProvider',
    'otusjs.deploy.ExamLotDashboardStateProvider',
    'otusjs.deploy.ExamLotManagerListStateProvider',
    'otusjs.deploy.ExamLotInfoManagerStateProvider',
    'otusjs.deploy.SendingExamStateProvider',
    'otusjs.deploy.ExamResultsVisualizerProvider',
    'otusjs.deploy.MonitoringStateProvider',
    'otusjs.deploy.UserAccessRecoveryProvider',
    'otusjs.deploy.FlagStateProvider',
    'otusjs.deploy.LaboratoryMonitoringStateProvider'
  ];

  function Configuration($urlRouterProvider, $stateProvider,
    AccessStateProvider,
    ErrorStateProvider,
    ActivityStateProvider,
    ActivityAdderStateProvider,
    ActivityCategoryStateProvider,
    ActivityPlayerStateProvider,
    PaperActivityInitializerStateProvider,
    DashboardProvider,
    ParticipantDashboardProvider,
    ParticipantsManagerStateProvider,
    ParticipantsListStateProvider,
    ParticipantCreateStateProvider,
    InstallerProvider,
    LoginStateProvider,
    ParticipantStateProvider,
    SignupStateProvider,
    SignupResultStateProvider,
    SessionStateProvider,
    LaboratoryStateProvider,
    SampleTransportationLotAdderProvider,
    SampleTransportationManagerListProvider,
    SampleTransportationProvider,
    ExamLotStateProvider,
    ExamLotManagerListState,
    ExamLotInfoManagerState,
    SendingExamState,
    ExamResultsVisualizer,
    MonitoringStateProvider,
    UserAccessRecoveryProvider,
    FlagStateProvider,
    LaboratoryMonitoringStateProvider
  ) {
    $stateProvider.state(AccessStateProvider.state);
    $stateProvider.state(ErrorStateProvider.state);
    $stateProvider.state(ActivityStateProvider.state);
    $stateProvider.state(ActivityAdderStateProvider.state);
    $stateProvider.state(ActivityCategoryStateProvider.state);
    $stateProvider.state(ActivityPlayerStateProvider.state);
    $stateProvider.state(PaperActivityInitializerStateProvider.state);
    $stateProvider.state(LoginStateProvider.state);
    $stateProvider.state(SignupStateProvider.state);
    $stateProvider.state(SignupResultStateProvider.state);
    $stateProvider.state(DashboardProvider.state);
    $stateProvider.state(ParticipantDashboardProvider.state);
    $stateProvider.state(ParticipantsManagerStateProvider.state);
    $stateProvider.state(ParticipantsListStateProvider.state);
    $stateProvider.state(ParticipantCreateStateProvider.state);
    $stateProvider.state(InstallerProvider.state);
    $stateProvider.state(ParticipantStateProvider.state);
    $stateProvider.state(SessionStateProvider.state);
    $stateProvider.state(LaboratoryStateProvider.state);
    $stateProvider.state(SampleTransportationLotAdderProvider.state);
    $stateProvider.state(SampleTransportationManagerListProvider.state);
    $stateProvider.state(SampleTransportationProvider.state);
    $stateProvider.state(ExamLotStateProvider.state);
    $stateProvider.state(ExamLotManagerListState.state);
    $stateProvider.state(ExamLotInfoManagerState.state);
    $stateProvider.state(SendingExamState.state);
    $stateProvider.state(ExamResultsVisualizer.state);
    $stateProvider.state(MonitoringStateProvider.state);
    $stateProvider.state(UserAccessRecoveryProvider.state);
    $stateProvider.state(FlagStateProvider.state);
    $stateProvider.state(LaboratoryMonitoringStateProvider.state);

    /* Default state (route) */
    $urlRouterProvider.otherwise(LoginStateProvider.state.url);
    // $locationProvider.html5Mode(false);
  }
}());
