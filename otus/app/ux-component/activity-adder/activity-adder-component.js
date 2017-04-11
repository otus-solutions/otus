(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityAdder', {
      controller: Controller,
      templateUrl: 'app/ux-component/activity-adder/activity-adder-template.html'
    });

  Controller.$inject = [
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(ActivityService, ApplicationStateService) {
    var self = this;
    var _selectedActivities = [];

    /* Public methods */
    self.addActivities = addActivities;
    self.catchActivity = catchActivity;

    function addActivities() {
      ActivityService.add(_selectedActivities);
      _selectedActivities = [];
      ApplicationStateService.activateParticipantActivities();
    }

    function catchActivity(activity) {
      var activityIndex = _selectedActivities.indexOf(activity);

      if (activityIndex !== -1) {
        _selectedActivities.splice(activityIndex, 1);
      } else {
        _selectedActivities.push(activity);
      }
    }
  }
}());
