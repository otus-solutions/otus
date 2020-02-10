(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('activityAutoFillEvent', {
      controller: 'activityAutoFillEventCtrl as $ctrl',
      templateUrl: 'app/ux-component/participant-dashboard/participant-follow-up/follow-up/event/activity-auto-fill-event/activity-auto-fill-event-template.html',
      bindings: {
        eventComponent: '='
      }
    });
}());
