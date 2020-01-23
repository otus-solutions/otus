(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusFollowup', {
      controller: 'otusFollowUpCtrl as $ctrl',
      templateUrl: 'app/ux-component/participant-dashboard/participant-followup/followup/followup-template.html',
      bindings: {
        followUpData: '<'
      }
    });
}());
