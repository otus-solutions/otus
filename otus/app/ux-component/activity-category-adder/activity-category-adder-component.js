(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityCategoryAdder', {
      controller: Controller,
      templateUrl: 'app/ux-component/activity-category-adder/activity-category-adder-template.html'
    });

  Controller.$inject = [
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(ActivityService, ApplicationStateService) {
    var self = this;

    /* Public methods */
    self.addActivities = addActivities;

    function addActivities() {
        ActivityService.add();
        ApplicationStateService.activateParticipantActivities();
    }


  }
}());
