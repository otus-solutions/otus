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
    self.filteredActivities = filteredActivities;
    /* Lifecycle hooks */
    self.$onInit = onInit;

    function onInit() {
      _loadActivities();
    }

    function _loadActivities() {
      self.selectedActivities = window.sessionStorage.getItem('selectedActivities');
      ActivityService
        .listAvailables()
        .then(function(activities) {
          self.activities = activities;
          self.configuration = ActivityService.configurationStructure();
          if (activities.length) {
            self.isListEmpty = false;
          }
        });
        ActivityService
          .listAllCategories()
          .then(function (response) {
            self.categories = response;
          });
    }
    //TODO FILTRO DAS ATIVIDADES SELECIONADAS
    function filteredActivities() {
      return self.activities.filter(function(activity) {
        return self.selectedActivities.indexOf(activity.surveyTemplate.identity.acronym) !== -1;
      });
    }

    function _loadActivities() {
      self.configuration = ActivityService.configurationStructure();

      if(self.activities === undefined || self.activities.length<1){
        var expiredActivities = function() {
          returnToActivitiesAdder();
        }
        $timeout(expiredActivities, 4000);
      }
    }

    function returnToActivitiesAdder() {
      ApplicationStateService.activateActivityAdder();
    }


  }
}());
