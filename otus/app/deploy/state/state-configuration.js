(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .constant('STATE', {
      'ACCESS': 'access',
      'ACTIVITY_ADDER': 'activity-adder',
      'ACTIVITY_PLAYER': 'activity-player',
      'PAPER_ACTIVITY_ADDER': 'paper-activity-adder',
      'PAPER_ACTIVITY_INITIALIZER': 'paper-activity-initializer',
      'APPLICATION': 'application',
      'DASHBOARD': 'dashboard',
      'PARTICIPANT_DASHBOARD': 'participant-dashboard',
      'INSTALLER': 'installer',
      'LOGIN': 'login',
      'PARTICIPANT': 'participant',
      'PARTICIPANT_ACTIVITY': 'activity',
      'PARTICIPANT_REPORT': 'report',
      'SESSION': 'session',
      'SIGNUP': 'signup',
      'SIGNUP_RESULT': 'signup-result',
      'LABORATORY': 'laboratory-participant',
      'SAMPLE_TRANSPORTATION_LOT_INFO_MANAGER': 'sample-transportation-lot-adder',
      'SAMPLE_TRANSPORTATION_MANAGER_LIST': 'sample-transportation-manager-list',
      'SAMPLE_TRANSPORTATION_DASHBOARD': 'sample-transportation-dashboard'
    })
    .config(Configuration);

  Configuration.$inject = [
    '$urlRouterProvider',
    '$stateProvider',
    'otusjs.deploy.AccessStateProvider',
    'otusjs.deploy.ActivityStateProvider',
    'otusjs.deploy.ActivityAdderStateProvider',
    'otusjs.deploy.ActivityPlayerStateProvider',
    'otusjs.deploy.PaperActivityAdderStateProvider',
    'otusjs.deploy.PaperActivityInitializerStateProvider',
    'otusjs.deploy.DashboardStateProvider',
    'otusjs.deploy.ParticipantDashboardStateProvider',
    'otusjs.deploy.InstallerStateProvider',
    'otusjs.deploy.LoginStateProvider',
    'otusjs.deploy.ParticipantStateProvider',
    'otusjs.deploy.SignupStateProvider',
    'otusjs.deploy.SignupResultStateProvider',
    'otusjs.deploy.SessionStateProvider',
    'otusjs.deploy.LaboratoryStateProvider',
    'otusjs.deploy.SampleTransportationLotAdderStateProvider',
    'otusjs.deploy.SampleTransportationManagerListStateProvider',
    'otusjs.deploy.SampleTransportationStateProvider'
  ];

  function Configuration($urlRouterProvider, $stateProvider,
    AccessStateProvider,
    ActivityStateProvider,
    ActivityAdderStateProvider,
    ActivityPlayerStateProvider,
    PaperActivityAdderStateProvider,
    PaperActivityInitializerStateProvider,
    DashboardProvider,
    ParticipantDashboardProvider,
    InstallerProvider,
    LoginStateProvider,
    ParticipantStateProvider,
    SignupStateProvider,
    SignupResultStateProvider,
    SessionStateProvider,
    LaboratoryStateProvider,
    SampleTransportationLotAdderProvider,
    SampleTransportationManagerListProvider,
    SampleTransportationProvider
  ) {
    $stateProvider.state(AccessStateProvider.state);
    $stateProvider.state(ActivityStateProvider.state);
    $stateProvider.state(ActivityAdderStateProvider.state);
    $stateProvider.state(ActivityPlayerStateProvider.state);
    $stateProvider.state(PaperActivityAdderStateProvider.state);
    $stateProvider.state(PaperActivityInitializerStateProvider.state);
    $stateProvider.state(LoginStateProvider.state);
    $stateProvider.state(SignupStateProvider.state);
    $stateProvider.state(SignupResultStateProvider.state);
    $stateProvider.state(DashboardProvider.state);
    $stateProvider.state(ParticipantDashboardProvider.state);
    $stateProvider.state(InstallerProvider.state);
    $stateProvider.state(ParticipantStateProvider.state);
    $stateProvider.state(SessionStateProvider.state);
    $stateProvider.state(LaboratoryStateProvider.state);
    $stateProvider.state(SampleTransportationLotAdderProvider.state);
    $stateProvider.state(SampleTransportationManagerListProvider.state);
    $stateProvider.state(SampleTransportationProvider.state);
    /* Default state (route) */
    $urlRouterProvider.otherwise(LoginStateProvider.state.url);
    // $locationProvider.html5Mode(false);
  }
}());
