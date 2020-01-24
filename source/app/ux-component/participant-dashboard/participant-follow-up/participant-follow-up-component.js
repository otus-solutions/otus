(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusParticipantFollowUp', {
      controller: 'otusParticipantFollowUpCtrl as $ctrl',
      templateUrl: 'app/ux-component/participant-dashboard/participant-follow-up/participant-follow-up-template.html'
    });
}());
