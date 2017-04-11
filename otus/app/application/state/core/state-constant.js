(function() {
  'use strict';

  angular
    .module('otusjs.application.state')
    .constant('STATE', {
      'ACCESS': 'access',
      'ACTIVITY_ADDER': 'activity-adder',
      'ACTIVITY_PLAYER': 'activity-player',
      'PAPER_ACTIVITY_ADDER': 'paper-activity-adder',
      'PAPER_ACTIVITY_INITIALIZER': 'paper-activity-initializer',
      'APPLICATION': 'application',
      'DASHBOARD': 'dashboard',
      'INSTALLER': 'installer',
      'LOGIN': 'login',
      'LABORATORY': 'laboratory-participant',
      'PARTICIPANT': 'participant',
      'PARTICIPANT_ACTIVITY': 'activity',
      'PARTICIPANT_REPORT': 'report',
      'SESSION': 'session',
      'SIGNUP': 'signup',
      'SIGNUP_RESULT': 'signup-result',
      'LABELMAKER': 'labelMaker'
    });

}());
