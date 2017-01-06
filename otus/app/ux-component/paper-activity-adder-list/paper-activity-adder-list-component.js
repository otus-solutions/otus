(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusPaperActivityAdderList', {
      controller: Controller,
      templateUrl: 'app/ux-component/paper-activity-adder-list/paper-activity-adder-list-template.html',
      bindings: {
        onActivitySelection: '&'
      }
    });

  Controller.$inject = [
    'otusjs.activity.business.ParticipantActivityManagementService'
  ];

  function Controller(ActivityService) {
    var self = this;
    self.activities = [];

    /* Public methods */
    self.selectActivity = selectActivity;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    function onInit() {
      _loadActivities();
    }

    function _loadActivities() {
      self.activities = ActivityService.listAvailables();
      console.log(self.activities);
    }

    function selectActivity(activity) {
      self.onActivitySelection({
        activity: activity
      });
    }
  }
}());
