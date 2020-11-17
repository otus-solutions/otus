(function () {
  'use strict';

  angular
    .module('otusjs.application.state')
    .constant('STATE', {
      'ACCESS': 'access',
      'ERROR': 'error',
      'ACTIVITY_ADDER': 'activity-adder',
      'ACTIVITY_CATEGORY_ADDER': 'activity-category-adder',
      'ACTIVITY_PLAYER': 'activity-player',
      'ACTIVITY_VIEWER': 'activity-viewer',
      'PAPER_ACTIVITY_INITIALIZER': 'paper-activity-initializer',
      'APPLICATION': 'application',
      'DASHBOARD': 'dashboard',
      'INSTALLER': 'installer',
      'LOGIN': 'login',
      'LABORATORY': 'laboratory-participant',
      'UNATTACHED_LABORATORY': 'unattached-laboratory',
      'PARTICIPANT_FOLLOW_UPS': 'participant-follow-up',
      'PARTICIPANT': 'participant',
      'PARTICIPANT_ACTIVITY': 'activity',
      'PARTICIPANT_ACTIVITY_STAGE': 'activity-stage',
      'PARTICIPANT_REPORT': 'report',
      'PARTICIPANT_UPDATE': 'participant-update',
      'SESSION': 'session',
      'SIGNUP': 'signup',
      'SIGNUP_RESULT': 'signup-result',
      'LABELMAKER': 'labelMaker',
      'MATERIAL_LABEL': 'material-label',
      'RECOVERY': 'recovery',
      'ACTIVITY_IMPORT': 'activity-import'
    });

}());
