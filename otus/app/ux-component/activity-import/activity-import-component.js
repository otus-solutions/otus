(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityImport', {
      controller: Controller,
      templateUrl: 'app/ux-component/activity-import/activity-import-template.html'
    });

  Controller.$inject = [
    'otusjs.activity.business.ParticipantActivityService'
  ]

  function Controller(ActivityService) {
    var self = this;

    self.$onInit = onInit;

    function onInit() {
      _loadActivities();
    }


    function _loadActivities() {
      ActivityService
        .listAvailables()
        .then(function(activities) {
          activities.forEach(function (activity) {
            activity.surveyFormType = self.getType(activity);
          });
          self.activities = angular.copy(activities);
          self.AllActivities = angular.copy(self.activities);
          if (activities.length) {
            self.isListEmpty = false;
          }
        });
    }

  }
}());
