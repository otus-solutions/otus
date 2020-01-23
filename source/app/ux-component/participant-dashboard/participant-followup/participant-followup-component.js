(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusParticipantFollowup', {
      controller: 'otusParticipantFollowUpCtrl as $ctrl',
      templateUrl: 'app/ux-component/participant-dashboard/participant-followup/participant-followup-template.html'
    });
}());
