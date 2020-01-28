(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusFollowUp', {
      controller: 'otusFollowUpCtrl as $ctrl',
      templateUrl: 'app/ux-component/participant-dashboard/participant-follow-up/follow-up/follow-up-template.html',
      bindings: {
        followUpData: '<',
        isFirstFollowUp: '<',
        selectedParticipant: '<'
      }
    });
}());
