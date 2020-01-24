(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusFollowUpEvent', {
      controller: 'otusFollowUpEventCtrl as $ctrl',
      templateUrl: 'app/ux-component/participant-dashboard/participant-follow-up/follow-up/event/event-template.html',
      bindings: {
        eventData: '<'
      }
    });
}());
