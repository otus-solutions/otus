(function() {
  'use strict';

  angular
    .module('otusjs.application.state')
    .constant('STATE', {
      'ACCESS': 'access',
      'ERROR': 'error',
      'ACTIVITY_ADDER': 'activity-adder',
      'ACTIVITY_CATEGORY_ADDER': 'activity-category-adder',
      'ACTIVITY_PLAYER': 'activity-player',
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
      'LABELMAKER': 'labelMaker',
      'RECOVERY': 'recovery',
    });

}());
