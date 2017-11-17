(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityCategoryAdderList', {
      controller: Controller,
      templateUrl: 'app/ux-component/activity-category-adder-list/activity-category-adder-list-template.html',
      bindings: {
        onActivitySelection: '&'
      }
    });

  Controller.$inject = [
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(ActivityService, ApplicationStateService) {
    var self = this;

    self.returnToParticipantActivities = returnToParticipantActivities;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    function onInit() {
      _loadActivities();
    }

    function _loadActivities() {
      self.activities = ActivityService.getActivitiesSelection();
      self.config = ActivityService.getCategories();
      self.categories = [
        {"name":"C0","objectType":"ActivityCategory","label":"breno","deleted":false,"isDefault":false},
        {"name":"C1","objectType":"ActivityCategory","label":"teste","deleted":false,"isDefault":false},
        {"name":"C2","objectType":"ActivityCategory","label":"breno","deleted":false,"isDefault":false},
        {"name":"C3","objectType":"ActivityCategory","label":"normal","deleted":false,"isDefault":true},
        {"name":"C4","objectType":"ActivityCategory","label":"breno","deleted":false,"isDefault":false},
        {"name":"C5","objectType":"ActivityCategory","label":"breno","deleted":false,"isDefault":false},
        {"name":"C6","objectType":"ActivityCategory","label":"breno","deleted":false,"isDefault":false},
        {"name":"C7","objectType":"ActivityCategory","label":"breno","deleted":false,"isDefault":false},
        {"name":"C8","objectType":"ActivityCategory","label":"breno","deleted":false,"isDefault":false}
      ];
      if(self.activities === undefined || self.activities.length<1){
        returnToParticipantActivities();
      }

    }

    function returnToParticipantActivities() {
      ApplicationStateService.activateParticipantActivities();
    }


  }
}());
