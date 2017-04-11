(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityAdderToolbar', {
      controller: Controller,
      templateUrl: 'app/ux-component/activity-adder-toolbar/activity-adder-toolbar-template.html',
      bindings: {
        activityType: '<',
        onAddActivities: '&'
      }
    });

  Controller.$inject = [
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(ApplicationStateService) {
    var self = this;

    /* Public methods */
    self.addActivities = addActivities;
    self.returnToParticipantActivities = returnToParticipantActivities;

    function addActivities() {
      self.onAddActivities();
    }

    function returnToParticipantActivities() {
      ApplicationStateService.activateParticipantActivities();
    }
  }
}());
