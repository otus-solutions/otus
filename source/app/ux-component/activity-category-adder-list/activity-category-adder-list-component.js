(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityCategoryAdderList', {
      controller: Controller,
      templateUrl: 'app/ux-component/activity-category-adder-list/activity-category-adder-list-template.html'
    });

  Controller.$inject = [
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.application.state.ApplicationStateService',
    '$timeout'
  ];

  function Controller(ActivityService, ApplicationStateService, $timeout) {
    var self = this;

    self.returnToActivitiesAdder = returnToActivitiesAdder;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    function onInit() {
      _loadActivities();
    }

    function _loadCategories() {
      ActivityService
        .listAllCategories()
        .then(function(response) {
          self.categories = response;
        });
    }

    function _getSelectedActivities() {
      return JSON.parse(window.sessionStorage.getItem('selectedActivities'));
    }

    function _isActivities() {
      if (self.activities === undefined || self.activities.length < 1) {
        returnToActivitiesAdder();
      }
    }

    function _configurationCategories() {
      ActivityService.setActivitiesSelection(self.activities);
      self.configuration = ActivityService.configurationStructure();
    }

    function _loadActivities() {
      self.selectedActivities = _getSelectedActivities();
      self.activities = [];
      ActivityService
        .listAvailables()
        .then(function(activities) {
          activities.forEach(function(activity) {
            self.selectedActivities.forEach(function(acronym) {
              if(activity.surveyTemplate.identity.acronym === acronym){
                self.activities.push(activity);
              }
            });
          });
          _isActivities()
          _loadCategories();
          _configurationCategories();
        });
    }
    
    function returnToActivitiesAdder() {
      ApplicationStateService.activateActivityAdder();
    }

  }
}());
