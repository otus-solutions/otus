(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityList', {
      controller: Controller,
      templateUrl: 'app/ux-component/activity-manager-list/activity-manager-list-template.html',
      require: {
        otusActivityManager: '^otusActivityManager'
      }
    });

  Controller.$inject = [
    'otusjs.activity.business.ParticipantActivityManagementService',
    'otusjs.activity.core.EventService',
    'otusjs.otus.uxComponent.ActivityItemFactory'
  ];

  function Controller(ActivityService, EventService, ActivityItemFactory) {
    var self = this;
    var _selectedActivities = [];
    self.activities = [];
    self.isListEmpty = true;

    /* Public methods */
    self.selectActivity = selectActivity;
    self.update = update;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    function selectActivity(activityItem) {
      var activityIndex = _selectedActivities.indexOf(activityItem.activity);
      if (activityIndex > -1) {
        _selectedActivities.splice(activityIndex, 1);
        activityItem.isSelected = false;
      } else {
        _selectedActivities.push(activityItem.activity);
        activityItem.isSelected = true;
      }
      ActivityService.selectActivities(_selectedActivities);
    }

    function update() {
      _selectedActivities = [];
      _loadActivities();
    }

    function onInit() {
      self.isListEmpty = true;
      self.otusActivityManager.listComponent = self;
      _loadActivities();
      EventService.onParticipantSelected(_loadActivities);
    }

    function _loadActivities() {
      ActivityService
        .listAll()
        .then(function(activities) {
          self.activities = activities.map(ActivityItemFactory.create);
          if (activities.length) {
            self.isListEmpty = false;
          }
        });
    }
  }
}());
